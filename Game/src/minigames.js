(function (Game) {
  "use strict";

  // 小游戏注册表：游戏内所有小游戏的唯一索引，仿 dice.js 的“编号注册、JSON 只引用索引”分离架构。
  // - 每个小游戏是一份注册表条目 spec：{ title, run(context) }。
  // - run 的契约：把玩法内容挂进 context.stage（无 DOM 的测试环境下可能为 null），
  //   当小游戏自然结束时 resolve；返回值可以是“结算动作列表”（由事件引擎按普通动作
  //   语义顺序执行）或 undefined（不结算，事件继续）。模块可经 context.onQuit 注册退出
  //   结算、经 context.registerCleanup 登记宿主关闭后执行的收尾函数。
  // - JSON 里 events.json 的 minigame 动作只写 spec.id（game 字段），机制全部留在 JS，
  //   与 check→dice.js 的规则一致，因此本文件必须能被编译器在 node:vm 下加载：
  //   顶层只做注册与注册表结构，不得触碰 DOM。
  // - 依赖 window.TrainGame；在 events.js 之后加载（minigame 动作运行时查询本注册表）。
  const registry = new Map();

  function assertSpec(spec) {
    if (!spec || typeof spec !== "object") throw new TypeError("小游戏注册内容必须是对象");
    if (typeof spec.title !== "string" || !spec.title) throw new TypeError("小游戏缺少标题 title");
    if (typeof spec.run !== "function") throw new TypeError("小游戏缺少运行入口 run(context)");
  }

  Game.Minigames = {
    register(id, spec) {
      if (typeof id !== "string" || !id) throw new TypeError("小游戏编号必须是字符串");
      if (registry.has(id)) throw new Error(`小游戏重复注册：${id}`);
      assertSpec(spec);
      registry.set(id, spec);
    },
    get(id) {
      const spec = registry.get(id);
      if (!spec) throw new Error(`小游戏未注册：${id}`);
      return spec;
    },
    has(id) {
      return registry.has(id);
    },
    list() {
      return [...registry.keys()];
    }
  };
})(window.TrainGame);
