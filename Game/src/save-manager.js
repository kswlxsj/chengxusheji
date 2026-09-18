(function (Game, data) {
  "use strict";

  if (!data) {
    document.body.textContent = "缺少 data/compiled-game-data.js，请先运行数据编译器。";
    return;
  }

  const flow = Game.PageFlow;
  const intent = new URLSearchParams(window.location.search).get("intent");
  const mode = intent === "new" ? "new" : intent === "game" ? "game" : "home";
  const transfer = mode === "game" ? flow.getTransfer("save-manager-game") : null;
  const state = new Game.GameState(data.meta.initialState, data.attributes, data.skills);
  const saves = new Game.SaveManager(state);
  const list = document.querySelector("#save-slots");
  const title = document.querySelector("#save-title");
  const introduction = document.querySelector("#save-introduction");
  const error = document.querySelector("#page-error");
  const footerAction = document.querySelector("#save-footer-action");
  const sceneNames = new Map(data.scenes.map((scene) => [scene.id, scene.name]));

  function formatTime(value) {
    if (!value) return "保存时间未知";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "保存时间未知" : date.toLocaleString("zh-CN");
  }

  function sceneNameOf(info) {
    return sceneNames.get(info.sceneId) || info.sceneId || "未知场景";
  }

  function describe(info) {
    if (info.empty) return "暂无存档";
    if (!info.compatible) return `无法读取：${info.error}`;
    return `${sceneNameOf(info)} · SAN ${info.san ?? "未知"} · ${formatTime(info.savedAt)}`;
  }

  function resumeGame() {
    flow.setTransfer({ kind: "resume-game", checkpoint: transfer.checkpoint, slot: transfer.slot });
    flow.navigate("game", { mode: "resume", slot: transfer.slot }, true);
  }

  function loadSlot(slot) {
    flow.clearTransfer();
    flow.clearRefreshSnapshot();
    flow.navigate("game", { mode: "load", slot });
  }

  async function removeSlot(info) {
    const confirmed = await Game.ConfirmDialog.ask({
      title: `确定删除槽位 ${info.slot} 的存档吗？此操作无法撤销。`,
      confirmLabel: "确定删除"
    });
    if (!confirmed) return;
    saves.delete(info.slot);
    render();
  }

  async function chooseNewSlot(slot) {
    if (saves.hasSave(slot)) {
      const confirmed = await Game.ConfirmDialog.ask({
        title: `槽位 ${slot} 已有存档。属性分配确认后将覆盖它，是否继续？`,
        confirmLabel: "继续覆盖"
      });
      if (!confirmed) return;
    }
    flow.clearTransfer();
    flow.clearRefreshSnapshot();
    flow.markNewGameIntent(slot);
    flow.navigate("game", { mode: "new", slot });
  }

  async function saveSlot(info) {
    if (info.slot !== transfer.slot && saves.hasSave(info.slot)) {
      const confirmed = await Game.ConfirmDialog.ask({
        title: `确定覆盖槽位 ${info.slot} 的存档吗？`,
        confirmLabel: "确定覆盖"
      });
      if (!confirmed) return;
    }
    try {
      saves.save(info.slot, transfer.checkpoint);
      error.textContent = `已保存到槽位 ${info.slot}。`;
      render();
    } catch (saveError) {
      console.error("写入存档失败：", saveError);
      error.textContent = `写入失败：${saveError instanceof Error ? saveError.message : "未知错误"}`;
    }
  }

  function addButton(actions, label, handler, disabled = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.disabled = disabled;
    button.addEventListener("click", handler);
    actions.append(button);
  }

  function createCard(info) {
    const card = document.createElement("article");
    card.className = "save-slot-card";
    const text = document.createElement("div");
    text.className = "save-slot-info";
    const heading = document.createElement("h2");
    heading.textContent = `槽位 ${info.slot}${mode === "game" && transfer.slot === info.slot ? "（当前）" : ""}`;
    const detail = document.createElement("p");
    detail.textContent = describe(info);
    text.append(heading, detail);
    card.append(text, Game.SaveSlotArt.createPreview(info, sceneNameOf(info)));
    return card;
  }

  function renderNewGameSlot(info) {
    const card = createCard(info);
    card.classList.add("selectable-slot");
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.addEventListener("click", () => { void chooseNewSlot(info.slot); });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        void chooseNewSlot(info.slot);
      }
    });
    list.append(card);
  }

  function renderManagedSlot(info) {
    const card = createCard(info);
    const actions = document.createElement("div");
    actions.className = "slot-actions";
    if (mode === "game") addButton(actions, "存档", () => { void saveSlot(info); });
    addButton(actions, "读取", () => loadSlot(info.slot), info.empty || !info.compatible);
    addButton(actions, "删除", () => { void removeSlot(info); }, info.empty);
    card.append(actions);
    list.append(card);
  }

  function render() {
    list.replaceChildren();
    if (mode === "game" && (!transfer?.checkpoint || !flow.parseSlot(transfer.slot))) {
      title.textContent = "存档管理";
      introduction.textContent = "本次游戏的存档请求已失效。";
      error.textContent = "无法恢复原游戏，请返回主页重新进入。";
      footerAction.textContent = "返回主页";
      return;
    }

    if (mode === "new") {
      title.textContent = "为新游戏选择槽位";
      introduction.textContent = "属性分配确认后才会覆盖所选槽位。";
      footerAction.textContent = "取消";
    } else if (mode === "game") {
      title.textContent = "存档管理";
      introduction.textContent = "可保存最近的稳定检查点、读取其他存档或删除存档。";
      footerAction.textContent = "返回游戏";
    } else {
      title.textContent = "存档管理";
      introduction.textContent = "选择已有存档继续游戏，或删除不再需要的存档。";
      footerAction.textContent = "返回主页";
    }

    for (const info of saves.listSlots()) {
      if (mode === "new") renderNewGameSlot(info);
      else renderManagedSlot(info);
    }
  }

  footerAction.addEventListener("click", () => {
    if (mode === "game" && transfer?.checkpoint && flow.parseSlot(transfer.slot)) {
      resumeGame();
      return;
    }
    flow.clearTransfer();
    flow.navigate("home", {}, true);
  });
  render();
})(window.TrainGame, window.GAME_DATA);
