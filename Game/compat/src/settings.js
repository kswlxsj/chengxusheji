function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function (Game) {
  "use strict";

  var tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  var panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
  var sliders = Array.from(document.querySelectorAll("[data-audio-setting]"));
  var autoSaveEnabled = document.querySelector("#auto-save-enabled");
  var shortcutSettingList = document.querySelector("#shortcut-setting-list");
  var resetShortcutsButton = document.querySelector("#reset-shortcuts");
  var shortcutSettingMessage = document.querySelector("#shortcut-setting-message");
  var endingList = document.querySelector("#ending-collection");
  var endingProgress = document.querySelector("#ending-progress");
  function selectTab(tab) {
    var _document$querySelect, _document$querySelect2, _document$querySelect3, _document$querySelect4;
    for (var _i = 0, _tabs = tabs; _i < _tabs.length; _i++) {
      var candidate = _tabs[_i];
      var selected = candidate === tab;
      candidate.setAttribute("aria-selected", String(selected));
      candidate.tabIndex = selected ? 0 : -1;
    }
    for (var _i2 = 0, _panels = panels; _i2 < _panels.length; _i2++) {
      var panel = _panels[_i2];
      panel.hidden = panel.id !== tab.getAttribute("aria-controls");
    }
    (_document$querySelect = document.querySelector(".settings-page")) === null || _document$querySelect === void 0 || (_document$querySelect2 = _document$querySelect.scrollTo) === null || _document$querySelect2 === void 0 || _document$querySelect2.call(_document$querySelect, {
      top: 0
    });
    (_document$querySelect3 = document.querySelector(".settings-panel")) === null || _document$querySelect3 === void 0 || (_document$querySelect4 = _document$querySelect3.scrollTo) === null || _document$querySelect4 === void 0 || _document$querySelect4.call(_document$querySelect3, {
      top: 0
    });
  }
  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      return selectTab(tab);
    });
    tab.addEventListener("keydown", function (event) {
      var nextIndex = null;
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
  var audioSettings = Game.PlayerProfile.getAudioSettings();
  var _loop = function _loop() {
    var _audioSettings$key;
    var slider = _sliders[_i3];
    var key = slider.dataset.audioSetting;
    var output = document.querySelector("#".concat(slider.getAttribute("aria-describedby")));
    var updateOutput = function updateOutput(value) {
      if (output) output.textContent = "".concat(Math.round(value * 100), "%");
    };
    slider.value = String(Math.round(((_audioSettings$key = audioSettings[key]) !== null && _audioSettings$key !== void 0 ? _audioSettings$key : 1) * 100));
    updateOutput(Number(slider.value) / 100);
    slider.addEventListener("input", function () {
      var _window$__TRAIN_GAME_, _window$__TRAIN_GAME_2;
      var value = Game.PlayerProfile.setAudioSetting(key, Number(slider.value) / 100);
      updateOutput(value);
      if (key === "pageMusic") (_window$__TRAIN_GAME_ = window.__TRAIN_GAME_BGM__) === null || _window$__TRAIN_GAME_ === void 0 || (_window$__TRAIN_GAME_2 = _window$__TRAIN_GAME_.setVolume) === null || _window$__TRAIN_GAME_2 === void 0 || _window$__TRAIN_GAME_2.call(_window$__TRAIN_GAME_, value);
    });
  };
  for (var _i3 = 0, _sliders = sliders; _i3 < _sliders.length; _i3++) {
    _loop();
  }
  if (autoSaveEnabled) {
    autoSaveEnabled.checked = Game.PlayerProfile.getAutoSaveEnabled();
    autoSaveEnabled.addEventListener("change", function () {
      autoSaveEnabled.checked = Game.PlayerProfile.setAutoSaveEnabled(autoSaveEnabled.checked);
    });
  }
  var shortcutDefinitions = [{
    action: "pause",
    label: "暂停 / 继续",
    description: "打开暂停菜单，或继续已暂停的游戏。"
  }, {
    action: "advance",
    label: "推进 / 跳过本句",
    description: "完成当前逐字文本，或进入下一句对话。"
  }, {
    action: "auto",
    label: "自动",
    description: "切换对话自动推进。"
  }, {
    action: "fast",
    label: "快进",
    description: "切换对话快进。"
  }];
  var shortcutLabels = {
    " ": "Space",
    Escape: "Esc",
    Control: "Ctrl"
  };
  function formatShortcut(key) {
    return shortcutLabels[key] || (key.length === 1 ? key.toUpperCase() : key);
  }
  function showShortcutMessage(message) {
    if (shortcutSettingMessage) shortcutSettingMessage.textContent = message;
  }
  function renderShortcutSettings() {
    if (!shortcutSettingList) return;
    var shortcuts = Game.PlayerProfile.getShortcutSettings();
    shortcutSettingList.replaceChildren();
    var _iterator = _createForOfIteratorHelper(shortcutDefinitions),
      _step;
    try {
      var _loop2 = function _loop2() {
        var definition = _step.value;
        var row = document.createElement("div");
        row.className = "shortcut-setting";
        var copy = document.createElement("span");
        copy.className = "shortcut-setting-copy";
        var heading = document.createElement("strong");
        heading.textContent = definition.label;
        var detail = document.createElement("small");
        detail.textContent = definition.description;
        copy.append(heading, detail);
        var button = document.createElement("button");
        button.type = "button";
        button.className = "shortcut-capture-button";
        button.textContent = formatShortcut(shortcuts[definition.action]);
        button.setAttribute("aria-label", "".concat(definition.label, "\uFF0C\u5F53\u524D\u5FEB\u6377\u952E ").concat(formatShortcut(shortcuts[definition.action])));
        button.addEventListener("click", function () {
          return captureShortcut(definition, button);
        });
        row.append(copy, button);
        shortcutSettingList.append(row);
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop2();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  function captureShortcut(definition, button) {
    if (button.dataset.capturing === "true") return;
    var originalLabel = button.textContent;
    button.dataset.capturing = "true";
    button.textContent = "请按键…";
    showShortcutMessage("请按下要使用的快捷键。");
    var _handleKeydown = function handleKeydown(event) {
      if (event.repeat) return;
      event.preventDefault();
      event.stopPropagation();
      document.removeEventListener("keydown", _handleKeydown, true);
      button.dataset.capturing = "false";
      try {
        var key = Game.PlayerProfile.setShortcutSetting(definition.action, event.key);
        button.textContent = formatShortcut(key);
        button.setAttribute("aria-label", "".concat(definition.label, "\uFF0C\u5F53\u524D\u5FEB\u6377\u952E ").concat(formatShortcut(key)));
        showShortcutMessage("\u5DF2\u5C06\u201C".concat(definition.label, "\u201D\u8BBE\u4E3A ").concat(formatShortcut(key), "\u3002"));
      } catch (error) {
        button.textContent = originalLabel;
        showShortcutMessage(error instanceof Error ? error.message : "无法保存快捷键。");
      }
    };
    document.addEventListener("keydown", _handleKeydown, true);
  }
  if (resetShortcutsButton) {
    resetShortcutsButton.addEventListener("click", function () {
      Game.PlayerProfile.resetShortcutSettings();
      renderShortcutSettings();
      showShortcutMessage("已恢复默认快捷键。");
    });
  }
  renderShortcutSettings();
  function createEndingCard(ending, unlocked) {
    var card = document.createElement("article");
    card.className = "ending-card".concat(unlocked ? " is-unlocked" : " is-locked");
    var preview = document.createElement("div");
    preview.className = "ending-card-preview";
    if (unlocked) {
      var image = document.createElement("img");
      image.src = ending.image;
      image.alt = "".concat(ending.title, "\u7ED3\u5C40\u753B\u9762");
      preview.append(image);
    } else {
      var placeholder = document.createElement("span");
      placeholder.className = "ending-card-lock";
      placeholder.textContent = "？";
      placeholder.setAttribute("aria-hidden", "true");
      preview.append(placeholder);
    }
    var content = document.createElement("div");
    content.className = "ending-card-content";
    var heading = document.createElement("h2");
    heading.textContent = unlocked ? ending.title : "？？？";
    var description = document.createElement("p");
    description.textContent = unlocked ? ending.description : "未解锁";
    content.append(heading, description);
    card.append(preview, content);
    return card;
  }
  var unlockedEndings = new Set(Game.PlayerProfile.getUnlockedEndings());
  var unlockedCount = Game.ENDING_CATALOG.filter(function (ending) {
    return unlockedEndings.has(ending.id);
  }).length;
  endingProgress.textContent = "\u5DF2\u6536\u96C6 ".concat(unlockedCount, " / ").concat(Game.ENDING_CATALOG.length);
  var _iterator2 = _createForOfIteratorHelper(Game.ENDING_CATALOG),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var ending = _step2.value;
      endingList.append(createEndingCard(ending, unlockedEndings.has(ending.id)));
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
})(window.TrainGame);
