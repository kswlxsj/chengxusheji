(function (Game, data) {
  "use strict";

  if (!data) {
    document.body.textContent = "缺少 data/compiled-game-data.js，请先运行数据编译器。";
    return;
  }

  const flow = Game.PageFlow;
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const requestedSlot = flow.parseSlot(params.get("slot"));
  const state = new Game.GameState(data.meta.initialState, data.attributes, data.skills);
  const ui = new Game.UIManager(document.querySelector("#window-layer"));
  const sceneRoot = document.querySelector("#scene-layer");
  const scene = new Game.SceneManager(sceneRoot, data.scenes, state);
  const saves = new Game.SaveManager(state);
  let ending = false;
  const engine = new Game.EventEngine({
    events: data.events,
    state,
    scene,
    ui,
    items: data.items,
    shouldTerminate: (currentState) => currentState.getAttribute("san") <= 0,
    onTerminate: () => {
      if (ending) return;
      ending = true;
      flow.clearTransfer();
      flow.navigate("ending", { reason: "san" }, true);
    }
  });
  const gameShell = document.querySelector("#game-shell");
  const hud = document.querySelector("#hud");
  const inventoryBar = document.querySelector("#inventory-bar");
  const inventorySlots = document.querySelector("#inventory-slots");
  const pauseButton = document.querySelector("#pause-button");
  const itemDefinitions = new Map(data.items.map((item) => [item.id, item]));
  const minimumInventorySlots = 9;
  let startupLocked = true;
  let paused = false;
  let pauseTask = null;
  let activeSlot = requestedSlot;

  Game.registerProjectActions(engine);
  scene.onObjectClick = (eventId) => engine.play(eventId);

  function inspectInventoryItem(item) {
    if (!item || startupLocked || paused || engine.busy) return;
    void engine.play(item.inspectEvent);
  }

  function updateInventoryBar() {
    const slotCount = Math.max(minimumInventorySlots, state.inventory.length);
    inventorySlots.replaceChildren();
    for (let index = 0; index < slotCount; index += 1) {
      const itemId = state.inventory[index];
      const item = itemId ? itemDefinitions.get(itemId) : null;
      const slot = document.createElement("button");
      slot.type = "button";
      slot.className = `inventory-slot${item ? " occupied" : " empty"}`;
      slot.disabled = !item || startupLocked || paused || engine.busy;
      slot.title = item ? `${item.name}（点击调查）` : `空物品格 ${index + 1}`;
      slot.setAttribute("aria-label", slot.title);

      const shortcut = document.createElement("span");
      shortcut.className = "inventory-shortcut";
      shortcut.textContent = index < 9 ? String(index + 1) : "";
      slot.append(shortcut);

      if (item) {
        const image = document.createElement("img");
        image.src = item.image;
        image.alt = "";
        const name = document.createElement("span");
        name.className = "inventory-item-name";
        name.textContent = item.name;
        slot.append(image, name);
        slot.addEventListener("click", () => inspectInventoryItem(item));
      }
      inventorySlots.append(slot);
    }
  }

  function updateHud() {
    document.querySelector("#attributes").textContent = Object.entries(state.attributes)
      .map(([key, value]) => `${state.attributeDefinitions.get(key)?.name || key} ${value}`)
      .join(" · ");
    document.querySelector("#save-slot").textContent = activeSlot ? `槽位 ${activeSlot}` : "未绑定槽位";
    hud.hidden = startupLocked;
    inventoryBar.hidden = startupLocked;
    pauseButton.disabled = startupLocked;
    updateInventoryBar();
  }

  engine.onStateChanged = updateHud;

  function errorMessage(error) {
    return error instanceof Error ? error.message : "未知错误";
  }

  function restoreSave(slot) {
    const previousState = state.snapshot();
    try {
      if (!saves.load(slot)) {
        ui.toast(`槽位 ${slot} 还没有存档`);
        return false;
      }
      if (!state.sceneId || !scene.hasScene(state.sceneId)) {
        throw new Error(`存档引用了不存在的场景：${state.sceneId || "空"}`);
      }
      scene.load(state.sceneId);
      engine.adoptStableState();
      updateHud();
      ui.toast(`已读取槽位 ${slot}`);
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

  async function returnToMainMenu() {
    startupLocked = true;
    updateHud();
    await engine.cancelToStable();
    paused = false;
    gameShell.classList.remove("paused");
    engine.setPaused(false);
    ui.closePauseMenus();
    scene.setInteractionEnabled(false);
    updateHud();
    flow.clearTransfer();
    flow.navigate("home", {}, true);
  }

  function openSaveWriter(returnTo) {
    if (engine.busy) return false;
    try {
      flow.setTransfer({
        kind: "save-write",
        snapshot: engine.getStableSnapshot(),
        slot: activeSlot,
        returnTo
      });
      flow.navigate("saveWrite", { intent: "save" });
      return true;
    } catch (error) {
      console.error("准备跨页保存失败：", error);
      ui.toast(`无法打开存档写入页：${errorMessage(error)}`);
      return false;
    }
  }

  async function runPauseMenu() {
    while (paused && !startupLocked) {
      const savingDisabled = engine.busy;
      const action = await ui.pauseMenu.choose({
        title: "游戏已暂停",
        options: [
          { label: "继续游戏", value: "resume" },
          {
            label: savingDisabled ? "保存（事件结束后可用）" : "保存",
            value: "save",
            disabled: savingDisabled,
            description: savingDisabled ? "请先完成当前事件或对话" : "选择一个槽位写入"
          },
          { label: "返回主界面", value: "return" },
          {
            label: savingDisabled ? "保存并返回（事件结束后可用）" : "保存并返回主界面",
            value: "save-return",
            disabled: savingDisabled,
            description: savingDisabled ? "请先完成当前事件或对话" : "保存后返回主界面"
          }
        ]
      });
      if (!paused || startupLocked) return;
      if (action === "resume" || action === null) {
        resumeGame();
        return;
      }
      if (action === "save") {
        if (openSaveWriter("game")) return;
        continue;
      }
      if (action === "return") {
        const confirmed = await confirmReturnToMenu();
        if (!paused || startupLocked) return;
        if (!confirmed) continue;
        await returnToMainMenu();
        return;
      }
      if (action === "save-return") {
        if (openSaveWriter("home")) return;
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

  async function showStartupError(message, destination = "saveManager") {
    console.error(message);
    await ui.confirmMenu.choose({
      title: message,
      backdropClass: "menu-backdrop confirm-backdrop",
      options: [{ label: destination === "home" ? "返回主页" : "返回存档管理", value: true }]
    });
    flow.navigate(destination, {}, true);
  }

  async function saveInitialState(slot) {
    while (true) {
      try {
        saves.save(slot, engine.getStableSnapshot());
        return true;
      } catch (error) {
        console.error("建立初始存档失败：", error);
        const retry = await ui.confirmMenu.choose({
          title: `建立初始存档失败：${errorMessage(error)}`,
          backdropClass: "menu-backdrop confirm-backdrop",
          options: [
            { label: "返回主页", value: false },
            { label: "重试", value: true }
          ]
        });
        if (!retry) return false;
      }
    }
  }

  function activateGame() {
    startupLocked = false;
    paused = false;
    scene.setInteractionEnabled(true);
    updateHud();
  }

  async function startNewGame(slot) {
    state.reset();
    scene.load(data.meta.initialScene);
    const allocation = await ui.attributeAllocation.choose(
      [...state.attributeDefinitions.values()],
      state.totalAttributePoints
    );
    if (!allocation) {
      flow.navigate("home", {}, true);
      return;
    }
    state.completeAttributeAllocation(allocation);
    engine.adoptStableState();
    if (!await saveInitialState(slot)) {
      flow.navigate("home", {}, true);
      return;
    }
    activateGame();
    void engine.play(data.meta.startEvent);
  }

  function restoreTransfer(slot) {
    const transfer = flow.getTransfer("resume-game");
    if (!transfer || transfer.slot !== slot || !transfer.snapshot) {
      throw new Error("恢复游戏所需的临时状态不存在或已经失效");
    }
    state.restore(transfer.snapshot);
    flow.clearTransfer();
    if (!state.sceneId || !scene.hasScene(state.sceneId)) {
      throw new Error(`临时状态引用了不存在的场景：${state.sceneId || "空"}`);
    }
    scene.load(state.sceneId);
    engine.adoptStableState();
    activateGame();
  }

  async function initialize() {
    if (!requestedSlot || !["new", "load", "resume"].includes(mode)) {
      await showStartupError("游戏入口参数无效，请从主页重新进入。", "home");
      return;
    }
    try {
      if (mode === "new") {
        await startNewGame(requestedSlot);
        return;
      }
      if (mode === "load") {
        if (!restoreSave(requestedSlot)) throw new Error(`槽位 ${requestedSlot} 暂无存档`);
      } else {
        restoreTransfer(requestedSlot);
      }
      if (state.getAttribute("san") <= 0) {
        flow.navigate("ending", { reason: "san" }, true);
        return;
      }
      activateGame();
    } catch (error) {
      flow.clearTransfer();
      await showStartupError(`无法进入游戏：${errorMessage(error)}`);
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
  void initialize();

  // 便于组员在浏览器控制台调试，不作为剧情 JSON 的公共接口。
  window.game = { state, ui, scene, engine, saves, pauseGame, resumeGame };
})(window.TrainGame, window.GAME_DATA);
