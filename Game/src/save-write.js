(function (Game, data) {
  "use strict";

  if (!data) {
    document.body.textContent = "缺少 data/compiled-game-data.js，请先运行数据编译器。";
    return;
  }

  const flow = Game.PageFlow;
  const intent = new URLSearchParams(window.location.search).get("intent");
  const transfer = intent === "save" ? flow.getTransfer("save-write") : null;
  const state = new Game.GameState(data.meta.initialState, data.attributes, data.skills);
  const saves = new Game.SaveManager(state);
  const list = document.querySelector("#save-slots");
  const error = document.querySelector("#page-error");
  const sceneNames = new Map(data.scenes.map((scene) => [scene.id, scene.name]));

  function formatTime(value) {
    if (!value) return "保存时间未知";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "保存时间未知" : date.toLocaleString("zh-CN");
  }

  function resumeGame(snapshot, slot) {
    flow.setTransfer({ kind: "resume-game", snapshot, slot });
    flow.navigate("game", { mode: "resume", slot }, true);
  }

  function chooseNewSlot(slot) {
    if (saves.hasSave(slot) && !window.confirm(`槽位 ${slot} 已有存档。属性分配确认后将覆盖它，是否继续？`)) return;
    flow.clearTransfer();
    flow.navigate("game", { mode: "new", slot });
  }

  function writeSlot(slot) {
    if (saves.hasSave(slot) && !window.confirm(`确定覆盖槽位 ${slot} 的存档吗？`)) return;
    try {
      saves.save(slot, transfer.snapshot);
      flow.clearTransfer();
      if (transfer.returnTo === "home") {
        flow.navigate("home", {}, true);
        return;
      }
      resumeGame(transfer.snapshot, slot);
    } catch (saveError) {
      console.error("写入存档失败：", saveError);
      error.textContent = `写入失败：${saveError instanceof Error ? saveError.message : "未知错误"}`;
    }
  }

  function cancel() {
    if (intent === "new") {
      flow.clearTransfer();
      flow.navigate("home", {}, true);
      return;
    }
    if (!transfer || !flow.parseSlot(transfer.slot)) {
      flow.clearTransfer();
      flow.navigate("home", {}, true);
      return;
    }
    flow.clearTransfer();
    resumeGame(transfer.snapshot, transfer.slot);
  }

  function render() {
    if (intent !== "new" && (intent !== "save" || !transfer?.snapshot || !flow.parseSlot(transfer.slot))) {
      error.textContent = "写入请求不存在或已经失效，请返回主页重新进入。";
      document.querySelector("#cancel-write").textContent = "返回主页";
      return;
    }

    document.querySelector("#write-title").textContent = intent === "new" ? "为新游戏选择槽位" : "选择写入槽位";
    document.querySelector("#write-introduction").textContent = intent === "new"
      ? "属性分配确认后才会覆盖所选槽位。"
      : "选择任意槽位保存当前稳定状态。";

    for (const info of saves.listSlots()) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "save-slot-card selectable-slot";
      const heading = document.createElement("strong");
      heading.textContent = `槽位 ${info.slot}${transfer?.slot === info.slot ? "（当前）" : ""}`;
      const detail = document.createElement("span");
      if (info.empty) detail.textContent = "暂无存档";
      else if (!info.compatible) detail.textContent = `现有存档无法读取，写入将覆盖：${info.error}`;
      else detail.textContent = `${sceneNames.get(info.sceneId) || info.sceneId || "未知场景"} · SAN ${info.san ?? "未知"} · ${formatTime(info.savedAt)}`;
      button.append(heading, detail);
      button.addEventListener("click", () => intent === "new" ? chooseNewSlot(info.slot) : writeSlot(info.slot));
      list.append(button);
    }
  }

  document.querySelector("#cancel-write").addEventListener("click", cancel);
  render();
})(window.TrainGame, window.GAME_DATA);
