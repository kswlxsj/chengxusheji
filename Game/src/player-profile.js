(function (Game) {
  "use strict";

  const PROFILE_VERSION = 6;
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
      id: "cry_end",
      title: "那半梦半醒中入耳穿骨的哭泣",
      description: "你醒了过来，活着回到家中；那场列车上的哭喊却仍在耳边回荡。",
      image: "assets/Image/Scene/Background/chengwuyuan-dead.png"
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

  const ACHIEVEMENT_CATALOG = Object.freeze([
    Object.freeze({
      id: "rummage",
      title: "翻箱倒柜",
      description: "调查 5 号车厢内的全部可交互物。",
      image: "assets/Image/Ui/Achievement/rummage.png"
    }),
    Object.freeze({
      id: "first_aid_first_try",
      title: "妙手回春",
      description: "第一次救治乘务员便成功。",
      image: "assets/Image/Ui/Achievement/first-aid-first-try.png"
    }),
    Object.freeze({
      id: "clever_victory",
      title: "智取",
      description: "不激活斗牌与抢摇杆小游戏，抵达真结局。",
      image: "assets/Image/Ui/Achievement/clever-victory.png"
    }),
    Object.freeze({
      id: "second_chance_aid",
      title: "亡羊补牢",
      description: "第一次救治失败，第二次救治成功。",
      image: "assets/Image/Ui/Achievement/second-chance-aid.png"
    }),
    Object.freeze({
      id: "third_time_aid",
      title: "事不过三",
      description: "前两次救治失败，在员工柜前第三次救治成功。",
      image: "assets/Image/Ui/Achievement/third-time-aid.png"
    }),
    Object.freeze({
      id: "prepared",
      title: "有备无患",
      description: "保留未开启的饮料抵达真结局。",
      image: "assets/Image/Ui/Achievement/prepared.png"
    }),
    Object.freeze({
      id: "unscathed",
      title: "全须全尾",
      description: "全程没有损失 SAN，抵达真结局。",
      image: "assets/Image/Ui/Achievement/unscathed.png"
    }),
    Object.freeze({
      id: "all_cards_out",
      title: "底牌尽出",
      description: "赢下困难模式斗牌。",
      image: "assets/Image/Ui/Achievement/all-cards-out.png"
    }),
    Object.freeze({
      id: "all_endings",
      title: "阅尽终局",
      description: "收集全部六个结局。",
      image: "assets/Image/Ui/Achievement/all-endings.png"
    })
  ]);
  const ACHIEVEMENT_IDS = new Set(ACHIEVEMENT_CATALOG.map((achievement) => achievement.id));

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
      unlockedEndings: [],
      unlockedAchievements: []
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
    if (Array.isArray(value.unlockedAchievements)) {
      profile.unlockedAchievements = [...new Set(
        value.unlockedAchievements.filter((id) => ACHIEVEMENT_IDS.has(id))
      )];
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
    const written = writeProfile(profile);
    if (written && profile.unlockedEndings.length === ENDING_CATALOG.length) unlockAchievement("all_endings");
    return written;
  }

  function getUnlockedAchievements() {
    return [...readProfile().unlockedAchievements];
  }

  function unlockAchievement(id) {
    if (!ACHIEVEMENT_IDS.has(id)) return false;
    const profile = readProfile();
    if (profile.unlockedAchievements.includes(id)) return false;
    profile.unlockedAchievements.push(id);
    return writeProfile(profile);
  }

  function evaluateAchievements(state) {
    if (!state || typeof state !== "object") return [];
    const unlocked = [];
    const award = (id) => {
      if (!unlockAchievement(id)) return;
      const achievement = ACHIEVEMENT_CATALOG.find((candidate) => candidate.id === id);
      if (achievement) unlocked.push(achievement);
    };
    const medical = state.checkAttempts?.["id:crew_04_medical"];
    const thirdMedical = state.checkAttempts?.["event:E_020_SECOND_MEDICAL:ev020_education_01"];
    const started = state.runStats?.minigamesStarted || {};
    const isTrueEnding = state.flags?.ending_reason === "true_end";

    if (state.flags?.carriage_05_all_inspected_rewarded === true) award("rummage");
    if (medical?.success === true && medical.attempts === 1) award("first_aid_first_try");
    if (medical?.success === true && medical.attempts === 2) award("second_chance_aid");
    if (medical?.success === false && medical.attempts === 2 && thirdMedical?.success === true) {
      award("third_time_aid");
    }
    if ((started.card_battle_hard || 0) > 0 && state.flags?.card_battle_won === true) {
      award("all_cards_out");
    }
    if (isTrueEnding) {
      if (
        (started.card_battle || 0) === 0
        && (started.card_battle_hard || 0) === 0
        && (started.conductor_tug || 0) === 0
      ) award("clever_victory");
      if (Array.isArray(state.inventory) && state.inventory.includes("drink")) award("prepared");
      if ((state.runStats?.sanLost || 0) === 0) award("unscathed");
    }
    if (getUnlockedEndings().length === ENDING_CATALOG.length) award("all_endings");
    return unlocked;
  }

  Game.ENDING_CATALOG = ENDING_CATALOG;
  Game.ACHIEVEMENT_CATALOG = ACHIEVEMENT_CATALOG;
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
    unlockEnding,
    getUnlockedAchievements,
    unlockAchievement,
    evaluateAchievements
  });
})(window.TrainGame);
