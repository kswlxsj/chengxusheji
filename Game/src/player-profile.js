(function (Game) {
  "use strict";

  const PROFILE_VERSION = 5;
  const STORAGE_KEY_PREFIX = "train-game-profile-user-v1:";
  const AUDIO_REFERENCE_LEVEL = 0.6;
  const AUDIO_KEYS = Object.freeze(["pageMusic", "gameAmbience", "gameSfx", "buttonSfx"]);
  const AUDIO_KEY_SET = new Set(AUDIO_KEYS);
  const SHORTCUT_KEYS = Object.freeze(["pause", "advance", "auto", "fast"]);
  const SHORTCUT_KEY_SET = new Set(SHORTCUT_KEYS);
  const DEFAULT_SHORTCUTS = Object.freeze({
    pause: "Escape",
    advance: " ",
    auto: "a",
    fast: "Control"
  });
  const UNSUPPORTED_SHORTCUT_KEYS = new Set(["", "Unidentified", "Dead", "Process", "Alt", "Shift", "Meta"]);

  const ENDING_CATALOG = Object.freeze([
    Object.freeze({
      id: "true_end",
      title: "不要温和地走进那个良夜",
      description: "加速的列车驶入光明，迎接属于你的新的开始。",
      image: "assets/Image/Scene/Background/true-end-platform.webp"
    }),
    Object.freeze({
      id: "fake_end",
      title: "你所说的曙光究竟是什么意思",
      description: "目睹那些东西之后，回归现实生活……大概吧。",
      image: "assets/Image/Scene/Background/move.webp"
    }),
    Object.freeze({
      id: "lost",
      title: "于他者所思的自我与自我所想的他者之间",
      description: "层层嵌套，自我指涉，盘曲虬结，错综复杂。",
      image: "assets/Image/Scene/Background/flower-sea.webp"
    }),
    Object.freeze({
      id: "bad_end",
      title: "恐怖",
      description: "列车陷入黑暗，意识与身体一同消失。",
      image: "assets/Image/Scene/Background/carriage-03.webp"
    }),
    Object.freeze({
      id: "san",
      title: "患者",
      description: "SAN 已降至 0。",
      image: "assets/Image/Scene/Background/san-zero-hospital.webp"
    })
  ]);
  const ENDING_IDS = new Set(ENDING_CATALOG.map((ending) => ending.id));

  function defaultProfile() {
    return {
      version: PROFILE_VERSION,
      audio: {
        pageMusic: AUDIO_REFERENCE_LEVEL,
        gameAmbience: AUDIO_REFERENCE_LEVEL,
        gameSfx: AUDIO_REFERENCE_LEVEL,
        buttonSfx: AUDIO_REFERENCE_LEVEL
      },
      autoSaveEnabled: true,
      shortcuts: { ...DEFAULT_SHORTCUTS },
      unlockedEndings: []
    };
  }

  function clampVolume(value, fallback = AUDIO_REFERENCE_LEVEL) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.min(1, Math.max(0, number));
  }

  function normalizeShortcutKey(value) {
    if (typeof value !== "string") return null;
    const key = value === " " ? value : value.trim();
    if (UNSUPPORTED_SHORTCUT_KEYS.has(key)) return null;
    return key.length === 1 ? key.toLowerCase() : key;
  }

  function normalizeShortcuts(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return { ...DEFAULT_SHORTCUTS };
    const shortcuts = {};
    const assigned = new Set();
    for (const action of SHORTCUT_KEYS) {
      const key = normalizeShortcutKey(value[action]);
      if (!key || assigned.has(key)) return { ...DEFAULT_SHORTCUTS };
      shortcuts[action] = key;
      assigned.add(key);
    }
    return shortcuts;
  }

  function normalizeProfile(value) {
    const profile = defaultProfile();
    if (!value || typeof value !== "object" || Array.isArray(value)) return profile;
    const audio = value.audio;
    if (audio && typeof audio === "object" && !Array.isArray(audio)) {
      // v1 直接把保存值当作实际倍率；换算成新滑杆位置后保持听感不变。
      const legacyScale = value.version === 1 ? AUDIO_REFERENCE_LEVEL : 1;
      for (const key of AUDIO_KEYS) {
        const number = Number(audio[key]);
        profile.audio[key] = Number.isFinite(number)
          ? clampVolume(number * legacyScale)
          : AUDIO_REFERENCE_LEVEL;
      }
    }
    if (Array.isArray(value.unlockedEndings)) {
      profile.unlockedEndings = [...new Set(value.unlockedEndings.filter((id) => ENDING_IDS.has(id)))];
    }
    if (typeof value.autoSaveEnabled === "boolean") profile.autoSaveEnabled = value.autoSaveEnabled;
    profile.shortcuts = normalizeShortcuts(value.shortcuts);
    return profile;
  }

  function currentStorageKey() {
    const username = Game.Auth?.currentUser?.();
    if (!username) throw new Error("必须登录后才能访问玩家配置");
    return `${STORAGE_KEY_PREFIX}${encodeURIComponent(username)}`;
  }

  function readProfile() {
    try {
      const raw = localStorage.getItem(currentStorageKey());
      return raw === null ? defaultProfile() : normalizeProfile(JSON.parse(raw));
    } catch (_error) {
      return defaultProfile();
    }
  }

  function writeProfile(profile) {
    try {
      localStorage.setItem(currentStorageKey(), JSON.stringify(normalizeProfile(profile)));
      return true;
    } catch (_error) {
      return false;
    }
  }

  function getAudioSettings() {
    return { ...readProfile().audio };
  }

  function setAudioSetting(key, value) {
    if (!AUDIO_KEY_SET.has(key)) throw new RangeError(`未知音量设置：${key || "空"}`);
    const profile = readProfile();
    profile.audio[key] = clampVolume(value);
    writeProfile(profile);
    return profile.audio[key];
  }

  function toAudioGain(value) {
    return clampVolume(value) / AUDIO_REFERENCE_LEVEL;
  }

  function getAudioGain(key) {
    if (!AUDIO_KEY_SET.has(key)) throw new RangeError(`未知音量设置：${key || "空"}`);
    return toAudioGain(readProfile().audio[key]);
  }

  function getAutoSaveEnabled() {
    return readProfile().autoSaveEnabled;
  }

  function setAutoSaveEnabled(value) {
    const profile = readProfile();
    profile.autoSaveEnabled = Boolean(value);
    writeProfile(profile);
    return profile.autoSaveEnabled;
  }

  function getShortcutSettings() {
    return { ...readProfile().shortcuts };
  }

  function setShortcutSetting(action, value) {
    if (!SHORTCUT_KEY_SET.has(action)) throw new RangeError(`未知快捷键操作：${action || "空"}`);
    const key = normalizeShortcutKey(value);
    if (!key) throw new RangeError("该按键不能用作快捷键");
    const profile = readProfile();
    const duplicateAction = SHORTCUT_KEYS.find((candidate) => candidate !== action && profile.shortcuts[candidate] === key);
    if (duplicateAction) throw new RangeError("该按键已被其他操作使用");
    profile.shortcuts[action] = key;
    writeProfile(profile);
    return profile.shortcuts[action];
  }

  function resetShortcutSettings() {
    const profile = readProfile();
    profile.shortcuts = { ...DEFAULT_SHORTCUTS };
    writeProfile(profile);
    return { ...profile.shortcuts };
  }

  function getUnlockedEndings() {
    return [...readProfile().unlockedEndings];
  }

  function unlockEnding(id) {
    if (!ENDING_IDS.has(id)) return false;
    const profile = readProfile();
    if (profile.unlockedEndings.includes(id)) return false;
    profile.unlockedEndings.push(id);
    return writeProfile(profile);
  }

  Game.ENDING_CATALOG = ENDING_CATALOG;
  Game.AUDIO_REFERENCE_LEVEL = AUDIO_REFERENCE_LEVEL;
  Game.PlayerProfile = Object.freeze({
    getAudioSettings,
    setAudioSetting,
    getAudioGain,
    toAudioGain,
    getAutoSaveEnabled,
    setAutoSaveEnabled,
    getShortcutSettings,
    setShortcutSetting,
    resetShortcutSettings,
    getUnlockedEndings,
    unlockEnding
  });
})(window.TrainGame);
