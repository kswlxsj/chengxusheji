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
  let startupLocked = true;

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
    const disabled = startupLocked || engine.busy;
    document.querySelector("#save-button").disabled = disabled;
    document.querySelector("#load-button").disabled = disabled;
    document.querySelector("#reset-button").disabled = disabled;
  }

  engine.onStateChanged = updateHud;

  function errorMessage(error) {
    return error instanceof Error ? error.message : "未知错误";
  }

  function restoreSave() {
    const previousState = state.snapshot();
    try {
      if (!saves.load()) {
        ui.toast("还没有存档");
        return false;
      }
      if (!state.sceneId || !scene.hasScene(state.sceneId)) {
        throw new Error(`存档引用了不存在的场景：${state.sceneId || "空"}`);
      }
      scene.load(state.sceneId);
      updateHud();
      ui.toast("已读取存档");
      return true;
    } catch (error) {
      state.restore(previousState);
      scene.load(state.sceneId || data.meta.initialScene);
      updateHud();
      console.error("读取存档失败：", error);
      ui.toast(`读取失败：${errorMessage(error)}`);
      return false;
    }
  }

  document.querySelector("#save-button").addEventListener("click", () => {
    if (startupLocked || engine.busy) return;
    try {
      saves.save();
      ui.toast("已保存到本机浏览器");
    } catch (error) {
      console.error("保存存档失败：", error);
      ui.toast(`保存失败：${errorMessage(error)}`);
    }
  });

  document.querySelector("#load-button").addEventListener("click", () => {
    if (startupLocked || engine.busy) return;
    restoreSave();
  });

  document.querySelector("#reset-button").addEventListener("click", () => {
    if (startupLocked || engine.busy) return;
    if (!confirm("确定要重开示例吗？现有手动存档不会删除。")) return;
    state.reset();
    scene.load(data.meta.initialScene);
    updateHud();
    engine.play(data.meta.startEvent);
  });

  async function showStartupMenu() {
    while (startupLocked) {
      let hasSave = false;
      try {
        hasSave = saves.hasSave();
      } catch (error) {
        console.error("检查存档失败：", error);
        ui.toast(`无法访问本机存档：${errorMessage(error)}`);
      }

      const options = [{ label: "开始新游戏", mode: "new" }];
      if (hasSave) options.unshift({ label: "读取存档", mode: "load" });
      const selected = await ui.choice.choose(
        hasSave ? "请选择开始方式" : "未找到存档，请开始新游戏",
        options
      );

      if (selected.mode === "load") {
        if (!restoreSave()) continue;
        startupLocked = false;
        scene.setInteractionEnabled(true);
        updateHud();
        return;
      }

      state.reset();
      scene.load(data.meta.initialScene);
      startupLocked = false;
      updateHud();
      await engine.play(data.meta.startEvent);
    }
  }

  scene.load(data.meta.initialScene);
  scene.setInteractionEnabled(false);
  updateHud();
  showStartupMenu();

  // 便于组员在浏览器控制台调试，不作为剧情 JSON 的公共接口。
  window.game = { state, ui, scene, engine, saves };
})(window.TrainGame, window.GAME_DATA);
