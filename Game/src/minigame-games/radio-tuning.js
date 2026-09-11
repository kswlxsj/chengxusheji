(function (Game) {
  "use strict";

  // 复用项目已有的收音机调频原型，避免游戏内维护两套玩法。
  // 原型完成后通过 postMessage 把结果交回事件引擎。
  function run(context) {
    if (!context.stage) return Promise.resolve(null);

    const stage = context.stage;
    const frame = document.createElement("iframe");
    frame.className = "mg-radio-iframe";
    frame.title = "动态范围调频小游戏";
    frame.src = "corpse-radio-prototype.html?embed=1";
    stage.replaceChildren(frame);

    let settled = false;
    let resolveSettlement = null;
    const finishedPromise = new Promise((resolve) => { resolveSettlement = resolve; });

    const onMessage = (event) => {
      if (event.source !== frame.contentWindow) return;
      if (!event.data || event.data.type !== "train-radio-complete") return;
      if (settled) return;
      settled = true;
      // 给原型的成功页留出展示隐藏广播的时间，再回到剧情。
      window.setTimeout(() => resolveSettlement([
        { type: "setFlag", key: "radio_07_done", value: true },
        { type: "dialogue", text: "电流声突然停了。收音机里，传来一段断断续续的广播。" }
      ]), 2200);
    };

    window.addEventListener("message", onMessage);
    context.onQuit(() => null);
    context.registerCleanup(() => {
      window.removeEventListener("message", onMessage);
    });

    return finishedPromise;
  }

  Game.Minigames.register("radio_tuning", {
    title: "动态范围调频",
    run
  });
})(window.TrainGame);
