(function (Game) {
  "use strict";

  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
  const sliders = Array.from(document.querySelectorAll("[data-audio-setting]"));
  const autoSaveEnabled = document.querySelector("#auto-save-enabled");
  const shortcutSettingList = document.querySelector("#shortcut-setting-list");
  const resetShortcutsButton = document.querySelector("#reset-shortcuts");
  const shortcutSettingMessage = document.querySelector("#shortcut-setting-message");
  const endingList = document.querySelector("#ending-collection");
  const endingProgress = document.querySelector("#ending-progress");
  const achievementList = document.querySelector("#achievement-collection");
  const achievementProgress = document.querySelector("#achievement-progress");

  function selectTab(tab) {
    for (const candidate of tabs) {
      const selected = candidate === tab;
      candidate.setAttribute("aria-selected", String(selected));
      candidate.tabIndex = selected ? 0 : -1;
    }
    for (const panel of panels) panel.hidden = panel.id !== tab.getAttribute("aria-controls");
    document.querySelector(".settings-page")?.scrollTo?.({ top: 0 });
    document.querySelector(".settings-panel")?.scrollTo?.({ top: 0 });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex = null;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      selectTab(tabs[nextIndex]);
      tabs[nextIndex].focus();
    });
  });

  const audioSettings = Game.PlayerProfile.getAudioSettings();
  for (const slider of sliders) {
    const key = slider.dataset.audioSetting;
    const output = document.querySelector(`#${slider.getAttribute("aria-describedby")}`);
    const updateOutput = (value) => {
      if (output) output.textContent = `${Math.round(value * 100)}%`;
    };
    slider.value = String(Math.round((audioSettings[key] ?? 1) * 100));
    updateOutput(Number(slider.value) / 100);
    slider.addEventListener("input", () => {
      const value = Game.PlayerProfile.setAudioSetting(key, Number(slider.value) / 100);
      updateOutput(value);
      if (key === "pageMusic") window.__TRAIN_GAME_BGM__?.setVolume?.(value);
    });
  }

  if (autoSaveEnabled) {
    autoSaveEnabled.checked = Game.PlayerProfile.getAutoSaveEnabled();
    autoSaveEnabled.addEventListener("change", () => {
      autoSaveEnabled.checked = Game.PlayerProfile.setAutoSaveEnabled(autoSaveEnabled.checked);
    });
  }

  const shortcutDefinitions = [
    { action: "pause", label: "暂停 / 继续", description: "打开暂停菜单，或继续已暂停的游戏。" },
    { action: "advance", label: "推进 / 跳过本句", description: "完成当前逐字文本，或进入下一句对话。" },
    { action: "auto", label: "自动", description: "切换对话自动推进。" },
    { action: "fast", label: "快进", description: "切换对话快进。" }
  ];
  const shortcutLabels = { " ": "Space", Escape: "Esc", Control: "Ctrl" };

  function formatShortcut(key) {
    return shortcutLabels[key] || (key.length === 1 ? key.toUpperCase() : key);
  }

  function showShortcutMessage(message) {
    if (shortcutSettingMessage) shortcutSettingMessage.textContent = message;
  }

  function renderShortcutSettings() {
    if (!shortcutSettingList) return;
    const shortcuts = Game.PlayerProfile.getShortcutSettings();
    shortcutSettingList.replaceChildren();
    for (const definition of shortcutDefinitions) {
      const row = document.createElement("div");
      row.className = "shortcut-setting";
      const copy = document.createElement("span");
      copy.className = "shortcut-setting-copy";
      const heading = document.createElement("strong");
      heading.textContent = definition.label;
      const detail = document.createElement("small");
      detail.textContent = definition.description;
      copy.append(heading, detail);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "shortcut-capture-button";
      button.textContent = formatShortcut(shortcuts[definition.action]);
      button.setAttribute("aria-label", `${definition.label}，当前快捷键 ${formatShortcut(shortcuts[definition.action])}`);
      button.addEventListener("click", () => captureShortcut(definition, button));
      row.append(copy, button);
      shortcutSettingList.append(row);
    }
  }

  function captureShortcut(definition, button) {
    if (button.dataset.capturing === "true") return;
    const originalLabel = button.textContent;
    button.dataset.capturing = "true";
    button.textContent = "请按键…";
    showShortcutMessage("请按下要使用的快捷键。");
    const handleKeydown = (event) => {
      if (event.repeat) return;
      event.preventDefault();
      event.stopPropagation();
      document.removeEventListener("keydown", handleKeydown, true);
      button.dataset.capturing = "false";
      try {
        const key = Game.PlayerProfile.setShortcutSetting(definition.action, event.key);
        button.textContent = formatShortcut(key);
        button.setAttribute("aria-label", `${definition.label}，当前快捷键 ${formatShortcut(key)}`);
        showShortcutMessage(`已将“${definition.label}”设为 ${formatShortcut(key)}。`);
      } catch (error) {
        button.textContent = originalLabel;
        showShortcutMessage(error instanceof Error ? error.message : "无法保存快捷键。");
      }
    };
    document.addEventListener("keydown", handleKeydown, true);
  }

  if (resetShortcutsButton) {
    resetShortcutsButton.addEventListener("click", () => {
      Game.PlayerProfile.resetShortcutSettings();
      renderShortcutSettings();
      showShortcutMessage("已恢复默认快捷键。");
    });
  }
  renderShortcutSettings();

  function createEndingCard(ending, unlocked) {
    const card = document.createElement("article");
    card.className = `ending-card${unlocked ? " is-unlocked" : " is-locked"}`;

    const preview = document.createElement("div");
    preview.className = "ending-card-preview";
    if (unlocked) {
      const image = document.createElement("img");
      image.src = ending.image;
      image.alt = `${ending.title}结局画面`;
      preview.append(image);
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "ending-card-lock";
      placeholder.textContent = "？";
      placeholder.setAttribute("aria-hidden", "true");
      preview.append(placeholder);
    }

    const content = document.createElement("div");
    content.className = "ending-card-content";
    const heading = document.createElement("h2");
    heading.textContent = unlocked ? ending.title : "？？？";
    const description = document.createElement("p");
    description.textContent = unlocked ? ending.description : "未解锁";
    content.append(heading, description);
    card.append(preview, content);
    return card;
  }

  const unlockedEndings = new Set(Game.PlayerProfile.getUnlockedEndings());
  const unlockedCount = Game.ENDING_CATALOG.filter((ending) => unlockedEndings.has(ending.id)).length;
  if (unlockedCount === Game.ENDING_CATALOG.length) Game.PlayerProfile.unlockAchievement("all_endings");
  endingProgress.textContent = `已收集 ${unlockedCount} / ${Game.ENDING_CATALOG.length}`;
  endingList.replaceChildren();
  for (const ending of Game.ENDING_CATALOG) {
    endingList.append(createEndingCard(ending, unlockedEndings.has(ending.id)));
  }

  function createAchievementCard(achievement, unlocked) {
    const card = document.createElement("article");
    card.className = `achievement-card${unlocked ? " is-unlocked" : " is-locked"}`;

    const preview = document.createElement("div");
    preview.className = "achievement-card-preview";
    if (unlocked) {
      const image = document.createElement("img");
      image.src = achievement.image;
      image.alt = `${achievement.title}成就图标`;
      preview.append(image);
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "achievement-card-lock";
      placeholder.textContent = "？";
      placeholder.setAttribute("aria-hidden", "true");
      preview.append(placeholder);
    }

    const content = document.createElement("div");
    content.className = "achievement-card-content";
    const heading = document.createElement("h3");
    heading.textContent = unlocked ? achievement.title : "？？？";
    const description = document.createElement("p");
    description.textContent = unlocked ? achievement.description : "未解锁";
    content.append(heading, description);
    card.append(preview, content);
    return card;
  }

  const unlockedAchievements = new Set(Game.PlayerProfile.getUnlockedAchievements());
  const unlockedAchievementCount = Game.ACHIEVEMENT_CATALOG
    .filter((achievement) => unlockedAchievements.has(achievement.id)).length;
  achievementProgress.textContent = `已解锁 ${unlockedAchievementCount} / ${Game.ACHIEVEMENT_CATALOG.length}`;
  achievementList.replaceChildren();
  for (const achievement of Game.ACHIEVEMENT_CATALOG) {
    achievementList.append(createAchievementCard(achievement, unlockedAchievements.has(achievement.id)));
  }
})(window.TrainGame);
