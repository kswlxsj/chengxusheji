function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (Game) {
  "use strict";

  // v5：正式存档持久化事件引擎检查点，并兼容读取旧 v4 裸状态存档。
  var SAVE_VERSION = 5;
  var LEGACY_SAVE_VERSION = 4;
  var operators = {
    eq: function eq(left, right) {
      return left === right;
    },
    ne: function ne(left, right) {
      return left !== right;
    },
    lt: function lt(left, right) {
      return left < right;
    },
    lte: function lte(left, right) {
      return left <= right;
    },
    gt: function gt(left, right) {
      return left > right;
    },
    gte: function gte(left, right) {
      return left >= right;
    }
  };
  function isPlainObject(value) {
    return Boolean(value) && _typeof(value) === "object" && !Array.isArray(value);
  }
  function collectAttributeDependencies(condition) {
    var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();
    if (condition.attribute) result.add(condition.attribute);
    var _iterator = _createForOfIteratorHelper(condition.sum || []),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var attributeId = _step.value;
        result.add(attributeId);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var _iterator2 = _createForOfIteratorHelper(condition.all || condition.any || []),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var part = _step2.value;
        collectAttributeDependencies(part, result);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    if (condition.not) collectAttributeDependencies(condition.not, result);
    return result;
  }
  var GameState = /*#__PURE__*/function () {
    function GameState(initialState, attributeData, skillDefinitions) {
      _classCallCheck(this, GameState);
      this.initialState = Game.deepClone(initialState);
      this.totalAttributePoints = attributeData.totalPoints;
      this.attributeDefinitions = new Map(attributeData.attributes.map(function (definition) {
        return [definition.id, Game.deepClone(definition)];
      }));
      this.skillDefinitions = new Map(skillDefinitions.map(function (definition) {
        return [definition.id, Game.deepClone(definition)];
      }));
      this.skillsByAttribute = new Map();
      var _iterator3 = _createForOfIteratorHelper(this.skillDefinitions.values()),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var skill = _step3.value;
          if (!skill.autoTrigger) continue;
          var _iterator4 = _createForOfIteratorHelper(collectAttributeDependencies(skill.autoTrigger)),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var attributeId = _step4.value;
              var dependents = this.skillsByAttribute.get(attributeId) || new Set();
              dependents.add(skill.id);
              this.skillsByAttribute.set(attributeId, dependents);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      this.reset();
    }
    return _createClass(GameState, [{
      key: "reset",
      value: function reset() {
        var source = Game.deepClone(this.initialState);
        this.sceneId = source.sceneId || null;
        this.currentEventId = source.currentEventId || null;
        this.attributes = Object.fromEntries(_toConsumableArray(this.attributeDefinitions.values()).map(function (definition) {
          return [definition.id, definition.initial];
        }));
        this.skills = Object.fromEntries(_toConsumableArray(this.skillDefinitions.values()).map(function (definition) {
          return [definition.id, definition.initial];
        }));
        this.skillOverrides = {};
        this.attributeAllocationComplete = false;
        this.flags = source.flags || {};
        this.inventory = source.inventory || [];
        this.objectStates = source.objectStates || {};
        this.checkResults = source.checkResults || {};
        this.checkAttempts = source.checkAttempts || {};
      }
    }, {
      key: "snapshot",
      value: function snapshot() {
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
          checkResults: this.checkResults,
          checkAttempts: this.checkAttempts
        });
      }
    }, {
      key: "restore",
      value: function restore(snapshot) {
        if (!isPlainObject(snapshot)) throw new TypeError("存档状态格式无效");
        var clean = Game.deepClone(snapshot);
        if (clean.checkAttempts === undefined) clean.checkAttempts = {};
        if (clean.sceneId != null && typeof clean.sceneId !== "string") throw new TypeError("存档场景 ID 无效");
        if (clean.currentEventId != null && typeof clean.currentEventId !== "string") throw new TypeError("存档事件 ID 无效");
        for (var _i = 0, _arr = ["attributes", "skills", "skillOverrides", "flags", "objectStates", "checkResults", "checkAttempts"]; _i < _arr.length; _i++) {
          var key = _arr[_i];
          if (!isPlainObject(clean[key])) throw new TypeError("\u5B58\u6863\u5B57\u6BB5 ".concat(key, " \u683C\u5F0F\u65E0\u6548"));
        }

        // 旧存档迁移：力量、敏捷和幸运已从当前属性表删除；新的体质是独立属性，
        // 没有旧值可以直接对应，因此旧存档按体质初始值继续载入。
        delete clean.attributes.will;
        if (this.attributeDefinitions.has("constitution")) {
          if (!Object.hasOwn(clean.attributes, "constitution") && (Object.hasOwn(clean.attributes, "strength") || Object.hasOwn(clean.attributes, "agility") || Object.hasOwn(clean.attributes, "luck"))) {
            clean.attributes.constitution = this.attributeDefinitions.get("constitution").initial;
          }
          delete clean.attributes.strength;
          delete clean.attributes.agility;
          delete clean.attributes.luck;
        }

        // 旧版本的侦查、医学和话术已改为直接点击或属性检定，不再保留技能状态。
        for (var _i2 = 0, _arr2 = ["talk", "medicine", "scouting", "firstAid"]; _i2 < _arr2.length; _i2++) {
          var removedSkill = _arr2[_i2];
          delete clean.skills[removedSkill];
          delete clean.skillOverrides[removedSkill];
        }
        if (typeof clean.attributeAllocationComplete !== "boolean") throw new TypeError("存档缺少属性分配状态");
        if (!Array.isArray(clean.inventory) || clean.inventory.some(function (item) {
          return typeof item !== "string";
        })) throw new TypeError("存档物品栏格式无效");
        this.validateRegisteredKeys(clean.attributes, this.attributeDefinitions, "属性");
        for (var _i3 = 0, _Object$entries = Object.entries(clean.attributes); _i3 < _Object$entries.length; _i3++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i3], 2),
            id = _Object$entries$_i[0],
            value = _Object$entries$_i[1];
          var definition = this.attributeDefinitions.get(id);
          if (!Number.isInteger(value) || value < definition.min || definition.max !== null && value > definition.max) {
            throw new TypeError("\u5B58\u6863\u5C5E\u6027 ".concat(id, " \u8D85\u51FA\u6CE8\u518C\u8303\u56F4"));
          }
        }
        this.validateRegisteredKeys(clean.skills, this.skillDefinitions, "技能");
        for (var _i4 = 0, _Object$entries2 = Object.entries(clean.skills); _i4 < _Object$entries2.length; _i4++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i4], 2),
            _id = _Object$entries2$_i[0],
            _value = _Object$entries2$_i[1];
          if (typeof _value !== "boolean") throw new TypeError("\u5B58\u6863\u6280\u80FD ".concat(_id, " \u4E0D\u662F\u5E03\u5C14\u503C"));
        }
        for (var _i5 = 0, _Object$entries3 = Object.entries(clean.skillOverrides); _i5 < _Object$entries3.length; _i5++) {
          var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i5], 2),
            _id2 = _Object$entries3$_i[0],
            locked = _Object$entries3$_i[1];
          if (!this.skillDefinitions.has(_id2) || locked !== true) throw new TypeError("\u5B58\u6863\u6280\u80FD\u5C4F\u853D\u72B6\u6001\u65E0\u6548\uFF1A".concat(_id2));
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
        this.checkAttempts = clean.checkAttempts;

        // 旧存档将驾驶室钥匙和操作面板钥匙合并为 crew_keys；恢复时拆成两个正式物品。
        if (this.inventory.includes("crew_keys")) {
          this.inventory = this.inventory.filter(function (itemId) {
            return itemId !== "crew_keys";
          });
          for (var _i6 = 0, _arr3 = ["driver_cab_key", "control_panel_key"]; _i6 < _arr3.length; _i6++) {
            var itemId = _arr3[_i6];
            if (!this.inventory.includes(itemId)) this.inventory.push(itemId);
          }
        }

        // 兼容旧版本已经翻到便签背面的存档：旧版本没有把便签加入物品栏，
        // 恢复后补入同一个物品 ID，避免已完成的进度丢失。
        if (this.flags.note_back_seen === true && !this.inventory.includes("note_06_item")) {
          this.inventory = [].concat(_toConsumableArray(this.inventory), ["note_06_item"]);
        }
        if (this.inventory.includes("note_06_item")) this.flags.note_collected = true;

        // 兼容已经完成 7 号车厢尸体调查的旧存档：旧版本没有保存收音机可见标记，
        // 但只要已经完成 E-007，就应当继续显示并允许点击收音机。
        if (clean.flags.visited_carriage_07 === true && clean.flags.radio_07_ready !== true && clean.flags.radio_07_done !== true) {
          this.flags.radio_07_ready = true;
        }
      }
    }, {
      key: "validateRegisteredKeys",
      value: function validateRegisteredKeys(values, definitions, label) {
        var keys = Object.keys(values);
        if (keys.length !== definitions.size || keys.some(function (id) {
          return !definitions.has(id);
        })) {
          throw new TypeError("\u5B58\u6863".concat(label, "\u4E0E\u5F53\u524D\u6CE8\u518C\u8868\u4E0D\u517C\u5BB9"));
        }
      }
    }, {
      key: "getAttribute",
      value: function getAttribute(attributeId) {
        this.requireDefinition(this.attributeDefinitions, attributeId, "属性");
        return this.attributes[attributeId];
      }
    }, {
      key: "setAttribute",
      value: function setAttribute(attributeId, value) {
        var definition = this.requireDefinition(this.attributeDefinitions, attributeId, "属性");
        if (!Number.isInteger(value)) throw new TypeError("\u5C5E\u6027 ".concat(attributeId, " \u53EA\u80FD\u8BBE\u7F6E\u4E3A\u6574\u6570"));
        var upperBound = definition.max === null ? value : Math.min(definition.max, value);
        var next = Math.max(definition.min, upperBound);
        if (this.attributes[attributeId] === next) return next;
        this.attributes[attributeId] = next;
        this.reevaluateSkillsFor(attributeId);
        return next;
      }
    }, {
      key: "modifyAttribute",
      value: function modifyAttribute(attributeId, amount) {
        if (!Number.isInteger(amount)) throw new TypeError("\u5C5E\u6027 ".concat(attributeId, " \u7684\u4FEE\u6539\u91CF\u5FC5\u987B\u662F\u6574\u6570"));
        return this.setAttribute(attributeId, this.getAttribute(attributeId) + amount);
      }
    }, {
      key: "completeAttributeAllocation",
      value: function completeAttributeAllocation(values) {
        if (this.attributeAllocationComplete) throw new Error("该存档已经完成属性分配");
        if (!isPlainObject(values)) throw new TypeError("属性分配结果格式无效");
        this.validateRegisteredKeys(values, this.attributeDefinitions, "属性");
        var spent = 0;
        var _iterator5 = _createForOfIteratorHelper(this.attributeDefinitions),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _step5$value = _slicedToArray(_step5.value, 2),
              id = _step5$value[0],
              definition = _step5$value[1];
            var value = values[id];
            if (!Number.isInteger(value) || value < definition.initial || definition.max !== null && value > definition.max) {
              throw new RangeError("\u5C5E\u6027 ".concat(id, " \u7684\u5206\u914D\u7ED3\u679C\u65E0\u6548"));
            }
            spent += value - definition.initial;
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
        if (spent !== this.totalAttributePoints) throw new RangeError("必须用完全部属性点");
        this.attributes = Game.deepClone(values);
        this.attributeAllocationComplete = true;
        this.reevaluateAllAutomaticSkills();
      }
    }, {
      key: "getSkill",
      value: function getSkill(skillId) {
        this.requireDefinition(this.skillDefinitions, skillId, "技能");
        return this.skills[skillId];
      }
    }, {
      key: "setSkill",
      value: function setSkill(skillId, value) {
        this.requireDefinition(this.skillDefinitions, skillId, "技能");
        if (typeof value !== "boolean") throw new TypeError("\u6280\u80FD ".concat(skillId, " \u53EA\u80FD\u8BBE\u7F6E\u4E3A\u5E03\u5C14\u503C"));
        this.skills[skillId] = value;
        return value;
      }
    }, {
      key: "learnSkill",
      value: function learnSkill(skillId) {
        this.requireDefinition(this.skillDefinitions, skillId, "技能");
        this.skillOverrides[skillId] = true;
        return this.setSkill(skillId, true);
      }
    }, {
      key: "loseSkill",
      value: function loseSkill(skillId) {
        this.requireDefinition(this.skillDefinitions, skillId, "技能");
        this.skillOverrides[skillId] = true;
        return this.setSkill(skillId, false);
      }
    }, {
      key: "reevaluateSkillsFor",
      value: function reevaluateSkillsFor(attributeId) {
        var _iterator6 = _createForOfIteratorHelper(this.skillsByAttribute.get(attributeId) || []),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var skillId = _step6.value;
            this.reevaluateAutomaticSkill(skillId);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
    }, {
      key: "reevaluateAllAutomaticSkills",
      value: function reevaluateAllAutomaticSkills() {
        var _iterator7 = _createForOfIteratorHelper(this.skillDefinitions.values()),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var skill = _step7.value;
            if (skill.autoTrigger) this.reevaluateAutomaticSkill(skill.id);
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
    }, {
      key: "reevaluateAutomaticSkill",
      value: function reevaluateAutomaticSkill(skillId) {
        if (Object.hasOwn(this.skillOverrides, skillId)) return;
        var skill = this.skillDefinitions.get(skillId);
        this.skills[skillId] = this.evaluateAttributeCondition(skill.autoTrigger);
      }
    }, {
      key: "evaluateAttributeCondition",
      value: function evaluateAttributeCondition(condition) {
        var _this = this;
        if (condition.all) return condition.all.every(function (part) {
          return _this.evaluateAttributeCondition(part);
        });
        if (condition.any) return condition.any.some(function (part) {
          return _this.evaluateAttributeCondition(part);
        });
        if (condition.not) return !this.evaluateAttributeCondition(condition.not);
        if (condition.sum) {
          var total = condition.sum.reduce(function (sum, attributeId) {
            return sum + _this.getAttribute(attributeId);
          }, 0);
          return operators[condition.operator](total, condition.value);
        }
        return operators[condition.operator](this.getAttribute(condition.attribute), condition.value);
      }
    }, {
      key: "addItem",
      value: function addItem(itemId) {
        if (!this.inventory.includes(itemId)) this.inventory.push(itemId);
      }
    }, {
      key: "removeItem",
      value: function removeItem(itemId) {
        this.inventory = this.inventory.filter(function (id) {
          return id !== itemId;
        });
      }
    }, {
      key: "setObjectState",
      value: function setObjectState(objectId, patch) {
        this.objectStates[objectId] = _objectSpread(_objectSpread({}, this.objectStates[objectId] || {}), Game.deepClone(patch));
      }
    }, {
      key: "requireDefinition",
      value: function requireDefinition(definitions, id, label) {
        var definition = definitions.get(id);
        if (!definition) throw new Error("".concat(label, "\u672A\u6CE8\u518C\uFF1A").concat(id));
        return definition;
      }
    }]);
  }();
  var SAVE_SLOT_COUNT = 3;
  function currentUserSaveKeyPrefix() {
    var _Game$Auth, _Game$Auth$currentUse;
    var username = (_Game$Auth = Game.Auth) === null || _Game$Auth === void 0 || (_Game$Auth$currentUse = _Game$Auth.currentUser) === null || _Game$Auth$currentUse === void 0 ? void 0 : _Game$Auth$currentUse.call(_Game$Auth);
    if (!username) throw new Error("必须登录后才能访问存档");
    return "train-game-save-user-v1:".concat(encodeURIComponent(username), ":slot");
  }
  var SaveManager = /*#__PURE__*/function () {
    function SaveManager(state) {
      var storageKeyPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      _classCallCheck(this, SaveManager);
      this.state = state;
      this.storageKeyPrefix = storageKeyPrefix !== null && storageKeyPrefix !== void 0 ? storageKeyPrefix : currentUserSaveKeyPrefix();
    }
    return _createClass(SaveManager, [{
      key: "normalizeCheckpoint",
      value: function normalizeCheckpoint(checkpoint) {
        if (!isPlainObject(checkpoint) || !isPlainObject(checkpoint.state)) {
          throw new TypeError("存档检查点格式无效");
        }
        var resume = checkpoint.resume;
        if (resume !== null && (!isPlainObject(resume) || typeof resume.eventId !== "string" || !resume.eventId || !Number.isInteger(resume.actionIndex) || resume.actionIndex < 0)) {
          throw new TypeError("存档检查点恢复游标无效");
        }
        if (checkpoint.state.attributeAllocationComplete !== true) {
          throw new Error("属性分配完成前不能保存");
        }
        return Game.deepClone({
          state: checkpoint.state,
          resume: resume || null
        });
      }
    }, {
      key: "slotKey",
      value: function slotKey(slot) {
        if (!Number.isInteger(slot) || slot < 1 || slot > SAVE_SLOT_COUNT) {
          throw new RangeError("\u5B58\u6863\u69FD\u4F4D\u5FC5\u987B\u662F 1 \u5230 ".concat(SAVE_SLOT_COUNT, " \u7684\u6574\u6570"));
        }
        return "".concat(this.storageKeyPrefix, "-").concat(slot);
      }
    }, {
      key: "readEnvelope",
      value: function readEnvelope(slot) {
        var raw = localStorage.getItem(this.slotKey(slot));
        if (raw === null) return null;
        var save = JSON.parse(raw);
        if (!isPlainObject(save)) {
          throw new Error("存档版本不兼容，请开始新的游戏");
        }
        if (save.saveVersion === LEGACY_SAVE_VERSION && isPlainObject(save.state)) {
          return {
            saveVersion: SAVE_VERSION,
            savedAt: save.savedAt,
            checkpoint: this.normalizeCheckpoint({
              state: save.state,
              resume: null
            }),
            migrated: true
          };
        }
        if (save.saveVersion !== SAVE_VERSION || !isPlainObject(save.checkpoint)) {
          throw new Error("存档版本不兼容，请开始新的游戏");
        }
        return _objectSpread(_objectSpread({}, save), {}, {
          checkpoint: this.normalizeCheckpoint(save.checkpoint)
        });
      }
    }, {
      key: "listSlots",
      value: function listSlots() {
        var _this2 = this;
        return Array.from({
          length: SAVE_SLOT_COUNT
        }, function (_, index) {
          var slot = index + 1;
          try {
            var _save$checkpoint$stat;
            var save = _this2.readEnvelope(slot);
            if (!save) return {
              slot: slot,
              empty: true,
              compatible: true
            };
            var previousState = _this2.state.snapshot();
            try {
              _this2.state.restore(save.checkpoint.state);
            } finally {
              _this2.state.restore(previousState);
            }
            return {
              slot: slot,
              empty: false,
              compatible: true,
              savedAt: typeof save.savedAt === "string" ? save.savedAt : null,
              sceneId: typeof save.checkpoint.state.sceneId === "string" ? save.checkpoint.state.sceneId : null,
              san: Number.isInteger((_save$checkpoint$stat = save.checkpoint.state.attributes) === null || _save$checkpoint$stat === void 0 ? void 0 : _save$checkpoint$stat.san) ? save.checkpoint.state.attributes.san : null
            };
          } catch (error) {
            return {
              slot: slot,
              empty: false,
              compatible: false,
              error: error instanceof Error ? error.message : "存档格式无效"
            };
          }
        });
      }
    }, {
      key: "hasSave",
      value: function hasSave(slot) {
        return localStorage.getItem(this.slotKey(slot)) !== null;
      }
    }, {
      key: "save",
      value: function save(slot, checkpoint) {
        var clean = this.normalizeCheckpoint(checkpoint);
        var previousState = this.state.snapshot();
        try {
          this.state.restore(clean.state);
        } finally {
          this.state.restore(previousState);
        }
        localStorage.setItem(this.slotKey(slot), JSON.stringify({
          saveVersion: SAVE_VERSION,
          savedAt: new Date().toISOString(),
          checkpoint: clean
        }));
      }
    }, {
      key: "load",
      value: function load(slot) {
        var save = this.readEnvelope(slot);
        return save ? Game.deepClone(save.checkpoint) : null;
      }
    }, {
      key: "delete",
      value: function _delete(slot) {
        localStorage.removeItem(this.slotKey(slot));
      }
    }]);
  }();
  Game.GameState = GameState;
  Game.SaveManager = SaveManager;
})(window.TrainGame);
