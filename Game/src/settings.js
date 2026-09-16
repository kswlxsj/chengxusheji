(function (Game) {
  "use strict";

  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
  const sliders = Array.from(document.querySelectorAll("[data-audio-setting]"));
  const autoSaveEnabled = document.querySelector("#auto-save-enabled");
  const endingList = document.querySelector("#ending-collection");
  const endingProgress = document.querySelector("#ending-progress");

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
  endingProgress.textContent = `已收集 ${unlockedCount} / ${Game.ENDING_CATALOG.length}`;
  for (const ending of Game.ENDING_CATALOG) {
    endingList.append(createEndingCard(ending, unlockedEndings.has(ending.id)));
  }
})(window.TrainGame);
