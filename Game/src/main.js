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
  const ui = new Game.UIManager(document.querySelector("#window-layer"), data.audio);
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
    shouldTerminate: (currentState) => Boolean(currentState.flags.ending_reason)
      || currentState.getAttribute("san") <= 0,
    onTerminate: async () => {
      if (ending) return;
      ending = true;
      flow.clearTransfer();
      flow.clearRefreshSnapshot();
      const reason = state.flags.ending_reason || "san";
      Game.PlayerProfile?.unlockEnding?.(reason);
      // 预加载结局素材期间也不能继续播放旧场景音频。
      ui.audio?.stopAll?.({ immediate: true });
      ui.backgroundAudio?.stopAll?.({ immediate: true });
      // 终止是在最后一句对白执行时抛出的；先清理常规游戏 UI，
      // 再播放结局专属 OP，最后统一落到结局达成页。
      ui.cancelPending?.();
      if (hud) hud.hidden = true;
      if (inventoryBar) inventoryBar.hidden = true;
      document.querySelector("#toast")?.setAttribute("hidden", "");
      try {
        if (reason === "true_end" && typeof Game.playEndingASequence === "function") {
          await Game.playEndingASequence({
            root: gameShell,
            audio: ui.audio,
            backgroundAudio: ui.backgroundAudio
          });
          if (typeof Game.playThanksEndingSequence === "function") {
            await Game.playThanksEndingSequence({ root: gameShell });
          }
        }
        if (reason === "cry_end" && typeof Game.playCryEndingSequence === "function") {
          await Game.playCryEndingSequence({
            root: gameShell,
            audio: ui.audio,
            backgroundAudio: ui.backgroundAudio
          });
        }
        if (reason === "fake_end" && typeof Game.playFakeEndingSequence === "function") {
          await Game.playFakeEndingSequence({
            root: gameShell,
            audio: ui.audio,
            backgroundAudio: ui.backgroundAudio
          });
        }
        if (reason === "bad_end" && typeof Game.playParkingEndingSequence === "function") {
          await Game.playParkingEndingSequence({
            root: gameShell,
            audio: ui.audio,
            backgroundAudio: ui.backgroundAudio
          });
        }
        if (reason === "san" && typeof Game.playSanZeroSequence === "function") {
          await Game.playSanZeroSequence({
            root: gameShell,
            audio: ui.audio,
            backgroundAudio: ui.backgroundAudio
          });
        }
        if (reason === "lost" && typeof Game.playLostEndingSequence === "function") {
          await Game.playLostEndingSequence({
            root: gameShell,
            backgroundAudio: ui.backgroundAudio
          });
        }
      } catch (error) {
        console.error(`结局演出失败（${reason}）：`, error);
      } finally {
        navigateToEnding(reason);
      }
    }
  });
  const gameShell = document.querySelector("#game-shell");
  const hud = document.querySelector("#hud");
  const inventoryBar = document.querySelector("#inventory-bar");
  const inventorySlots = document.querySelector("#inventory-slots");
  const pauseButton = document.querySelector("#pause-button");
  const itemDefinitions = new Map(data.items.map((item) => [item.id, item]));
  const sceneDefinitions = new Map(data.scenes.map((definition) => [definition.id, definition]));
  const minimumInventorySlots = 10;
  let startupLocked = true;
  let paused = false;
  let pauseTask = null;
  let activeSlot = requestedSlot;
  const autosavedCarriagesFlag = "autosaved_carriages";
  let autosavedCarriageIds = new Set();
  const INNER_WORLD_SCENES = new Set([
    "carriage_inner_01",
    "carriage_inner_02",
    "carriage_fake_04",
    "carriage_fake_01",
    "carriage_fake_02",
    "carriage_fake_03",
    "flower_sea",
    "flower_sea_inside"
  ]);
  const INNER_WORLD_FLOWER_SEA_SCENES = new Set(["flower_sea", "flower_sea_inside"]);
  // 里世界静音区：只保留车门开/关、场景演出音与检定演出音。
  // 检定音（编号见 ui.js 的 DICE_SOUNDS）是玩家主动发起检定的即时反馈，不属于里世界的环境音，
  // 若一并静音，玩家在里世界做检定时会完全没有声音反馈，因此始终放行。
  const INNER_WORLD_ALLOWED_SOUNDS = [
    "door_open",
    "door_locked",
    "ghost_calling",
    "knocking_wall",
    "tinnitus_fake01",
    "dice_rolling",
    "dice_success",
    "dice_fail"
  ];
  function navigateToEnding(reason) {
    try {
      flow.navigate("endingReveal", { reason }, true);
    } catch (error) {
      console.error("结局页面跳转失败：", error);
      window.location.replace(flow.url("endingReveal", { reason }));
    }
  }

  Game.registerProjectActions(engine);
  scene.onObjectClick = (eventId) => engine.play(eventId);

  function visibleClickerInCarriage02() {
    if (state.sceneId !== "carriage_02") return null;
    const clicker = sceneDefinitions.get("carriage_02")?.objects
      ?.find((object) => object.id === "clicker_02");
    return clicker && !clicker.invisible && Game.evaluateCondition(clicker.visibleWhen, state)
      ? clicker
      : null;
  }

  function getClickerItemEvent(item) {
    if (!visibleClickerInCarriage02()) return null;
    if (item?.id === "bottle") return "E_028_THROW_FIRST";
    if (item?.id === "drink_empty") return "E_028_THROW_CAN_FIRST";
    if (item?.id === "drink") return "E_ITEM_DRINK_CLICKER_INSPECT";
    return null;
  }

  function getUnlitCarriage02ItemEvent(item) {
    if (state.sceneId !== "carriage_02" || state.flags.light_used === true) return null;
    return item?.id === "drink" ? "E_ITEM_DRINK_DARK_INSPECT" : null;
  }

  function maybeTriggerClickerReveal() {
    if (
      startupLocked
      || paused
      || engine.busy
      || state.sceneId !== "carriage_02"
      || state.flags.light_used !== true
      || state.flags.clicker_cleared === true
      || state.flags.clicker_first_encounter_seen === true
      || !visibleClickerInCarriage02()
    ) return;
    void engine.play("E_026");
  }

  function inspectInventoryItem(item) {
    if (!item || startupLocked || paused || engine.busy) return;
    const eventId = getUnlitCarriage02ItemEvent(item) || getClickerItemEvent(item) || item.inspectEvent;
    void engine.play(eventId);
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
      slot.title = item ? `${item.name}（点击使用/调查）` : `空物品格 ${index + 1}`;
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

  function syncAudioForScene() {
    const innerWorld = INNER_WORLD_SCENES.has(state.sceneId);
    const sceneAudioEnabled = !paused && !startupLocked;
    ui.audio?.setMuted?.(innerWorld, INNER_WORLD_ALLOWED_SOUNDS);
    const definition = sceneDefinitions.get(state.sceneId);
    const variant = (definition?.backgroundSoundVariants || [])
      .find((entry) => Game.evaluateCondition(entry.visibleWhen, state));
    const innerWorldLaughing = state.flags.inner_world_laughing === true
      && innerWorld
      && !INNER_WORLD_FLOWER_SEA_SCENES.has(state.sceneId);
    const track = sceneAudioEnabled
      ? (innerWorldLaughing
        ? { sound: "woman_laughing" }
        : (variant || definition?.backgroundSound || null))
      : null;
    ui.backgroundAudio?.setTrack?.(track?.sound || null, { loopGapMs: track?.loopGapMs });
  }

  function updateHud() {
    syncAudioForScene();
    document.querySelector("#attributes").textContent = Object.entries(state.attributes)
      .map(([key, value]) => `${state.attributeDefinitions.get(key)?.name || key} ${value}`)
      .join(" · ");
    document.querySelector("#save-slot").textContent = activeSlot ? `槽位 ${activeSlot}` : "未绑定槽位";
    hud.hidden = startupLocked;
    inventoryBar.hidden = startupLocked;
    // 小游戏期间屏蔽系统暂停：暂停按钮与 Esc 均由玩法窗口接管（见 pauseGame / keydown）。
    pauseButton.disabled = startupLocked || ui.minigame.isOpen();
    updateInventoryBar();
    maybeTriggerCarriage06Guide();
    autoSaveOnNewCarriage();
    maybeTriggerClickerReveal();
    rememberRefreshCheckpoint();
  }

  // 刷新恢复跟随事件引擎的稳定检查点；即使正在等待 choice，也不会记录半截动作状态。
  function rememberRefreshCheckpoint(checkpoint = engine.getCheckpoint()) {
    if (startupLocked || !activeSlot) return;
    flow.setRefreshCheckpoint(activeSlot, checkpoint);
  }

  function syncAutosavedCarriages() {
    const savedIds = Array.isArray(state.flags[autosavedCarriagesFlag])
      ? state.flags[autosavedCarriagesFlag].filter((sceneId) => typeof sceneId === "string")
      : [];
    autosavedCarriageIds = new Set(savedIds);
    if (data.meta.initialScene) autosavedCarriageIds.add(data.meta.initialScene);
    if (state.sceneId) autosavedCarriageIds.add(state.sceneId);
    state.flags[autosavedCarriagesFlag] = [...autosavedCarriageIds];
  }

  function autoSaveOnNewCarriage() {
    if (startupLocked || paused || engine.busy || !activeSlot || !state.sceneId) return;
    if (!Game.PlayerProfile.getAutoSaveEnabled()) return;
    if (autosavedCarriageIds.has(state.sceneId)) return;
    const checkpoint = engine.getCheckpoint();
    if (!checkpoint.state.sceneId || checkpoint.state.sceneId !== state.sceneId) return;
    const nextAutosavedIds = [...autosavedCarriageIds, checkpoint.state.sceneId];
    checkpoint.state.flags = {
      ...checkpoint.state.flags,
      [autosavedCarriagesFlag]: nextAutosavedIds
    };
    try {
      saves.save(activeSlot, checkpoint);
      autosavedCarriageIds = new Set(nextAutosavedIds);
      state.flags[autosavedCarriagesFlag] = nextAutosavedIds;
      engine.adoptCheckpoint(checkpoint.resume);
      ui.toast("已自动保存当前车厢进度");
    } catch (error) {
      console.error("切换车厢时自动保存失败：", error);
      ui.toast(`自动保存失败：${errorMessage(error)}`);
    }
  }

  function hasInvestigatedAllCarriage06Items() {
    return state.flags.note_back_seen === true
      && state.flags.map_seen === true;
  }

  function maybeTriggerCarriage06Guide() {
    if (
      startupLocked
      || paused
      || engine.busy
      || state.sceneId !== "carriage_06"
      || !hasInvestigatedAllCarriage06Items()
      || state.flags.carriage_06_guide_seen === true
    ) return;
    void engine.play("E_005_GUIDE");
  }

  engine.onStateChanged = updateHud;
  engine.onCheckpointChanged = rememberRefreshCheckpoint;

  function errorMessage(error) {
    return error instanceof Error ? error.message : "未知错误";
  }

  function restoreSave(slot) {
    const previousState = state.snapshot();
    const previousCheckpoint = engine.getCheckpoint();
    try {
      const checkpoint = saves.load(slot);
      if (!checkpoint) {
        ui.toast(`槽位 ${slot} 还没有存档`);
        return false;
      }
      engine.restoreCheckpoint(checkpoint);
      if (!state.sceneId || !scene.hasScene(state.sceneId)) {
        throw new Error(`存档引用了不存在的场景：${state.sceneId || "空"}`);
      }
      syncAutosavedCarriages();
      scene.load(state.sceneId);
      engine.adoptCheckpoint(checkpoint.resume);
      updateHud();
      ui.toast(`已读取槽位 ${slot}`);
      return true;
    } catch (error) {
      try {
        engine.restoreCheckpoint(previousCheckpoint);
      } catch (_restoreError) {
        state.restore(previousState);
      }
      scene.load(state.sceneId || data.meta.initialScene);
      updateHud();
      console.error("读取存档失败：", error);
      ui.toast(`读取失败：${errorMessage(error)}`);
      return false;
    }
  }

  function restoreRefreshCheckpoint(slot) {
    const checkpoint = flow.getRefreshCheckpoint(slot);
    if (!checkpoint) return false;
    const previousState = state.snapshot();
    const previousCheckpoint = engine.getCheckpoint();
    try {
      engine.restoreCheckpoint(checkpoint);
      if (!state.sceneId || !scene.hasScene(state.sceneId)) {
        throw new Error(`临时状态引用了不存在的场景：${state.sceneId || "空"}`);
      }
      syncAutosavedCarriages();
      scene.load(state.sceneId);
      engine.adoptCheckpoint(checkpoint.resume);
      return true;
    } catch (error) {
      try {
        engine.restoreCheckpoint(previousCheckpoint);
      } catch (_restoreError) {
        state.restore(previousState);
      }
      flow.clearRefreshSnapshot();
      console.warn("刷新恢复临时状态失败：", error);
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
    await engine.cancelToCheckpoint();
    paused = false;
    gameShell.classList.remove("paused");
    engine.setPaused(false);
    ui.closePauseMenus();
    scene.setInteractionEnabled(false);
    updateHud();
    flow.clearTransfer();
    flow.clearRefreshSnapshot();
    flow.navigate("home", {}, true);
  }

  async function openSaveManager() {
    try {
      await engine.cancelToCheckpoint();
      ui.closePauseMenus();
      flow.clearRefreshSnapshot();
      flow.setTransfer({
        kind: "save-manager-game",
        checkpoint: engine.getCheckpoint(),
        slot: activeSlot
      });
      flow.navigate("saveManager", { intent: "game" });
      return true;
    } catch (error) {
      console.error("准备打开存档管理失败：", error);
      ui.toast(`无法打开存档管理：${errorMessage(error)}`);
      return false;
    }
  }

  async function runPauseMenu() {
    while (paused && !startupLocked) {
      const action = await ui.pauseMenu.choose({
        title: "游戏已暂停",
        options: [
          { label: "继续游戏", value: "resume" },
          { label: "存档管理", value: "save-manager", description: "存档、读取或删除存档" },
          { label: "返回主界面", value: "return" },
          { label: "保存并返回主界面", value: "save-return", description: "保存最近的稳定检查点后返回" }
        ]
      });
      if (!paused || startupLocked) return;
      if (action === "resume" || action === null) {
        resumeGame();
        return;
      }
      if (action === "save-manager") {
        if (await openSaveManager()) return;
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
        try {
          await engine.cancelToCheckpoint();
          saves.save(activeSlot, engine.getCheckpoint());
          await returnToMainMenu();
          return;
        } catch (error) {
          console.error("保存并返回失败：", error);
          ui.toast(`保存失败：${errorMessage(error)}`);
        }
      }
    }
  }

  function pauseGame() {
    if (startupLocked || paused || ending || ui.minigame.isOpen()) return;
    paused = true;
    gameShell.classList.add("paused");
    engine.setPaused(true);
    scene.setInteractionEnabled(false);
    updateHud();
    pauseTask = runPauseMenu().catch((error) => {
      console.error("暂停菜单运行失败，已自动恢复游戏：", error);
      resumeGame();
    }).finally(() => { pauseTask = null; });
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

  async function saveInitialCheckpoint(slot) {
    while (true) {
      try {
        saves.save(slot, engine.getCheckpoint());
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
    flow.clearRefreshSnapshot();
    state.reset();
    scene.load(data.meta.initialScene);
    syncAutosavedCarriages();
    const allocation = await ui.attributeAllocation.choose(
      [...state.attributeDefinitions.values()],
      state.totalAttributePoints
    );
    if (!allocation) {
      flow.navigate("home", {}, true);
      return;
    }
    state.completeAttributeAllocation(allocation);
    engine.adoptCheckpoint({ eventId: data.meta.startEvent, actionIndex: 0 });
    if (!await saveInitialCheckpoint(slot)) {
      flow.navigate("home", {}, true);
      return;
    }
    activateGame();
    void engine.resumeCheckpoint();
  }

  function restoreTransfer(slot) {
    const transfer = flow.getTransfer("resume-game");
    if (!transfer || transfer.slot !== slot || !transfer.checkpoint) {
      throw new Error("恢复游戏所需的临时状态不存在或已经失效");
    }
    engine.restoreCheckpoint(transfer.checkpoint);
    syncAutosavedCarriages();
    flow.clearTransfer();
    if (!state.sceneId || !scene.hasScene(state.sceneId)) {
      throw new Error(`临时状态引用了不存在的场景：${state.sceneId || "空"}`);
    }
    scene.load(state.sceneId);
    engine.adoptCheckpoint(transfer.checkpoint.resume);
  }

  async function initialize() {
    if (!requestedSlot || !["new", "load", "resume"].includes(mode)) {
      await showStartupError("游戏入口参数无效，请从主页重新进入。", "home");
      return;
    }
    try {
      const newGameRequested = mode === "new" && flow.consumeNewGameIntent(requestedSlot);
      if (newGameRequested) {
        await startNewGame(requestedSlot);
        return;
      }
      if (flow.isReloadNavigation() && restoreRefreshCheckpoint(requestedSlot)) {
        if (state.getAttribute("san") <= 0) {
          flow.clearRefreshSnapshot();
          flow.navigate("endingReveal", { reason: "san" }, true);
          return;
        }
        activateGame();
        void engine.resumeCheckpoint();
        return;
      }
      if (mode === "new") {
        if (restoreSave(requestedSlot)) {
          activateGame();
          void engine.resumeCheckpoint();
        } else {
          await startNewGame(requestedSlot);
        }
        return;
      }
      if (mode === "load") {
        if (!restoreSave(requestedSlot)) throw new Error(`槽位 ${requestedSlot} 暂无存档`);
      } else {
        restoreTransfer(requestedSlot);
      }
      if (state.getAttribute("san") <= 0) {
        flow.navigate("endingReveal", { reason: "san" }, true);
        return;
      }
      activateGame();
      void engine.resumeCheckpoint();
    } catch (error) {
      flow.clearTransfer();
      await showStartupError(`无法进入游戏：${errorMessage(error)}`);
    }
  }

  pauseButton.addEventListener("click", pauseGame);

  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.repeat || startupLocked || ui.minigame.isOpen()) return;
    const shortcuts = Game.PlayerProfile.getShortcutSettings();
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (key === shortcuts.pause) {
      event.preventDefault();
      if (paused) resumeGame();
      else pauseGame();
      return;
    }
    // 对话相关快捷键只在等待推进时响应，避免干扰选项、检定和物品调查等窗口。
    if (paused || !ui.dialog.isAwaitingAdvance()) return;
    if (key === shortcuts.advance) {
      event.preventDefault();
      ui.dialog.handleAdvance();
      return;
    }
    if (key === shortcuts.auto) {
      event.preventDefault();
      ui.dialog.setAuto(!ui.dialog.auto);
      return;
    }
    if (key === shortcuts.fast) {
      event.preventDefault();
      ui.dialog.setFast(!ui.dialog.fast);
    }
  });

  sceneRoot.addEventListener("click", () => {
    if (engine.busy) {
      // 场景空白点击只推进已完整显示的对白；流式输出期间不得补全文字。
      if (!paused && ui.dialog.isAwaitingAdvance() && !ui.dialog.player.running) {
        ui.dialog.handleAdvance();
      }
    }
  });
  window.addEventListener("pagehide", () => {
    ui.audio?.stopAll?.({ immediate: true });
    ui.backgroundAudio?.stopAll?.({ immediate: true });
  });
  scene.load(data.meta.initialScene);
  scene.setInteractionEnabled(false);
  updateHud();
  void initialize();

  // 便于组员在浏览器控制台调试，不作为剧情 JSON 的公共接口。
  window.game = {
    state,
    ui,
    scene,
    engine,
    saves,
    pauseGame,
    resumeGame
  };
})(window.TrainGame, window.GAME_DATA);
