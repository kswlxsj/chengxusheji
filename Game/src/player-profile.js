(function (Game) {
  "use strict";

  const PROFILE_VERSION = 1;
  const STORAGE_KEY_PREFIX = "train-game-profile-user-v1:";
  const AUDIO_KEYS = Object.freeze(["pageMusic", "gameAmbience", "gameSfx"]);
  const AUDIO_KEY_SET = new Set(AUDIO_KEYS);

  const ENDING_CATALOG = Object.freeze([
    Object.freeze({
      id: "true_end",
      title: "崭新的一天",
      description: "你在终点站醒来，走出车厢，重新呼吸到了新鲜空气。",
      image: "assets/Image/Scene/Background/true-end-platform.png"
    }),
    Object.freeze({
      id: "fake_end",
      title: "伪结局",
      description: "你以为自己已经逃离列车，熟悉的字迹却再次出现在眼前。",
      image: "assets/Image/Scene/Background/move.png"
    }),
    Object.freeze({
      id: "bad_end",
      title: "意识与身体一同消失",
      description: "列车驶入黑暗，恐怖的记忆挥之不去。",
      image: "assets/Image/Scene/Background/carriage-03.png"
    }),
    Object.freeze({
      id: "lost",
      title: "迷失",
      description: "花海在你体内生长。你终于属于这里了。",
      image: "assets/Image/Scene/Background/flower-sea.png"
    }),
    Object.freeze({
      id: "san",
      title: "游戏结束",
      description: "SAN 已降至 0。",
      image: "assets/Image/Scene/Background/san-zero-hospital.png"
    })
  ]);
  const ENDING_IDS = new Set(ENDING_CATALOG.map((ending) => ending.id));

  function defaultProfile() {
    return {
      version: PROFILE_VERSION,
      audio: { pageMusic: 1, gameAmbience: 1, gameSfx: 1 },
      unlockedEndings: []
    };
  }

  function clampVolume(value, fallback = 1) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.min(1, Math.max(0, number));
  }

  function normalizeProfile(value) {
    const profile = defaultProfile();
    if (!value || typeof value !== "object" || Array.isArray(value)) return profile;
    const audio = value.audio;
    if (audio && typeof audio === "object" && !Array.isArray(audio)) {
      for (const key of AUDIO_KEYS) profile.audio[key] = clampVolume(audio[key]);
    }
    if (Array.isArray(value.unlockedEndings)) {
      profile.unlockedEndings = [...new Set(value.unlockedEndings.filter((id) => ENDING_IDS.has(id)))];
    }
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
  Game.PlayerProfile = Object.freeze({
    getAudioSettings,
    setAudioSetting,
    getUnlockedEndings,
    unlockEnding
  });
})(window.TrainGame);
