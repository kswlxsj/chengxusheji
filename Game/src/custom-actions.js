(function (Game) {
  "use strict";

  Game.registerProjectActions = function registerProjectActions(engine) {
    // JSON 只能调用这里显式注册过的名称，不能执行任意字符串代码。
    engine.registerCustomAction("flashScreen", async (params) => {
      const shell = document.querySelector("#game-shell");
      shell.classList.remove("flash");
      void shell.offsetWidth;
      shell.classList.add("flash");
      await Game.delay(Number(params.duration || 450));
      shell.classList.remove("flash");
    });
  };
})(window.TrainGame);
