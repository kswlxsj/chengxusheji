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

    engine.registerCustomAction("modifyAttributeByDice", async (params, context) => {
      const count = Math.max(0, Number.parseInt(params.count ?? 0, 10));
      const sides = Math.max(1, Number.parseInt(params.sides ?? 1, 10));
      const bonus = Number.parseInt(params.bonus ?? 0, 10);
      const direction = params.direction === "gain" ? 1 : -1;
      let amount = bonus;
      const rolls = [];
      for (let index = 0; index < count; index += 1) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        amount += roll;
      }
      amount = Math.max(0, amount);
      const before = context.state.getAttribute(params.attribute);
      const after = context.state.modifyAttribute(params.attribute, direction * amount);
      const expression = count > 0 ? `${count}d${sides}${bonus ? `+${bonus}` : ""}` : String(bonus);
      context.ui.toast(`${params.label || params.attribute} ${direction > 0 ? "+" : "-"}${before === after ? 0 : Math.abs(after - before)}（${expression}：${rolls.join("+") || bonus}）`);
    });
  };
})(window.TrainGame);
