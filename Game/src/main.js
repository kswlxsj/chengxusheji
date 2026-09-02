(function (Game, data) {
  "use strict";

  if (!data) {
    document.body.textContent = "缺少 data/compiled-game-data.js，请先运行数据编译器。";
    return;
  }

  const state = new Game.GameState(data.meta.initialState);
  const ui = new Game.UIManager(document.querySelector("#window-layer"));
  const sceneRoot = document.querySelector("#scene-layer");
  const scene = new Game.SceneManager(sceneRoot, data.scenes, state);
  const saves = new Game.SaveManager(state);
  const engine = new Game.EventEngine({ events: data.events, state, scene, ui, items: data.items });
  const gameShell = document.querySelector("#game-shell");
  const hud = document.querySelector("#hud");
  const pauseButton = document.querySelector("#pause-button");
  let startupLocked = true;
  let paused = false;
  let pauseTask = null;

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
    hud.hidden = startupLocked;
    pauseButton.disabled = startupLocked;
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
      engine.adoptStableState();
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

  function saveStableState() {
    const savedPreviousStablePoint = engine.busy;
    try {
      saves.save(engine.getStableSnapshot());
      ui.toast(savedPreviousStablePoint ? "已保存上一个稳定状态" : "已保存到本机浏览器");
      return true;
    } catch (error) {
      console.error("保存存档失败：", error);
      ui.toast(`保存失败：${errorMessage(error)}`);
      return false;
    }
  }

  function resumeGame() {
    if (!paused) return;
    paused = false;
    gameShell.classList.remove("paused");
    ui.closePauseMenus();
    engine.setPaused(false);
    scene.setInteractionEnabled(!engine.busy);
    updateHud();
  }

  async function confirmReturnToMenu() {
    return ui.confirmMenu.choose({
      title: "未保存的进度将丢失，确定返回主界面吗？",
      backdropClass: "menu-backdrop confirm-backdrop",
      options: [
        { label: "取消", value: false },
        { label: "确定返回", value: true }
      ]
    });
  }

  async function returnToMainMenu(saveFirst) {
    if (saveFirst && !saveStableState()) return false;
    startupLocked = true;
    updateHud();
    await engine.cancelToStable();
    paused = false;
    gameShell.classList.remove("paused");
    engine.setPaused(false);
    ui.closePauseMenus();
    scene.setInteractionEnabled(false);
    updateHud();
    await showMainMenu();
    return true;
  }

  async function runPauseMenu() {
    while (paused && !startupLocked) {
      const action = await ui.pauseMenu.choose({
        title: "游戏已暂停",
        options: [
          { label: "继续游戏", value: "resume" },
          { label: "保存", value: "save" },
          { label: "返回主界面", value: "return" },
          { label: "保存并返回主界面", value: "save-return" }
        ]
      });
      if (!paused || startupLocked) return;
      if (action === "resume" || action === null) {
        resumeGame();
        return;
      }
      if (action === "save") {
        saveStableState();
        continue;
      }
      if (action === "return") {
        const confirmed = await confirmReturnToMenu();
        if (!paused || startupLocked) return;
        if (!confirmed) continue;
        await returnToMainMenu(false);
        return;
      }
      if (action === "save-return") {
        if (await returnToMainMenu(true)) return;
      }
    }
  }

  function pauseGame() {
    if (startupLocked || paused) return;
    paused = true;
    gameShell.classList.add("paused");
    engine.setPaused(true);
    scene.setInteractionEnabled(false);
    updateHud();
    pauseTask = runPauseMenu().finally(() => { pauseTask = null; });
  }

  async function showMainMenu() {
    while (startupLocked) {
      let hasSave = false;
      try {
        hasSave = saves.hasSave();
      } catch (error) {
        console.error("检查存档失败：", error);
        ui.toast(`无法访问本机存档：${errorMessage(error)}`);
      }

      const selected = await ui.mainMenu.choose({
        title: data.meta.title,
        coverImage: data.meta.coverImage,
        backdropClass: "main-menu-backdrop",
        options: [
          { label: "新的游戏", value: "new" },
          {
            label: hasSave ? "读取存档" : "读取存档（暂无存档）",
            value: "load",
            disabled: !hasSave,
            description: hasSave ? "读取浏览器中的存档" : "当前浏览器没有存档"
          }
        ]
      });

      if (selected === "load") {
        if (!restoreSave()) continue;
        startupLocked = false;
        scene.setInteractionEnabled(true);
        updateHud();
        return;
      }
      if (selected === "new") {
        state.reset();
        scene.load(data.meta.initialScene);
        engine.adoptStableState();
        startupLocked = false;
        scene.setInteractionEnabled(true);
        updateHud();
        void engine.play(data.meta.startEvent);
        return;
      }
    }
  }

  pauseButton.addEventListener("click", pauseGame);

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || startupLocked || event.repeat) return;
    event.preventDefault();
    if (paused) resumeGame();
    else pauseGame();
  });

  sceneRoot.addEventListener("click", () => {
    if (engine.busy && !paused && ui.dialog.isAwaitingAdvance()) ui.dialog.handleAdvance();
  });

  scene.load(data.meta.initialScene);
  scene.setInteractionEnabled(false);
  updateHud();
  void showMainMenu();

  // 便于组员在浏览器控制台调试，不作为剧情 JSON 的公共接口。
  window.game = { state, ui, scene, engine, saves, pauseGame, resumeGame };
})(window.TrainGame, window.GAME_DATA);
