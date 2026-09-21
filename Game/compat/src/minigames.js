function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (Game) {
  "use strict";

  // 小游戏注册表：游戏内所有小游戏的唯一索引，仿 dice.js 的“编号注册、JSON 只引用索引”分离架构。
  // - 每个小游戏是一份注册表条目 spec：{ title, allowQuit?, run(context) }。
  // - run 的契约：把玩法内容挂进 context.stage（无 DOM 的测试环境下可能为 null），
  //   当小游戏自然结束时 resolve；返回值可以是“结算动作列表”（由事件引擎按普通动作
  //   语义顺序执行）或 undefined（不结算，事件继续）。模块可经 context.onQuit 注册退出
  //   结算、经 context.registerCleanup 登记宿主关闭后执行的收尾函数。
  // - JSON 里 events.json 的 minigame 动作只写 spec.id（game 字段），机制全部留在 JS，
  //   与 check→dice.js 的规则一致，因此本文件必须能被编译器在 node:vm 下加载：
  //   顶层只做注册与注册表结构，不得触碰 DOM。
  // - 依赖 window.TrainGame；在 events.js 之后加载（minigame 动作运行时查询本注册表）。
  var registry = new Map();
  function assertSpec(spec) {
    if (!spec || _typeof(spec) !== "object") throw new TypeError("小游戏注册内容必须是对象");
    if (typeof spec.title !== "string" || !spec.title) throw new TypeError("小游戏缺少标题 title");
    if (spec.allowQuit !== undefined && typeof spec.allowQuit !== "boolean") {
      throw new TypeError("小游戏 allowQuit 必须是布尔值");
    }
    if (typeof spec.run !== "function") throw new TypeError("小游戏缺少运行入口 run(context)");
  }
  Game.Minigames = {
    register: function register(id, spec) {
      if (typeof id !== "string" || !id) throw new TypeError("小游戏编号必须是字符串");
      if (registry.has(id)) throw new Error("\u5C0F\u6E38\u620F\u91CD\u590D\u6CE8\u518C\uFF1A".concat(id));
      assertSpec(spec);
      registry.set(id, spec);
    },
    get: function get(id) {
      var spec = registry.get(id);
      if (!spec) throw new Error("\u5C0F\u6E38\u620F\u672A\u6CE8\u518C\uFF1A".concat(id));
      return spec;
    },
    has: function has(id) {
      return registry.has(id);
    },
    list: function list() {
      return _toConsumableArray(registry.keys());
    }
  };
})(window.TrainGame);
