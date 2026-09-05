(function (Game) {
  "use strict";

  Game.registerProjectActions = function registerProjectActions(engine) {
    // JSON 只能调用这里显式注册过的名称，不能执行任意字符串代码。
    engine.registerCustomAction("flashScreen", async (params, context) => {
      const shell = document.querySelector("#game-shell");
      shell.classList.remove("flash");
      void shell.offsetWidth;
      shell.classList.add("flash");
      try {
        await context.wait(Number(params.duration || 450));
      } finally {
        shell.classList.remove("flash");
      }
    });

    engine.registerCustomAction("endGame", async (params, context) => {
      const reason = params.reason;
      if (!["true_end", "bad_end"].includes(reason)) {
        throw new Error(`未知结局类型：${reason || "空"}`);
      }
      context.state.flags.ending_reason = reason;
    });
  };
})(window.TrainGame);
