(function (Game) {
  "use strict";

  class GameState {
    constructor(initialState) {
      this.initialState = Game.deepClone(initialState);
      this.reset();
    }

    reset() {
      const source = Game.deepClone(this.initialState);
      this.sceneId = source.sceneId || null;
      this.currentEventId = source.currentEventId || null;
      this.attributes = source.attributes || {};
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
        flags: this.flags,
        inventory: this.inventory,
        objectStates: this.objectStates,
        checkResults: this.checkResults
      });
    }

    restore(snapshot) {
      if (!snapshot || typeof snapshot !== "object" || Array.isArray(snapshot)) {
        throw new TypeError("存档状态格式无效");
      }
      const clean = Game.deepClone(snapshot);
      if (clean.sceneId != null && typeof clean.sceneId !== "string") {
        throw new TypeError("存档场景 ID 无效");
      }
      if (clean.currentEventId != null && typeof clean.currentEventId !== "string") {
        throw new TypeError("存档事件 ID 无效");
      }
      for (const key of ["attributes", "flags", "objectStates", "checkResults"]) {
        if (clean[key] != null && (typeof clean[key] !== "object" || Array.isArray(clean[key]))) {
          throw new TypeError(`存档字段 ${key} 格式无效`);
        }
      }
      if (clean.inventory != null && (!Array.isArray(clean.inventory) || clean.inventory.some((item) => typeof item !== "string"))) {
        throw new TypeError("存档物品栏格式无效");
      }
      this.sceneId = clean.sceneId || null;
      this.currentEventId = clean.currentEventId || null;
      this.attributes = clean.attributes || {};
      this.flags = clean.flags || {};
      this.inventory = Array.isArray(clean.inventory) ? clean.inventory : [];
      this.objectStates = clean.objectStates || {};
      this.checkResults = clean.checkResults || {};
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
      localStorage.setItem(this.storageKey, JSON.stringify(Game.deepClone(snapshot)));
    }

    load() {
      const raw = localStorage.getItem(this.storageKey);
      if (raw === null) return false;
      this.state.restore(JSON.parse(raw));
      return true;
    }
  }

  Game.GameState = GameState;
  Game.SaveManager = SaveManager;
})(window.TrainGame);
