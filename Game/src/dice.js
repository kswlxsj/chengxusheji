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

  // ==== 游戏内检定条目（编号必须全局唯一、长期稳定，被 events.json 的 check.dice 引用）====

  // E_005：6 号车厢开门前的灵感检定（成败走不同分支）。
  registerDice("ev005_insight_01", attrCheck("insight"));

  // E_006A：7 号车厢开门后 SAN 检定（SAN 0/1：成功 0 损失、失败扣 1）。
  registerDice("ev006a_san_01", sanCheck("san", 0, 1));

  // E_006B：7 号车厢开门后 SAN 检定（SAN 1/1d4：成功扣 1、失败掷 1d4）。
  registerDice("ev006b_san_01", sanCheck("san", 1, { count: 1, sides: 4 }));
})(window.TrainGame);
