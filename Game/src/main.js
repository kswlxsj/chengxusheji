(function (Game, data) {
  "use strict";

  if (!data) {
    document.body.textContent = "缺少 data/compiled-game-data.js，请先运行数据编译器。";
    return;
  }

  const state = new Game.GameState(data.meta.initialState);
  const ui = new Game.UIManager(document.querySelector("#window-layer"));
  const scene = new Game.SceneManager(document.querySelector("#scene-layer"), data.scenes, state);
  const saves = new Game.SaveManager(state);
  const engine = new Game.EventEngine({ events: data.events, state, scene, ui, items: data.items });

  Game.registerProjectActions(engine);
  scene.onObjectClick = (eventId) => engine.play(eventId);

  function itemName(itemId) {
    return data.items.find((item) => item.id === itemId)?.name || itemId;
  }

  function updateHud() {
    document.querySelector("#attributes").textContent = Object.entries(state.attributes)
      .map(([key, value]) => `${key.toUpperCase()} ${value}`)
      .join(" · ");
    const names = state.inventory.map(itemName);
    document.querySelector("#inventory").textContent = `物品：${names.length ? names.join("、") : "无"}`;
    const disabled = engine.busy;
    document.querySelector("#save-button").disabled = disabled;
    document.querySelector("#load-button").disabled = disabled;
    document.querySelector("#reset-button").disabled = disabled;
  }

  engine.onStateChanged = updateHud;

  document.querySelector("#save-button").addEventListener("click", () => {
    saves.save();
    ui.toast("已保存到本机浏览器");
  });

  document.querySelector("#load-button").addEventListener("click", () => {
    if (!saves.load()) {
      ui.toast("还没有存档");
      return;
    }
    scene.load(state.sceneId || data.meta.initialScene);
    updateHud();
    ui.toast("已读取存档");
  });

  document.querySelector("#reset-button").addEventListener("click", () => {
    if (!confirm("确定要重开示例吗？现有手动存档不会删除。")) return;
    state.reset();
    scene.load(data.meta.initialScene);
    updateHud();
    engine.play(data.meta.startEvent);
  });

  scene.load(data.meta.initialScene);
  updateHud();
  engine.play(data.meta.startEvent);

  // 便于组员在浏览器控制台调试，不作为剧情 JSON 的公共接口。
  window.game = { state, ui, scene, engine, saves };
})(window.TrainGame, window.GAME_DATA);
