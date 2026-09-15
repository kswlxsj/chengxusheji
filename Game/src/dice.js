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

  // 先显示算式，过一会再显示“成功/失败”。
  // 由 DiceRollWindow.roll 在同一窗口内完成，动画只播一遍。
  async function showDiceRollAnimation(context, rollValue, success, detailText) {
    const diceWindow = context.ui?.dice;
    if (diceWindow && typeof diceWindow.roll === "function") {
      const wait = typeof context.wait === "function" ? context.wait : (milliseconds) => Game.delay(milliseconds);
      await diceWindow.roll({
        value: rollValue,
        success,
        text: detailText,
        outcomeText: success ? "成功" : "失败",
        wait
      });
      return;
    }
    await context.ui.inspect.show({
      title: success ? "检定成功" : "检定失败",
      text: detailText
    });
  }


  // 标准 d6 属性检定：掷出 + 属性值 >= 阈值（默认 11）即成功。
  // 展示掷骰算式窗口（沿用旧内置 check 的玩家体验），返回 0=成功 / 1=失败。
  function attrCheck(attribute, threshold = DEFAULT_THRESHOLD) {
    return async (context) => {
      const base = context.state.getAttribute(attribute);
      const roll = rollDie(6);
      const total = roll + base;
      const success = total >= threshold;
      const detail = `${attributeName(context, attribute)}：掷出 ${roll} + 属性 ${base} = ${total}\n需要达到 ${threshold}。`;
      await showDiceRollAnimation(context, roll, success, detail);
      return success ? 0 : 1;
    };
  }

  function sumAttrCheck(attributes, threshold = DEFAULT_THRESHOLD) {
    return async (context) => {
      const values = attributes.map((attribute) => context.state.getAttribute(attribute));
      const roll = rollDie(6);
      const total = roll + values.reduce((sum, value) => sum + value, 0);
      const success = total >= threshold;
      const names = attributes.map((attribute) => attributeName(context, attribute)).join(" + ");
      const detail = names + "：掷出 " + roll + " + 属性 " + values.join(" + ")
        + " = " + total + "\n需要达到 " + threshold + "。";
      await showDiceRollAnimation(context, roll, success, detail);
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
      const detail = `${attributeName(context, attribute)}：掷出 ${roll} + 属性 ${base} = ${total}\n需要达到 ${DEFAULT_THRESHOLD}。`;
      await showDiceRollAnimation(context, roll, success, detail);
      apply(context, success ? passLoss : failLoss);
      return 0;
    };
  }

  function conditionalSanCheck(attribute, passLoss, failLoss, condition) {
    const check = sanCheck(attribute, passLoss, failLoss);
    return async (context) => (condition(context) ? check(context) : 0);
  }

  // 幸运检定：直接掷 1d6，结果大于 3 即成功。
  async function luckCheck(context, label) {
    const roll = rollDie(6);
    const success = roll > 3;
    const detail = `${label}：掷出 ${roll}，需要大于 3。`;
    await showDiceRollAnimation(context, roll, success, detail);
    return success ? 0 : 1;
  }

  // ==== 本批剧本候选检定 ====

  registerDice("ev001_insight_01", attrCheck("insight"));
  registerDice("ev004_insight_01", attrCheck("insight"));
  registerDice("ev007_education_01", attrCheck("education"));
  registerDice("ev011_insight_01", attrCheck("insight"));
  registerDice("ev013_education_01", attrCheck("education"));
  registerDice("ev020_education_01", attrCheck("education"));
  registerDice("ev021_education_insight_01", sumAttrCheck(["education", "insight"]));
  registerDice("ev016_constitution_01", attrCheck("constitution"));
  registerDice("ev504_insight_01", attrCheck("insight"));

  registerDice("ev027_constitution_01", attrCheck("constitution", 7));
  registerDice("ev028_constitution_01", attrCheck("constitution"));
  registerDice("ev028_luck_01", (context) => luckCheck(context, "投掷后的幸运检定"));
  registerDice("ev029_constitution_01", attrCheck("constitution"));

  registerDice("ev008_san_01", sanCheck("san", 1, { count: 1, sides: 6 }));
  registerDice("ev010_san_01", sanCheck("san", 0, 1));
  registerDice("ev011_san_01", sanCheck("san", 0, 1));
  registerDice("ev026_san_01", sanCheck("san", 1, { count: 1, sides: 6 }));
  registerDice(
    "ev026_extra_san_01",
    conditionalSanCheck("san", 1, { count: 1, sides: 4 }, (context) => context.state.flags.visited_carriage_07 === true)
  );

  // ==== 游戏内检定条目（编号必须全局唯一、长期稳定，被 events.json 的 check.dice 引用）====

  // E_005：6 号车厢开门前的灵感检定（成败走不同分支）。
  registerDice("ev005_insight_01", attrCheck("insight"));

  // E_006A：7 号车厢开门后 SAN 检定（SAN 0/1：成功 0 损失、失败扣 1）。
  registerDice("ev006a_san_01", sanCheck("san", 0, 1));

  // E_006B：7 号车厢开门后 SAN 检定（SAN 1/1d4：成功扣 1、失败掷 1d4）。
  registerDice("ev006b_san_01", sanCheck("san", 1, { count: 1, sides: 4 }));

  // E_014：交涉小游戏的最终检定，使用小游戏写入的加成决定剧情分支。
  registerDice("ev014_negotiation_final_01", async (context) => {
    const bonus = Number(context.state.flags.ev014_negotiation_bonus) || 0;
    const rate = Math.min(100, 40 + bonus);
    const roll = Math.floor(Math.random() * 100) + 1;
    const success = roll <= rate;
    const detail = `安抚与交涉：基础成功率 40% + 交涉加成 ${bonus}% = ${rate}%。`
      + `掷出 ${roll}%，${success ? "乘务员终于放下了戒心。" : "乘务员仍有顾虑，没能完全打动她。"}`;
    await showDiceRollAnimation(context, null, success, detail);
    return success ? 0 : 1;
  });

  // E_0008：收音机小游戏只写入成功标记，这里把标记转换成成功/失败剧情分支。
  registerDice("ev0008_radio_tuning", async (context) => (
    context.state.flags.ev0008_radio_tuned ? 0 : 1
  ));
})(window.TrainGame);
