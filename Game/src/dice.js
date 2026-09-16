(function (Game) {
  "use strict";

  // 检定注册表：游戏内所有检定的唯一索引。
  // - 每个检定返回非负整数下标，或 { index, grade }；grade 用于可选大成功/大失败分支。
  // - context 与自定义动作一致（state/ui/items/attributes/skills/wait/throwIfCancelled 等）。
  // - outcomes 为事件里传来的结果事件列表；函数只返回列表下标（0..outcomes.length-1），
  //   由事件引擎校验后跳转；outcomes 为空时函数只做副作用、返回值被忽略。
  // - 依赖 Game.Registry（src/events.js 导出），因此 dice.js 必须在 events.js 之后加载。
  const dice = new Game.Registry("检定");
  function registerDice(id, fn) {
    dice.register(id, fn);
  }
  Game.Dice = dice;

  const DEFAULT_THRESHOLD = 14;

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
  async function showDiceRollAnimation(context, rollValues, success, detailText, grade = null, outcomeText = null) {
    const diceWindow = context.ui?.dice;
    if (diceWindow && typeof diceWindow.roll === "function") {
      const wait = typeof context.wait === "function" ? context.wait : (milliseconds) => Game.delay(milliseconds);
      await diceWindow.roll({
        values: Array.isArray(rollValues) ? rollValues : null,
        value: Number.isInteger(rollValues) ? rollValues : null,
        success,
        grade,
        text: detailText,
        outcomeText: outcomeText || (grade === "criticalSuccess"
          ? "大成功"
          : grade === "criticalFailure" ? "大失败" : success ? "成功" : "失败"),
        wait
      });
      return;
    }
    await context.ui.inspect.show({
      title: grade === "criticalSuccess" ? "检定大成功"
        : grade === "criticalFailure" ? "检定大失败" : success ? "检定成功" : "检定失败",
      text: detailText
    });
  }


  // 标准 2d6 属性检定：骰点和 + 属性值 >= 14。双6必定大成功，双1必定大失败。
  function attrCheck(attribute, threshold = DEFAULT_THRESHOLD) {
    return async (context) => {
      const base = context.state.getAttribute(attribute);
      const { rolls, total: rollTotal } = rollDice(2, 6);
      const criticalSuccess = rolls.every((roll) => roll === 6);
      const criticalFailure = rolls.every((roll) => roll === 1);
      const success = criticalSuccess || (!criticalFailure && rollTotal + base >= threshold);
      const grade = criticalSuccess ? "criticalSuccess" : criticalFailure ? "criticalFailure" : null;
      const detail = `${attributeName(context, attribute)}：掷出 ${rolls.join(" + ")} + 属性 ${base} = ${rollTotal + base}\n需要达到 ${threshold}。`;
      await showDiceRollAnimation(context, rolls, success, detail, grade);
      return grade ? { index: success ? 0 : 1, grade } : success ? 0 : 1;
    };
  }

  function averageAttrCheck(attributes, threshold = 15) {
    return async (context) => {
      const values = attributes.map((attribute) => context.state.getAttribute(attribute));
      const average = Math.floor(values.reduce((sum, value) => sum + value, 0) / values.length);
      const { rolls, total: rollTotal } = rollDice(2, 6);
      const criticalSuccess = rolls.every((roll) => roll === 6);
      const criticalFailure = rolls.every((roll) => roll === 1);
      const success = criticalSuccess || (!criticalFailure && rollTotal + average >= threshold);
      const grade = criticalSuccess ? "criticalSuccess" : criticalFailure ? "criticalFailure" : null;
      const names = attributes.map((attribute) => attributeName(context, attribute)).join(" + ");
      const detail = `${names}：平均值 ${average}（${values.join("、")}），掷出 ${rolls.join(" + ")}，合计 ${rollTotal + average}\n需要达到 ${threshold}。`;
      await showDiceRollAnimation(context, rolls, success, detail, grade);
      return grade ? { index: success ? 0 : 1, grade } : success ? 0 : 1;
    };
  }

  // 投瓶捷径：SAN 只按最多 10 点参与平均，避免无上限 SAN 让检定失去失败可能。
  // 均衡属性 8/8 时，除双1必败外，2d6 仅在合计为3时失败，失败率为 3/36≈8.3%。
  function bottleThrowCheck() {
    return async (context) => {
      const constitution = context.state.getAttribute("constitution");
      const san = context.state.getAttribute("san");
      const cappedSan = Math.min(san, 10);
      const average = Math.floor((constitution + cappedSan) / 2);
      const { rolls, total: rollTotal } = rollDice(2, 6);
      const criticalSuccess = rolls.every((roll) => roll === 6);
      const criticalFailure = rolls.every((roll) => roll === 1);
      const success = criticalSuccess || (!criticalFailure && rollTotal + average >= 12);
      const grade = criticalSuccess ? "criticalSuccess" : criticalFailure ? "criticalFailure" : null;
      const sanDetail = san === cappedSan ? String(san) : `${san}（按 ${cappedSan} 计）`;
      const detail = `投掷：体质 ${constitution} + SAN ${sanDetail}，平均值 ${average}`
        + `\n掷出 ${rolls.join(" + ")}，合计 ${rollTotal + average}；需要达到 12。`;
      await showDiceRollAnimation(context, rolls, success, detail, grade);
      return grade ? { index: success ? 0 : 1, grade } : success ? 0 : 1;
    };
  }

  // SAN 类检定固定按单颗 d6 判定：4~6 成功、1~3 失败，完全不读取当前 SAN。
  // 损失为整数（固定扣）或 { count, sides, bonus }（掷骰扣）；实际变化由统一属性提示显示。
  function sanCheck(attribute, passLoss, failLoss) {
    const apply = (context, loss) => {
      if (!loss) return;
      let amount = 0;
      if (Number.isInteger(loss)) {
        amount = loss;
      } else {
        const result = rollDice(loss.count, loss.sides, loss.bonus);
        amount = result.total;
      }
      if (amount <= 0) return;
      context.modifyAttribute(attribute, -amount);
    };
    return async (context) => {
      const roll = rollDie(6);
      const success = roll >= 4;
      const detail = `${attributeName(context, attribute)}检定：掷出 ${roll}\n需要达到 4。`;
      await showDiceRollAnimation(context, roll, success, detail);
      apply(context, success ? passLoss : failLoss);
      return success ? 0 : 1;
    };
  }

  function sanLossByRoll(attribute) {
    return async (context) => {
      const roll = rollDie(6);
      const loss = roll >= 4 ? 0 : 4 - roll;
      const success = loss === 0;
      const detail = `${attributeName(context, attribute)}检定：掷出 ${roll}\n${loss ? `损失 ${loss} 点` : "没有损失"}。`;
      await showDiceRollAnimation(context, roll, success, detail);
      if (loss) context.modifyAttribute(attribute, -loss);
      return success ? 0 : 1;
    };
  }

  function innerExitSanLoss(attribute) {
    return async (context) => {
      const roll = rollDie(6);
      const loss = roll === 1 ? 2 : roll <= 4 ? 1 : 0;
      const detail = `离开里世界：掷出 ${roll}\n${loss ? `${attributeName(context, attribute)} 损失 ${loss} 点` : `${attributeName(context, attribute)}没有损失`}。`;
      await showDiceRollAnimation(context, roll, loss === 0, detail, null, loss ? `SAN -${loss}` : "SAN 未减少");
      if (loss) context.modifyAttribute(attribute, -loss);
      return loss === 0 ? 0 : 1;
    };
  }

  // ==== 本批剧本候选检定 ====

  registerDice("ev001_insight_01", attrCheck("insight"));
  registerDice("ev004_insight_01", attrCheck("insight"));
  registerDice("ev008_insight_01", attrCheck("insight"));
  registerDice("ev007_education_01", attrCheck("education"));
  registerDice("ev011_insight_01", attrCheck("insight"));
  registerDice("ev013_education_01", attrCheck("education"));
  registerDice("ev020_education_01", attrCheck("education"));
  registerDice("ev021_education_insight_01", averageAttrCheck(["education", "insight"], 15));
  registerDice("ev016_constitution_01", attrCheck("constitution"));
  registerDice("ev504_insight_01", attrCheck("insight"));

  registerDice("ev027_constitution_01", attrCheck("constitution"));
  registerDice("ev027_constitution_02", attrCheck("constitution"));
  registerDice("ev027_constitution_03", attrCheck("constitution"));
  registerDice("ev027_san_01", sanCheck("san", 0, 1));
  registerDice("ev027_san_02", sanCheck("san", 0, 1));
  registerDice("ev027_san_03", sanCheck("san", 0, 1));
  registerDice("ev028_throw_01", bottleThrowCheck());

  registerDice("ev008_san_01", sanCheck("san", 1, { count: 1, sides: 6 }));
  registerDice("ev010_san_01", sanCheck("san", 0, 1));
  registerDice("ev011_san_01", sanCheck("san", 0, 1));

  // ==== 游戏内检定条目（编号必须全局唯一、长期稳定，被 events.json 的 check.dice 引用）====

  // E_005：6 号车厢开门前的灵感检定（成败走不同分支）。
  registerDice("ev005_insight_01", attrCheck("insight"));

  // E_006A/B：只负责 SAN 判定与损失；结果叙事由 events.json 的 outcomes 路由。
  registerDice("ev006a_san_01", sanCheck("san", 0, 1));
  registerDice("ev006b_san_01", sanCheck("san", 1, { count: 1, sides: 4 }));
  registerDice("ev012_san_01", sanLossByRoll("san"));
  registerDice("ev_fake01_exit_san_01", innerExitSanLoss("san"));

  // E_014：交涉小游戏的最终检定，使用小游戏写入的加成决定剧情分支。
  registerDice("ev014_negotiation_final_01", async (context) => {
    const bonus = Number(context.state.flags.ev014_negotiation_bonus) || 0;
    const rate = Math.min(100, 40 + bonus);
    const roll = Math.floor(Math.random() * 100) + 1;
    const success = roll <= rate;
    const detail = `安抚与交涉：基础成功率 40% + 交涉加成 ${bonus}% = ${rate}%。`
      + `掷出 ${roll}%，需要不高于 ${rate}%。`;
    await showDiceRollAnimation(context, null, success, detail);
    return success ? 0 : 1;
  });

  // E_0008：收音机小游戏只写入成功标记，这里把标记转换成成功/失败剧情分支。
  registerDice("ev0008_radio_tuning", async (context) => (
    context.state.flags.ev0008_radio_tuned ? 0 : 1
  ));
})(window.TrainGame);
