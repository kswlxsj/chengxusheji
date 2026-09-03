(function (Game) {
  "use strict";

  const SAVE_VERSION = 2;
  const operators = {
    eq: (left, right) => left === right,
    ne: (left, right) => left !== right,
    lt: (left, right) => left < right,
    lte: (left, right) => left <= right,
    gt: (left, right) => left > right,
    gte: (left, right) => left >= right
  };

  function isPlainObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function collectAttributeDependencies(condition, result = new Set()) {
    if (condition.attribute) result.add(condition.attribute);
    for (const attributeId of condition.sum || []) result.add(attributeId);
    for (const part of condition.all || condition.any || []) collectAttributeDependencies(part, result);
    if (condition.not) collectAttributeDependencies(condition.not, result);
    return result;
  }

  class GameState {
    constructor(initialState, attributeData, skillDefinitions) {
      this.initialState = Game.deepClone(initialState);
      this.totalAttributePoints = attributeData.totalPoints;
      this.attributeDefinitions = new Map(attributeData.attributes.map((definition) => [definition.id, Game.deepClone(definition)]));
      this.skillDefinitions = new Map(skillDefinitions.map((definition) => [definition.id, Game.deepClone(definition)]));
      this.skillsByAttribute = new Map();
      for (const skill of this.skillDefinitions.values()) {
        if (!skill.autoTrigger) continue;
        for (const attributeId of collectAttributeDependencies(skill.autoTrigger)) {
          const dependents = this.skillsByAttribute.get(attributeId) || new Set();
          dependents.add(skill.id);
          this.skillsByAttribute.set(attributeId, dependents);
        }
      }
      this.reset();
    }

    reset() {
      const source = Game.deepClone(this.initialState);
      this.sceneId = source.sceneId || null;
      this.currentEventId = source.currentEventId || null;
      this.attributes = Object.fromEntries([...this.attributeDefinitions.values()].map((definition) => [definition.id, definition.initial]));
      this.skills = Object.fromEntries([...this.skillDefinitions.values()].map((definition) => [definition.id, definition.initial]));
      this.skillOverrides = {};
      this.attributeAllocationComplete = false;
      this.flags = source.flags || {};
      this.inventory = source.inventory || [];
      this.objectStates = source.objectStates || {};
      this.checkResults = source.checkResults || {};
    }

    snapshot() {
      return Game.deepClone({
        sceneId: this.sceneId,
        currentEventId: this.currentEventId,
        attributes: this.attributes,
        skills: this.skills,
        skillOverrides: this.skillOverrides,
        attributeAllocationComplete: this.attributeAllocationComplete,
        flags: this.flags,
        inventory: this.inventory,
        objectStates: this.objectStates,
        checkResults: this.checkResults
      });
    }

    restore(snapshot) {
      if (!isPlainObject(snapshot)) throw new TypeError("存档状态格式无效");
      const clean = Game.deepClone(snapshot);
      if (clean.sceneId != null && typeof clean.sceneId !== "string") throw new TypeError("存档场景 ID 无效");
      if (clean.currentEventId != null && typeof clean.currentEventId !== "string") throw new TypeError("存档事件 ID 无效");
      for (const key of ["attributes", "skills", "skillOverrides", "flags", "objectStates", "checkResults"]) {
        if (!isPlainObject(clean[key])) throw new TypeError(`存档字段 ${key} 格式无效`);
      }
      if (typeof clean.attributeAllocationComplete !== "boolean") throw new TypeError("存档缺少属性分配状态");
      if (!Array.isArray(clean.inventory) || clean.inventory.some((item) => typeof item !== "string")) throw new TypeError("存档物品栏格式无效");

      this.validateRegisteredKeys(clean.attributes, this.attributeDefinitions, "属性");
      for (const [id, value] of Object.entries(clean.attributes)) {
        const definition = this.attributeDefinitions.get(id);
        if (!Number.isInteger(value) || value < definition.min || value > definition.max) {
          throw new TypeError(`存档属性 ${id} 超出注册范围`);
        }
      }
      this.validateRegisteredKeys(clean.skills, this.skillDefinitions, "技能");
      for (const [id, value] of Object.entries(clean.skills)) {
        if (typeof value !== "boolean") throw new TypeError(`存档技能 ${id} 不是布尔值`);
      }
      for (const [id, locked] of Object.entries(clean.skillOverrides)) {
        if (!this.skillDefinitions.has(id) || locked !== true) throw new TypeError(`存档技能屏蔽状态无效：${id}`);
      }

      this.sceneId = clean.sceneId || null;
      this.currentEventId = clean.currentEventId || null;
      this.attributes = clean.attributes;
      this.skills = clean.skills;
      this.skillOverrides = clean.skillOverrides;
      this.attributeAllocationComplete = clean.attributeAllocationComplete;
      this.flags = clean.flags;
      this.inventory = clean.inventory;
      this.objectStates = clean.objectStates;
      this.checkResults = clean.checkResults;
    }

    validateRegisteredKeys(values, definitions, label) {
      const keys = Object.keys(values);
      if (keys.length !== definitions.size || keys.some((id) => !definitions.has(id))) {
        throw new TypeError(`存档${label}与当前注册表不兼容`);
      }
    }

    getAttribute(attributeId) {
      this.requireDefinition(this.attributeDefinitions, attributeId, "属性");
      return this.attributes[attributeId];
    }

    setAttribute(attributeId, value) {
      const definition = this.requireDefinition(this.attributeDefinitions, attributeId, "属性");
      if (!Number.isInteger(value)) throw new TypeError(`属性 ${attributeId} 只能设置为整数`);
      const next = Math.max(definition.min, Math.min(definition.max, value));
      if (this.attributes[attributeId] === next) return next;
      this.attributes[attributeId] = next;
      this.reevaluateSkillsFor(attributeId);
      return next;
    }

    modifyAttribute(attributeId, amount) {
      if (!Number.isInteger(amount)) throw new TypeError(`属性 ${attributeId} 的修改量必须是整数`);
      return this.setAttribute(attributeId, this.getAttribute(attributeId) + amount);
    }

    completeAttributeAllocation(values) {
      if (this.attributeAllocationComplete) throw new Error("该存档已经完成属性分配");
      if (!isPlainObject(values)) throw new TypeError("属性分配结果格式无效");
      this.validateRegisteredKeys(values, this.attributeDefinitions, "属性");
      let spent = 0;
      for (const [id, definition] of this.attributeDefinitions) {
        const value = values[id];
        if (!Number.isInteger(value) || value < definition.initial || value > definition.max) {
          throw new RangeError(`属性 ${id} 的分配结果无效`);
        }
        spent += value - definition.initial;
      }
      if (spent !== this.totalAttributePoints) throw new RangeError("必须用完全部属性点");
      this.attributes = Game.deepClone(values);
      this.attributeAllocationComplete = true;
      this.reevaluateAllAutomaticSkills();
    }

    getSkill(skillId) {
      this.requireDefinition(this.skillDefinitions, skillId, "技能");
      return this.skills[skillId];
    }

    setSkill(skillId, value) {
      this.requireDefinition(this.skillDefinitions, skillId, "技能");
      if (typeof value !== "boolean") throw new TypeError(`技能 ${skillId} 只能设置为布尔值`);
      this.skills[skillId] = value;
      return value;
    }

    learnSkill(skillId) {
      this.requireDefinition(this.skillDefinitions, skillId, "技能");
      this.skillOverrides[skillId] = true;
      return this.setSkill(skillId, true);
    }

    loseSkill(skillId) {
      this.requireDefinition(this.skillDefinitions, skillId, "技能");
      this.skillOverrides[skillId] = true;
      return this.setSkill(skillId, false);
    }

    reevaluateSkillsFor(attributeId) {
      for (const skillId of this.skillsByAttribute.get(attributeId) || []) this.reevaluateAutomaticSkill(skillId);
    }

    reevaluateAllAutomaticSkills() {
      for (const skill of this.skillDefinitions.values()) {
        if (skill.autoTrigger) this.reevaluateAutomaticSkill(skill.id);
      }
    }

    reevaluateAutomaticSkill(skillId) {
      if (Object.hasOwn(this.skillOverrides, skillId)) return;
      const skill = this.skillDefinitions.get(skillId);
      this.skills[skillId] = this.evaluateAttributeCondition(skill.autoTrigger);
    }

    evaluateAttributeCondition(condition) {
      if (condition.all) return condition.all.every((part) => this.evaluateAttributeCondition(part));
      if (condition.any) return condition.any.some((part) => this.evaluateAttributeCondition(part));
      if (condition.not) return !this.evaluateAttributeCondition(condition.not);
      if (condition.sum) {
        const total = condition.sum.reduce((sum, attributeId) => sum + this.getAttribute(attributeId), 0);
        return operators[condition.operator](total, condition.value);
      }
      return operators[condition.operator](this.getAttribute(condition.attribute), condition.value);
    }

    addItem(itemId) {
      if (!this.inventory.includes(itemId)) this.inventory.push(itemId);
    }

    setObjectState(objectId, patch) {
      this.objectStates[objectId] = {
        ...(this.objectStates[objectId] || {}),
        ...Game.deepClone(patch)
      };
    }

    requireDefinition(definitions, id, label) {
      const definition = definitions.get(id);
      if (!definition) throw new Error(`${label}未注册：${id}`);
      return definition;
    }
  }

  class SaveManager {
    constructor(state, storageKey = "train-game-save-v1") {
      this.state = state;
      this.storageKey = storageKey;
    }

    hasSave() {
      return localStorage.getItem(this.storageKey) !== null;
    }

    save(snapshot = this.state.snapshot()) {
      if (snapshot.attributeAllocationComplete !== true) throw new Error("属性分配完成前不能保存");
      localStorage.setItem(this.storageKey, JSON.stringify({ saveVersion: SAVE_VERSION, state: Game.deepClone(snapshot) }));
    }

    load() {
      const raw = localStorage.getItem(this.storageKey);
      if (raw === null) return false;
      const save = JSON.parse(raw);
      if (!isPlainObject(save) || save.saveVersion !== SAVE_VERSION || !isPlainObject(save.state)) {
        throw new Error("存档版本不兼容，请开始新的游戏");
      }
      if (save.state.attributeAllocationComplete !== true) throw new Error("存档尚未完成属性分配");
      this.state.restore(save.state);
      return true;
    }
  }

  Game.GameState = GameState;
  Game.SaveManager = SaveManager;
})(window.TrainGame);
