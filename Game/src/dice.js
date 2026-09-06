(function (Game) {
  "use strict";

  // 检定注册表：游戏内所有检定的唯一索引。
  // - 每个检定是一个独立的可编程函数，签名：async (context, outcomes) => 非负整数下标。
  // - context 与自定义动作一致（state/ui/items/attributes/skills/wait/throwIfCancelled 等）。
  // - outcomes 为事件里传来的结果事件列表；函数只返回列表下标（0..outcomes.length-1），
  //   由事件引擎校验后跳转；outcomes 为空时函数只做副作用、返回值被忽略。
  // - 依赖 Game.Registry（src/events.js 导出），因此 dice.js 必须在 events.js 之后加载。
  const dice = new Game.Registry("检定");
  function registerDice(id, fn) {
    dice.register(id, fn);
  }
  Game.Dice = dice;

  const DEFAULT_THRESHOLD = 11;

  function rollDie(sides) {
    return Math.floor(Math.random() * Math.max(1, sides)) + 1;
  }

  function rollDice(count, sides, bonus = 0) {
    const rolls = [];
    let total = Number(bonus) || 0;
    for (let index = 0; index < Math.max(0, count); index += 1) {
      const roll = rollDie(sides);
      rolls.push(roll);
      total += roll;
    }
    return { rolls, total };
  }

  function attributeName(context, attribute) {
    return context.attributes.get(attribute)?.name || attribute;
  }

  function skillName(context, skill) {
    return context.skills.get(skill)?.name || skill;
  }

  async function showSkillResult(context, skill, success, detail) {
    await context.ui.inspect.show({
      title: success ? "技能检定成功" : "技能检定失败",
      text: `${skillName(context, skill)}：${detail || (success ? "已掌握" : "尚未掌握")}。`
    });
  }

  async function confirmSkillUse(context, skillId) {
    const name = skillName(context, skillId);
    const selected = await context.ui.choice.choose(`是否要使用【${name}】？`, [
      { label: "使用", value: true },
      { label: "不使用", value: false }
    ]);
    return Boolean(selected && selected.value === true);
  }

  // 标准 d6 属性检定：1d6 + 属性值 >= 阈值（默认 11）即成功。
  // 展示掷骰算式窗口（沿用旧内置 check 的玩家体验），返回 0=成功 / 1=失败。
  function attrCheck(attribute, threshold = DEFAULT_THRESHOLD) {
    return async (context) => {
      const base = context.state.getAttribute(attribute);
      const roll = rollDie(6);
      const total = roll + base;
      const success = total >= threshold;
      await context.ui.inspect.show({
        title: success ? "检定成功" : "检定失败",
        text: `${attributeName(context, attribute)}：1d6 掷出 ${roll} + 属性 ${base} = ${total}，需要达到 ${threshold}。`
      });
      return success ? 0 : 1;
    };
  }

  // SAN 类检定：先按 d6 属性检定判成败，再按“成功扣 passLoss / 失败扣 failLoss”扣减。
  // 损失为整数（固定扣）或 { count, sides, bonus }（掷骰扣，弹提示）。返回 0。
  function sanCheck(attribute, passLoss, failLoss) {
    const apply = (context, loss) => {
      if (!loss) return;
      let amount = 0;
      let rolls = [];
      let expression = "";
      if (Number.isInteger(loss)) {
        amount = loss;
      } else {
        const result = rollDice(loss.count, loss.sides, loss.bonus);
        amount = result.total;
        rolls = result.rolls;
        expression = `${loss.count}d${loss.sides}${loss.bonus ? `+${loss.bonus}` : ""}`;
      }
      if (amount <= 0) return;
      const before = context.state.getAttribute(attribute);
      const after = context.state.modifyAttribute(attribute, -amount);
      if (before === after) return;
      if (Number.isInteger(loss)) return;
      context.ui.toast(`${attributeName(context, attribute)} -${Math.abs(after - before)}（${expression}：${rolls.join("+")}）`);
    };
    return async (context) => {
      const base = context.state.getAttribute(attribute);
      const roll = rollDie(6);
      const total = roll + base;
      const success = total >= DEFAULT_THRESHOLD;
      await context.ui.inspect.show({
        title: success ? "检定成功" : "检定失败",
        text: `${attributeName(context, attribute)}：1d6 掷出 ${roll} + 属性 ${base} = ${total}，需要达到 ${DEFAULT_THRESHOLD}。`
      });
      apply(context, success ? passLoss : failLoss);
      return 0;
    };
  }

  // 技能检定：先询问是否使用；技能未学会或玩家放弃时直接视为失败。
  function learnedSkillCheck(skillId) {
    return async (context) => {
      const learned = context.state.getSkill(skillId);
      if (!learned) {
        await showSkillResult(context, skillId, false, "尚未掌握");
        return 1;
      }
      if (!(await confirmSkillUse(context, skillId))) {
        await showSkillResult(context, skillId, false, "已放弃使用");
        return 1;
      }
      await showSkillResult(context, skillId, true, "已掌握");
      return learned ? 0 : 1;
    };
  }

  // 侦察成功 = 已掌握侦察 + 灵感检定成功；使用前同样先确认。
  async function scoutingSkillCheck(context) {
    if (!context.state.getSkill("scouting")) {
      await showSkillResult(context, "scouting", false, "尚未掌握");
      return 1;
    }
    if (!(await confirmSkillUse(context, "scouting"))) {
      await showSkillResult(context, "scouting", false, "已放弃使用");
      return 1;
    }
    await showSkillResult(context, "scouting", true, "已掌握，开始观察");
    return attrCheck("insight")(context);
  }

  // 当前项目约定：教育 > 5 解锁医学，并同步视为掌握急救。
  function medicineCandidateUnlocked(context) {
    const state = context.state;
    const candidateThreshold = state.getAttribute("education") > 5;
    return candidateThreshold || (state.getSkill("medicine") && state.skillOverrides.medicine === true);
  }

  function conditionalSanCheck(attribute, passLoss, failLoss, condition) {
    const check = sanCheck(attribute, passLoss, failLoss);
    return async (context) => (condition(context) ? check(context) : 0);
  }

  // 已经进入剧本结局的 SAN 扣损：先记录结局原因，再执行剧本规定的 SAN 检定。
  // 这样即使扣损把 SAN 降到 0，结束页仍显示对应的剧情结局，而不是误跳 SAN 归零页。
  function endingSanCheck(reason, passLoss, failLoss) {
    const check = sanCheck("san", passLoss, failLoss);
    return async (context) => {
      context.state.flags.ending_reason = reason;
      return check(context);
    };
  }

  // 幸运半值路线：奇数向下取整，再加 1d6 与阈值比较。
  async function luckHalfCheck(context, threshold, label) {
    const luck = context.state.getAttribute("luck");
    const halfLuck = Math.floor(luck / 2);
    const roll = rollDie(6);
    const total = halfLuck + roll;
    const success = total >= threshold;
    await context.ui.inspect.show({
      title: success ? "检定成功" : "检定失败",
      text: `${label}：幸运 ${luck}/2 向下取整为 ${halfLuck}，1d6 掷出 ${roll}，合计 ${total}，需要达到 ${threshold}。`
    });
    return success ? 0 : 1;
  }

  // ==== 本批剧本候选检定 ====

  registerDice("ev001_insight_01", attrCheck("insight"));
  registerDice("ev004_insight_01", attrCheck("insight"));
  registerDice("skill_scouting", scoutingSkillCheck);
  registerDice("ev011_insight_01", attrCheck("insight"));
  registerDice("skill_first_aid", async (context) => {
    const usable = context.state.getSkill("firstAid") || medicineCandidateUnlocked(context);
    if (!usable) {
      await showSkillResult(context, "firstAid", false, "尚未掌握");
      return 1;
    }
    if (!(await confirmSkillUse(context, "firstAid"))) {
      await showSkillResult(context, "firstAid", false, "已放弃使用");
      return 1;
    }
    await showSkillResult(context, "firstAid", true, "已掌握（医学解锁后同步获得）");
    return 0;
  });
  registerDice("skill_medicine", learnedSkillCheck("medicine"));
  registerDice("skill_talk", learnedSkillCheck("talk"));
  registerDice("ev016_strength_01", attrCheck("strength"));

  // E-018：背起乘务员走话术路线，否则走侦察路线。
  registerDice("ev018_route_01", async (context) => {
    if (context.state.flags.carried_crew) {
      return learnedSkillCheck("talk")(context);
    }
    const result = await scoutingSkillCheck(context);
    return result === 0 ? 2 : 3;
  });

  // E-022：拥有潜行直接成功；否则使用幸运半值检定。
  registerDice("ev022_stealth_or_luck_01", async (context) => {
    if (!context.state.getSkill("stealth")) return luckHalfCheck(context, 9, "潜行失败后的幸运检定");
    if (await confirmSkillUse(context, "stealth")) {
      await showSkillResult(context, "stealth", true, "已掌握，直接通过");
      return 0;
    }
    return luckHalfCheck(context, 9, "放弃潜行后的幸运检定");
  });

  registerDice("ev023_agility_01", attrCheck("agility"));
  registerDice("ev023_throw_after_agility_fail_01", (context) => luckHalfCheck(context, 9, "敏捷失败后的投掷检定"));
  registerDice("ev024_agility_01", attrCheck("agility"));

  // E-025：返回 0=单只、1=两只，对应事件的两个结果分支。
  registerDice("ev025_clicker_count_01", async (context) => {
    const luck = context.state.getAttribute("luck");
    if (luck < 7) {
      await context.ui.inspect.show({
        title: "数量判定",
        text: `幸运 ${luck} < 7，固定遭遇两只 Clicker。`
      });
      return 1;
    }
    const roll = rollDie(6);
    const one = roll >= 3;
    await context.ui.inspect.show({
      title: "数量判定",
      text: `幸运 ${luck}，1d6 掷出 ${roll}，${one ? "遭遇一只" : "遭遇两只"} Clicker。`
    });
    return one ? 0 : 1;
  });
  registerDice("ev025_strength_01", attrCheck("strength"));

  registerDice("ev008_san_01", sanCheck("san", 1, { count: 1, sides: 6 }));
  registerDice("ev010_san_01", sanCheck("san", 0, 1));
  registerDice("ev010_join_route_01", async (context) => (
    context.state.flags.ev008_scouting_ok ? 0 : 1
  ));
  registerDice("ev011_san_01", sanCheck("san", 0, 1));
  registerDice("ev014_san_01", sanCheck("san", 0, { count: 1, sides: 2 }));
  registerDice("ev021_san_01", sanCheck("san", 1, { count: 1, sides: 6 }));
  registerDice(
    "ev021_extra_san_01",
    conditionalSanCheck("san", 1, { count: 1, sides: 4 }, (context) => !context.state.flags.visited_carriage_07)
  );
  registerDice("ev028_talk_or_strength_01", async (context) => {
    const canTalk = context.state.getSkill("talk");
    const talkUsed = canTalk && (await confirmSkillUse(context, "talk"));
    const strength = context.state.getAttribute("strength");
    const success = talkUsed || strength >= 8;
    await context.ui.inspect.show({
      title: success ? "结局判定成功" : "结局判定失败",
      text: `话术：${talkUsed ? "已使用" : "未使用"}；力量：${strength}，需要话术成功或力量达到 8。`
    });
    return success ? 0 : 1;
  });
  registerDice("ev030_san_01", endingSanCheck("bad_end", { count: 1, sides: 4 }, { count: 1, sides: 10 }));

  // ==== 游戏内检定条目（编号必须全局唯一、长期稳定，被 events.json 的 check.dice 引用）====

  // E_005：6 号车厢开门前的灵感检定（成败走不同分支）。
  registerDice("ev005_insight_01", attrCheck("insight"));

  // E_006A：7 号车厢开门后 SAN 检定（SAN 0/1：成功 0 损失、失败扣 1）。
  registerDice("ev006a_san_01", sanCheck("san", 0, 1));

  // E_006B：7 号车厢开门后 SAN 检定（SAN 1/1d4：成功扣 1、失败掷 1d4）。
  registerDice("ev006b_san_01", sanCheck("san", 1, { count: 1, sides: 4 }));
})(window.TrainGame);
