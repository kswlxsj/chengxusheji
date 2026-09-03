(function (Game, data) {
  "use strict";

  if (!data) {
    document.body.textContent = "缺少 data/compiled-game-data.js，请先运行数据编译器。";
    return;
  }

  const state = new Game.GameState(data.meta.initialState, data.attributes, data.skills);
  const saves = new Game.SaveManager(state);
  const list = document.querySelector("#save-slots");
  const sceneNames = new Map(data.scenes.map((scene) => [scene.id, scene.name]));

  function formatTime(value) {
    if (!value) return "保存时间未知";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "保存时间未知" : date.toLocaleString("zh-CN");
  }

  function render() {
    list.replaceChildren();
    for (const info of saves.listSlots()) {
      const card = document.createElement("article");
      card.className = "save-slot-card";
      const text = document.createElement("div");
      const heading = document.createElement("h2");
      heading.textContent = `槽位 ${info.slot}`;
      const detail = document.createElement("p");
      if (info.empty) detail.textContent = "暂无存档";
      else if (!info.compatible) detail.textContent = `无法读取：${info.error}`;
      else detail.textContent = `${sceneNames.get(info.sceneId) || info.sceneId || "未知场景"} · SAN ${info.san ?? "未知"} · ${formatTime(info.savedAt)}`;
      text.append(heading, detail);

      const actions = document.createElement("div");
      actions.className = "slot-actions";
      const load = document.createElement("button");
      load.type = "button";
      load.textContent = "读取";
      load.disabled = info.empty || !info.compatible;
      load.addEventListener("click", () => Game.PageFlow.navigate("game", { mode: "load", slot: info.slot }));
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "删除";
      remove.disabled = info.empty;
      remove.addEventListener("click", () => {
        if (!window.confirm(`确定删除槽位 ${info.slot} 的存档吗？此操作无法撤销。`)) return;
        saves.delete(info.slot);
        render();
      });
      actions.append(load, remove);
      card.append(text, actions);
      list.append(card);
    }
  }

  render();
})(window.TrainGame, window.GAME_DATA);
