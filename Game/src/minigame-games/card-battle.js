(function (Game) {
  "use strict";

  // 战斗轮卡牌小游戏：四张牌中可出一张或同时出两张。
  // 顶层只注册编号；DOM、事件监听和计时器全部延迟到 run()，以便编译器在 node:vm 中收集注册表。

  const MAX_PLAYER_HP = 10;
  const MAX_ENEMY_HP = 10;
  const MAX_ENERGY = 3;
  const ULTIMATE_COOLDOWN = 4;
  const DEFENSE_BLOCK = 2;
  const COUNTER_CHANCE = 0.25;
  const COUNTER_DAMAGE = 1;
  const ENEMY_PLAY_DISPLAY_MS = 1500;
  const cardNames = { attack: "攻击", heal: "回血", defend: "防御", ultimate: "必杀" };
  const cardDetails = {
    attack: "单出造成 2 点伤害",
    heal: "单出恢复 3；受到攻击时回血不生效并直接失去 3 点生命，破阵爆发改为失去 4 点；组合技中的回血只会被取消，不额外扣血",
    defend: "单出抵挡 2 点，25% 概率反弹 1 点",
    ultimate: "单出消耗 1 体力，造成 3 点伤害，冷却 4 回合"
  };
  const enemyActions = [
    { id: "attack", label: "攻击", cards: ["attack"], detail: "造成 2 点伤害 · 免费", cost: 0, damage: 2 },
    { id: "heal", label: "回血", cards: ["heal"], detail: "恢复 3 · 受到攻击时回血不生效并失去 3 点生命，破阵爆发改为失去 4 点 · 免费", cost: 0, recovery: 3 },
    { id: "defend", label: "防御", cards: ["defend"], detail: "抵挡 2＋25% 概率反弹 1 · 免费", cost: 0, shield: DEFENSE_BLOCK, counter: COUNTER_DAMAGE },
    { id: "ultimate", label: "必杀", cards: ["ultimate"], detail: "造成 3 点伤害 · 消耗 1 体力", cost: 1, damage: 3, ultimate: true },
    { id: "attack+heal", label: "攻击＋回血", cards: ["attack", "heal"], detail: "吸血斩：2 伤害＋恢复 1", cost: 1, damage: 2, recovery: 1, combo: true },
    { id: "attack+defend", label: "攻击＋防御", cards: ["attack", "defend"], detail: "盾击：2 伤害＋2 护盾＋25% 概率反弹 1", cost: 1, damage: 2, shield: DEFENSE_BLOCK, counter: COUNTER_DAMAGE, combo: true },
    { id: "defend+ultimate", label: "防御＋必杀", cards: ["defend", "ultimate"], detail: "盾击：3 伤害＋2 护盾＋25% 概率反弹 1 · 消耗 2 体力并触发必杀冷却", cost: 2, damage: 3, shield: DEFENSE_BLOCK, counter: COUNTER_DAMAGE, combo: true },
    { id: "attack+ultimate", label: "攻击＋必杀", cards: ["attack", "ultimate"], detail: "破阵爆发：4 伤害 · 消耗 2 体力并触发必杀冷却", cost: 2, damage: 4, combo: true },
    { id: "defend+heal", label: "防御＋回血", cards: ["defend", "heal"], detail: "稳住阵脚：恢复 2＋2 护盾＋25% 概率反弹 1", cost: 1, recovery: 2, shield: DEFENSE_BLOCK, counter: COUNTER_DAMAGE, combo: true },
    { id: "heal+ultimate", label: "回血＋必杀", cards: ["heal", "ultimate"], detail: "吸血斩：3 伤害＋恢复 1 · 触发必杀冷却", cost: 1, damage: 3, recovery: 1, combo: true }
  ];

  const styleText = `
    .card-battle { position: relative; box-sizing: border-box; width: 100%; height: 100%; min-height: 0; padding: clamp(10px, 1.3vw, 16px); display: flex; flex-direction: column; gap: 6px; overflow: auto; color: #f6ead5; background-color: #17100d; background-image: linear-gradient(rgba(8, 7, 8, .56), rgba(8, 7, 8, .68)), url("assets/Image/Scene/Background/card-battle.webp"); background-position: center; background-repeat: no-repeat; background-size: cover; font-family: "Ark Pixel 12px", "Microsoft YaHei", sans-serif; font-synthesis: none; }
    .card-battle.is-responsive { padding: 10px; }
    .card-battle::-webkit-scrollbar { width: 0; height: 0; }
    .card-battle * { box-sizing: border-box; }
    .card-battle button { font: inherit; }
    .cb-topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 0; color: #efb45f; letter-spacing: .08em; }
    .cb-topbar strong { font-size: clamp(17px, 2.1vw, 25px); }
    .cb-round { color: #bba98f; font-size: 14px; }
    .cb-rules { margin: 0; border: 1px solid rgba(239, 180, 95, .35); background: rgba(53, 37, 26, .58); }
    .cb-rules summary { padding: 6px 10px; color: #efb45f; cursor: pointer; }
    .cb-rule-body { padding: 0 12px 10px; color: #d5c6ae; font-size: 13px; line-height: 1.55; }
    .cb-rule-body p { margin: 6px 0; }
    .cb-arena { display: grid; grid-template-columns: 1fr auto 1fr; align-items: stretch; gap: 10px; flex: 1 1 198px; min-height: 198px; padding: 12px; }
    .cb-fighter { min-width: 0; min-height: 0; display: flex; flex-direction: column; padding: 10px; border: 1px solid rgba(239, 180, 95, .2); background: rgba(15, 11, 9, .48); }
    .cb-fighter-name { display: flex; flex-direction: column; gap: 1px; margin-bottom: 4px; }
    .cb-fighter-name small { color: #9d8e78; font-size: 11px; }
    .cb-fighter-name strong { color: #f6ead5; font-size: 16px; }
    .cb-hp-line { display: grid; gap: 3px; color: #efb45f; font-size: 12px; }
    .cb-hp-track { position: relative; height: 16px; padding: 0; border: 0; overflow: visible; background: url("assets/Image/Ui/CardBattle/hp-bar.webp") center / 100% 100% no-repeat; }
    .cb-hp-fill { position: absolute; left: 13px; top: 5px; display: block; height: 6px; background: linear-gradient(90deg, #b6372c, #efb45f); transition: width .2s ease; }
    .cb-resource { display: flex; align-items: center; gap: 6px; margin-top: 4px; color: #9d8e78; font-size: 11px; }
    .cb-orbs { display: flex; gap: 3px; min-height: 17px; color: rgba(85, 208, 212, .22); font-size: 16px; }
    .cb-orbs .full { color: #55d0d4; text-shadow: 0 0 8px rgba(85, 208, 212, .7); }
    .cb-orbs .infinite-energy { color: #efb45f; text-shadow: 0 0 8px rgba(239, 180, 95, .75); font-weight: 700; }
    .cb-face { flex: 1 1 0; min-height: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; color: #a7a4a1; line-height: 1; text-align: center; }
    .cb-enemy-face img { width: 100%; height: 100%; max-width: 52px; max-height: 52px; object-fit: contain; filter: drop-shadow(0 5px 5px rgba(0, 0, 0, .65)); }
    .cb-player-face { font-size: 26px; }
    .cb-vs { color: #efb45f; font-size: 22px; letter-spacing: .12em; }
    .cb-intent { width: 100%; flex: 0 0 auto; margin-top: auto; padding: 5px 8px; border: 1px solid rgba(85, 208, 212, .5); color: #bceff0; background: rgba(22, 63, 66, .42); cursor: pointer; font-size: 10px; }
    .cb-intent:disabled { cursor: not-allowed; opacity: .65; }
    .cb-last-play { display: block; margin-top: 8px; padding: 7px 8px; border: 1px solid rgba(239, 180, 95, .3); background: rgba(53, 37, 26, .52); }
    .cb-last-play[hidden] { display: none; }
    .cb-last-play strong, .cb-last-play span { display: block; }
    .cb-last-kicker { color: #9d8e78; font-size: 10px; }
    .cb-last-detail { margin-top: 2px; color: #bba98f; }
    .cb-readout { display: flex; align-items: flex-start; gap: 12px; min-height: 40px; margin: 0; padding: 7px 10px; border: 1px solid rgba(239, 180, 95, .28); background: rgba(53, 37, 26, .45); }
    .cb-energy-label { display: block; margin-bottom: 2px; color: #9d8e78; font-size: 11px; }
    .cb-log { margin: 0; color: #f6ead5; font-size: 13px; line-height: 1.45; }
    .cb-hand { padding: 10px; border: 1px solid rgba(239, 180, 95, .28); background: rgba(36, 22, 16, .68); }
    .cb-hand-heading { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px; color: #efb45f; }
    .cb-selected { display: block; margin-top: 3px; color: #bba98f; font-size: 12px; }
    .cb-play, .cb-restart { padding: 8px 12px; border: 1px solid rgba(239, 180, 95, .65); color: #17100a; background: #efb45f; cursor: pointer; }
    .cb-play:disabled { cursor: not-allowed; opacity: .4; }
    .cb-cards { display: grid; grid-template-columns: repeat(4, 82px); justify-content: center; gap: 10px; }
    .cb-card { position: relative; width: 82px; aspect-ratio: 3 / 4; min-height: 0; padding: 0; overflow: hidden; border: 0; color: #f6ead5; background-color: transparent; background-image: var(--card-art), url("assets/Image/Ui/CardBattle/card-base.webp"); background-position: center; background-repeat: no-repeat; background-size: contain; cursor: pointer; text-align: left; transition: transform 120ms ease, filter 120ms ease, opacity 120ms ease; }
    .cb-card[data-card="attack"] { --card-art: url("assets/Image/Ui/CardBattle/attack.webp"); }
    .cb-card[data-card="heal"] { --card-art: url("assets/Image/Ui/CardBattle/heal.png"); }
    .cb-card[data-card="defend"] { --card-art: url("assets/Image/Ui/CardBattle/defend.png"); }
    .cb-card[data-card="ultimate"] { --card-art: url("assets/Image/Ui/CardBattle/ultimate.png"); }
    .cb-card:hover:not(:disabled), .cb-card.selected { filter: brightness(1.14); transform: translateY(-3px); }
    .cb-card.selected { outline: 3px solid rgba(239, 180, 95, .8); outline-offset: 2px; }
    .cb-card:disabled { cursor: not-allowed; opacity: .4; }
    .cb-card.locked::after { content: ""; position: absolute; inset: 0; z-index: 1; background: url("assets/Image/Ui/CardBattle/card-base.webp") center / contain no-repeat; opacity: .94; }
    .cb-card .key { position: absolute; z-index: 2; top: 6px; right: 7px; display: grid; place-items: center; width: 18px; height: 18px; color: #17100a; background: rgba(239, 180, 95, .94); font-size: 10px; font-weight: 700; }
    .cb-card .symbol { display: none; }
    .cb-card .name { position: absolute; z-index: 2; right: 5px; bottom: 6px; left: 5px; color: #fff7e8; font-size: 11px; font-weight: 700; text-align: center; text-shadow: 0 1px 3px #000, 0 0 3px #000; }
    .cb-card .detail { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
    .cb-status { margin-top: 8px; color: #bba98f; font-size: 11px; }
    @media (max-width: 680px) {
      .cb-arena { grid-template-columns: 1fr; gap: 7px; min-height: 0; }
      .cb-vs { text-align: center; }
      .cb-face { display: none; }
      .cb-cards { grid-template-columns: repeat(2, 82px); }
      .cb-card { width: 82px; }
    }
  `;

  const template = `
    <header class="cb-topbar"><strong>战斗轮 · 卡牌对决</strong><span class="cb-round" data-round>回合 1</span></header>
    <details class="cb-rules">
      <summary>规则说明</summary>
      <div class="cb-rule-body">
        <p><strong>目标：</strong>你的生命值为 10，敌人生命值为 10，把敌人击倒即可获胜；同一次结算中双方都倒下时，算你赢。</p>
        <p><strong>出牌：</strong>单出攻击、回血或防御免费，单出必杀消耗 1 点体力；通常双牌消耗 1 点体力，“攻击＋必杀”和“防御＋必杀”消耗 2 点。双方每 2 回合恢复 1 点体力。</p>
        <p><strong>克制：</strong>单独回血遇到任何攻击时，回血不生效并直接失去 3 点生命；4 点破阵爆发改为失去 4 点。组合技中的回血被攻击时只取消回血，不额外扣血，另一张牌和对方攻击照常结算。防御对所有攻击伤害生效，抵挡 2 点，并有 25% 概率反弹 1 点。</p>
        <p><strong>组合：</strong>必杀会强化组合技：“回血＋必杀”造成 3 点伤害并回复 1 点，“防御＋必杀”造成 3 点伤害并获得防御，“攻击＋必杀”造成 4 点伤害；所有含必杀的组合技都会触发 4 回合必杀冷却。</p>
        <p><strong>濒死：</strong><span data-infinite-rule></span></p>
      </div>
    </details>
    <section class="cb-arena" aria-label="战斗区域">
      <section class="cb-fighter" aria-label="敌人">
        <div class="cb-fighter-name"><small>敌人</small><strong>无眼者</strong></div>
        <div class="cb-hp-line"><span data-enemy-hp>10 / 10</span><div class="cb-hp-track"><span class="cb-hp-fill" data-enemy-fill></span></div></div>
        <div class="cb-resource"><span>体力</span><span class="cb-orbs" data-enemy-orbs aria-label="敌人体力 0 / 3"></span></div>
        <div class="cb-face cb-enemy-face" aria-hidden="true"><img src="assets/Image/Portrait/monster-pixel.webp" alt=""></div>
        <button class="cb-intent" type="button" data-intent aria-expanded="false">? 点击查看两张候选牌</button>
        <div class="cb-last-play" data-last-play hidden><span class="cb-last-kicker">上回合出牌</span><strong data-last-name></strong><span class="cb-last-detail" data-last-detail></span></div>
      </section>
      <div class="cb-vs" aria-hidden="true">VS</div>
      <section class="cb-fighter" aria-label="玩家">
        <div class="cb-fighter-name"><small>调查员</small><strong>你</strong></div>
        <div class="cb-hp-line"><span data-player-hp>10 / 10</span><div class="cb-hp-track"><span class="cb-hp-fill" data-player-fill></span></div></div>
        <div class="cb-resource"><span>体力</span><span class="cb-orbs" data-player-orbs aria-label="体力 0 / 3"></span></div>
        <div class="cb-face cb-player-face" aria-hidden="true">♟</div>
        <div class="cb-status" data-shield hidden></div>
      </section>
    </section>
    <section class="cb-readout" aria-label="战斗信息">
      <div><span class="cb-energy-label">你的体力</span><span class="cb-orbs" data-readout-orbs aria-hidden="true"></span></div>
      <p class="cb-log" data-log role="status" aria-live="polite">双方每 2 回合恢复 1 点体力。</p>
    </section>
    <section class="cb-hand" aria-label="四张卡牌">
      <div class="cb-hand-heading"><div><strong>选择 1 或 2 张牌</strong><span class="cb-selected" data-selected>已选 0 / 2</span></div><button class="cb-play" type="button" data-play disabled>出牌</button></div>
      <div class="cb-cards">
        <button class="cb-card" type="button" data-card="attack" aria-pressed="false"><span class="key">1</span><span class="symbol">斩</span><span class="name">攻击</span><span class="detail">单出造成 2 点伤害</span></button>
        <button class="cb-card" type="button" data-card="heal" aria-pressed="false"><span class="key">2</span><span class="symbol">愈</span><span class="name">回血</span><span class="detail">单出恢复 3（受攻击：失去 3 点；破阵爆发失去 4 点；组合回血只取消恢复）</span></button>
        <button class="cb-card" type="button" data-card="defend" aria-pressed="false"><span class="key">3</span><span class="symbol">防</span><span class="name">防御</span><span class="detail">单出抵挡 2 点，25% 概率反弹 1 点</span></button>
        <button class="cb-card" type="button" data-card="ultimate" aria-pressed="false"><span class="key">4</span><span class="symbol">必</span><span class="name">必杀</span><span class="detail">单出消耗 1 体力，造成 3 点伤害，冷却 4 回合</span></button>
      </div>
    </section>
  `;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function getPlayerActionCost(cards) {
    if (cards.length === 1) return cards[0] === "ultimate" ? 1 : 0;
    if (cards.length !== 2) return 0;
    const key = [...cards].sort().join("+");
    return key === "attack+ultimate" || key === "defend+ultimate" ? 2 : 1;
  }

  function hasInfiniteEnemyEnergy(enemyHp, threshold) {
    return enemyHp <= threshold;
  }

  function pickEnemyCandidates(energy, ultimateCooldown, enemyHp, threshold) {
    const infiniteEnergy = hasInfiniteEnemyEnergy(enemyHp, threshold);
    const available = enemyActions.filter((action) =>
      (infiniteEnergy || action.cost <= energy) &&
      (!action.cards.includes("ultimate") || ultimateCooldown === 0) &&
      (enemyHp < MAX_ENEMY_HP || !action.recovery)
    );
    return [...available].sort(() => Math.random() - 0.5).slice(0, 2);
  }

  function scoreEnemyAction(action, context) {
    // 候选牌仍然随机，但敌人会根据玩家已经选定的牌做更可靠的战术判断。
    let score = Math.random() * 0.35;
    const selected = context.selected || [];
    const playerThreatens = isAttackAction(selected);
    const playerHeals = selected.includes("heal");
    const playerUsesCombo = selected.length === 2;
    const has = (cardId) => action.cards.includes(cardId);
    const attacks = isAttackAction(action.cards);

    if (action.combo) score += 5;
    if (attacks) {
      score += 3;
      score += playerHeals ? 8 : 0;
      score += context.playerHp <= 3 ? 8 : context.playerHp <= 5 ? 4 : 0;
    }

    if (action.id === "attack+ultimate") score += 7;
    if (action.ultimate && !action.combo) score += 6;

    if (has("heal")) {
      score += context.enemyHp >= MAX_ENEMY_HP
        ? -30
        : context.enemyHp >= 8
          ? -10
          : context.enemyHp <= 3
            ? 6
            : context.enemyHp <= 5
              ? 3
              : -2;
      score += playerThreatens ? -10 : 0;
    }

    if (has("defend")) {
      score += playerThreatens ? 16 : 0;
      score += playerThreatens && playerUsesCombo ? 3 : 0;
      score += context.enemyHp <= 4 ? 4 : 0;
    }

    return score;
  }

  function chooseEnemyAction(candidates, context) {
    const ranked = [...candidates].sort((left, right) => scoreEnemyAction(right, context) - scoreEnemyAction(left, context));
    return ranked.length < 2 || Math.random() < 0.85 ? ranked[0] : ranked[1];
  }

  function isAttackAction(cards) {
    return cards.some((cardId) => cardId === "attack" || cardId === "ultimate");
  }

  function recoveryBacklash(cards) {
    if (!isAttackAction(cards)) return 0;
    return cards.includes("attack") && cards.includes("ultimate") ? 4 : 3;
  }

  function recoveryCounterName(cards) {
    if (cards.includes("attack") && cards.includes("ultimate")) return "破阵爆发";
    return cards.includes("ultimate") ? "必杀" : "攻击";
  }

  function run(context, enemyInfiniteEnergyHp = 3) {
    if (!context.stage) return Promise.resolve(null);

    const stage = context.stage;
    const style = document.createElement("style");
    style.textContent = styleText;
    const root = document.createElement("section");
    root.className = "card-battle";
    root.innerHTML = template;
    root.querySelector(".cb-rules").open = false;
    root.querySelector("[data-infinite-rule]").textContent = `敌人生命值降到 ${enemyInfiniteEnergyHp} 或更低后体力变为无限，可连续使用组合技；单出必杀仍受 4 回合冷却。`;
    stage.append(style, root);

    root.classList.toggle("is-responsive", stage.clientWidth <= 700);

    const elements = {
      round: root.querySelector("[data-round]"),
      enemyHp: root.querySelector("[data-enemy-hp]"),
      enemyFill: root.querySelector("[data-enemy-fill]"),
      enemyOrbs: root.querySelector("[data-enemy-orbs]"),
      intent: root.querySelector("[data-intent]"),
      lastPlay: root.querySelector("[data-last-play]"),
      lastName: root.querySelector("[data-last-name]"),
      lastDetail: root.querySelector("[data-last-detail]"),
      playerHp: root.querySelector("[data-player-hp]"),
      playerFill: root.querySelector("[data-player-fill]"),
      playerOrbs: root.querySelector("[data-player-orbs]"),
      readoutOrbs: root.querySelector("[data-readout-orbs]"),
      shield: root.querySelector("[data-shield]"),
      log: root.querySelector("[data-log]"),
      selected: root.querySelector("[data-selected]"),
      play: root.querySelector("[data-play]"),
      cards: [...root.querySelectorAll("[data-card]")]
    };

    const state = {
      playerHp: MAX_PLAYER_HP,
      enemyHp: MAX_ENEMY_HP,
      energy: 0,
      enemyEnergy: 0,
      shield: 0,
      counter: 0,
      enemyShield: 0,
      enemyCounter: 0,
      round: 1,
      ultimateCooldown: 0,
      enemyUltimateCooldown: 0,
      selected: [],
      enemyCandidates: pickEnemyCandidates(0, 0, MAX_ENEMY_HP, enemyInfiniteEnergyHp),
      enemyAction: null,
      enemyPlayed: null,
      lastPlayed: null,
      intentRevealed: false,
      busy: false,
      ended: false
    };

    let resolveSettlement;
    let transitionTimer = null;
    let resultTimer = null;
    let cleaned = false;
    const finished = new Promise((resolve) => { resolveSettlement = resolve; });

    function say(messages) {
      elements.log.textContent = messages.join(" · ");
    }

    function schedule(callback, delay) {
      return window.setTimeout(callback, delay);
    }

    function renderOrbs(target, value, label, infinite = false) {
      target.replaceChildren();
      target.setAttribute("aria-label", infinite ? label : `${label} ${value} / ${MAX_ENERGY}`);
      if (infinite) {
        const mark = document.createElement("span");
        mark.className = "infinite-energy";
        mark.textContent = "∞";
        mark.setAttribute("aria-hidden", "true");
        target.append(mark);
        return;
      }
      for (let index = 0; index < MAX_ENERGY; index += 1) {
        const orb = document.createElement("span");
        orb.className = index < value ? "full" : "";
        orb.textContent = "✦";
        orb.setAttribute("aria-hidden", "true");
        target.append(orb);
      }
    }

    function render() {
      elements.round.textContent = `回合 ${state.round}`;
      elements.enemyHp.textContent = `${state.enemyHp} / ${MAX_ENEMY_HP}`;
      elements.enemyFill.style.width = `calc((100% - 26px) * ${state.enemyHp / MAX_ENEMY_HP})`;
      const enemyInfinite = hasInfiniteEnemyEnergy(state.enemyHp, enemyInfiniteEnergyHp);
      renderOrbs(elements.enemyOrbs, state.enemyEnergy, enemyInfinite ? "敌人体力无限" : "敌人体力", enemyInfinite);
      renderOrbs(elements.playerOrbs, state.energy, "体力");
      renderOrbs(elements.readoutOrbs, state.energy, "体力");
      elements.playerHp.textContent = `${state.playerHp} / ${MAX_PLAYER_HP}`;
      elements.playerFill.style.width = `calc((100% - 26px) * ${state.playerHp / MAX_PLAYER_HP})`;
      elements.shield.hidden = state.shield <= 0;
      elements.shield.textContent = `护盾 ${state.shield}${state.counter > 0 ? " · 25% 反击 1" : ""}`;
      if (state.enemyPlayed) {
        elements.intent.textContent = `✓ 已出牌：${state.enemyPlayed.label}`;
      } else if (state.intentRevealed) {
        elements.intent.textContent = `! 可能：${state.enemyCandidates.map((action) => action.label).join(" / ")}`;
      } else {
        elements.intent.textContent = "? 点击查看两张候选牌";
      }
      elements.intent.disabled = state.busy || state.ended || Boolean(state.enemyPlayed);
      elements.intent.setAttribute("aria-expanded", String(state.intentRevealed));
      elements.lastPlay.hidden = !state.lastPlayed;
      if (state.lastPlayed) {
        elements.lastName.textContent = state.lastPlayed.label;
        elements.lastDetail.textContent = state.lastPlayed.detail;
      }
      const selectedNames = state.selected.map((id) => cardNames[id]).join("＋");
      elements.selected.textContent = selectedNames ? `已选 ${state.selected.length} / 2：${selectedNames}` : "已选 0 / 2";
      const actionCost = getPlayerActionCost(state.selected);
      elements.play.disabled = state.busy || state.ended || state.selected.length === 0 || state.energy < actionCost;
      elements.play.textContent = state.selected.length === 2
        ? `同时出牌（-${actionCost} 体力）`
        : actionCost > 0
          ? `出一张（-${actionCost} 体力）`
          : "出一张（免费）";
      elements.cards.forEach((button) => {
        const cardId = button.dataset.card;
        const locked = cardId === "ultimate" && state.ultimateCooldown > 0 && state.selected.length === 0;
        const selected = state.selected.includes(cardId);
        button.disabled = state.busy || state.ended || locked;
        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", String(selected));
        button.title = locked
          ? `必杀冷却中，还剩 ${state.ultimateCooldown} 回合；冷却结束后才可选择`
          : `${cardNames[cardId]}：${cardDetails[cardId]}`;
      });
    }

    function damageEnemy(amount, messages, combo = false) {
      let damage = amount;
      if (state.enemyShield > 0) {
        const blocked = Math.min(state.enemyShield, damage);
        state.enemyShield -= blocked;
        damage -= blocked;
        messages.push(`敌人的防御挡住了 ${blocked} 点伤害`);
      }
      if (amount > 0 && state.enemyCounter > 0) {
        if (Math.random() < COUNTER_CHANCE) {
          state.playerHp = clamp(state.playerHp - state.enemyCounter, 0, MAX_PLAYER_HP);
          messages.push(`敌人的防御反弹了 ${state.enemyCounter} 点伤害`);
        } else {
          messages.push("敌人的防御反击未触发");
        }
        state.enemyCounter = 0;
      }
      const wasAboveThreshold = state.enemyHp > enemyInfiniteEnergyHp;
      state.enemyHp = clamp(state.enemyHp - damage, 0, MAX_ENEMY_HP);
      if (damage > 0) messages.push(`你造成了 ${damage} 点伤害`);
      if (wasAboveThreshold && state.enemyHp <= enemyInfiniteEnergyHp && state.enemyHp > 0) {
        messages.push("敌人濒死，体力变为无限");
      }
    }

    function damagePlayer(amount, messages, combo = false) {
      const blocked = Math.min(state.shield, amount);
      const actual = amount - blocked;
      if (blocked > 0) messages.push(`护盾抵挡了 ${blocked} 点伤害`);
      if (actual > 0) {
        state.playerHp = clamp(state.playerHp - actual, 0, MAX_PLAYER_HP);
        messages.push(`你受到 ${actual} 点伤害`);
      } else messages.push("你没有受到伤害");
    }

    function healPlayer(amount, messages, penalty = 0, counterName = "斩击") {
      if (penalty > 0) {
        state.playerHp = clamp(state.playerHp - penalty, 0, MAX_PLAYER_HP);
        messages.push(`你的回血被${counterName}打断，不生效并失去 ${penalty} 点生命`);
        return;
      }
      const before = state.playerHp;
      state.playerHp = clamp(state.playerHp + amount, 0, MAX_PLAYER_HP);
      const recovered = state.playerHp - before;
      if (recovered > 0) messages.push(`你恢复了 ${recovered} 点生命`);
      else messages.push("生命值已经满了");
    }

    function healEnemy(amount, messages) {
      const before = state.enemyHp;
      state.enemyHp = clamp(state.enemyHp + amount, 0, MAX_ENEMY_HP);
      const recovered = state.enemyHp - before;
      if (recovered > 0) messages.push(`敌人恢复了 ${recovered} 点生命`);
      else messages.push("敌人的生命值已满");
    }

    function damageEnemyForAttack(amount, messages, combo = false) {
      // 攻击回血目标时，3/4 点反制伤害替代原本的攻击伤害，避免重复扣血。
      if (state.enemyAction.recovery && !state.enemyAction.combo && isAttackAction(state.selected)) {
        return damageEnemy(recoveryBacklash(state.selected), messages, true);
      }
      return damageEnemy(amount, messages, combo);
    }

    function healPlayerForCombo(amount, messages) {
      if (isAttackAction(state.enemyAction.cards)) {
        messages.push("组合技中的回血被攻击打断，不生效且不额外扣血");
        return;
      }
      healPlayer(amount, messages);
    }

    function resolveSingle(cardId, messages) {
      if (cardId === "attack") return damageEnemyForAttack(2, messages);
      if (cardId === "heal") {
        const penalty = recoveryBacklash(state.enemyAction.cards);
        return healPlayer(3, messages, penalty, recoveryCounterName(state.enemyAction.cards));
      }
      if (cardId === "defend") {
        state.shield = DEFENSE_BLOCK;
        state.counter = COUNTER_DAMAGE;
        messages.push("你获得了 2 点护盾，受到攻击时有 25% 概率反弹 1 点");
        return;
      }
      damageEnemyForAttack(3, messages);
      state.ultimateCooldown = ULTIMATE_COOLDOWN;
      messages.push("必杀进入 4 回合冷却");
    }

    function resolveCombo(cardIds, messages) {
      const key = [...cardIds].sort().join("+");
      if (key === "attack+heal" || key === "heal+ultimate") {
        messages.push("组合技：吸血斩");
        damageEnemyForAttack(key === "heal+ultimate" ? 3 : 2, messages, true);
        healPlayerForCombo(1, messages);
      } else if (key === "attack+defend" || key === "defend+ultimate") {
        messages.push("组合技：盾击");
        damageEnemyForAttack(key === "defend+ultimate" ? 3 : 2, messages, true);
        state.shield = DEFENSE_BLOCK;
        state.counter = COUNTER_DAMAGE;
        messages.push("你获得了 2 点护盾，受到攻击时有 25% 概率反弹 1 点");
      } else if (key === "attack+ultimate") {
        messages.push("组合技：破阵爆发");
        damageEnemyForAttack(4, messages, true);
      } else if (key === "defend+heal") {
        messages.push("组合技：稳住阵脚");
        healPlayerForCombo(2, messages);
        state.shield = DEFENSE_BLOCK;
        state.counter = COUNTER_DAMAGE;
        messages.push("你获得了 2 点护盾，受到攻击时有 25% 概率反弹 1 点");
      }
      if (cardIds.includes("ultimate")) {
        state.ultimateCooldown = ULTIMATE_COOLDOWN;
        messages.push("必杀进入 4 回合冷却");
      }
    }

    function clearTemporaryDefense() {
      state.shield = 0;
      state.enemyShield = 0;
      state.enemyCounter = 0;
      state.counter = 0;
    }

    function commitEnemyAction() {
      state.enemyAction = chooseEnemyAction(state.enemyCandidates, state);
      state.enemyShield = state.enemyAction.shield || 0;
      state.enemyCounter = state.enemyAction.counter || 0;
    }

    function resolveEnemyAction(messages) {
      const action = state.enemyAction;
      if (!hasInfiniteEnemyEnergy(state.enemyHp, enemyInfiniteEnergyHp)) state.enemyEnergy = clamp(state.enemyEnergy - action.cost, 0, MAX_ENERGY);
      state.enemyPlayed = action;
      state.lastPlayed = action;
      messages.push(`敌人出牌：${action.label}（${action.detail}）`);
      if (action.cards.includes("ultimate")) {
        state.enemyUltimateCooldown = ULTIMATE_COOLDOWN;
        messages.push("敌人的必杀进入 4 回合冷却");
      }
      if (state.counter > 0 && action.damage) {
        if (Math.random() < COUNTER_CHANCE) {
          state.enemyHp = clamp(state.enemyHp - state.counter, 0, MAX_ENEMY_HP);
          messages.push(`反击造成 ${state.counter} 点伤害`);
        } else {
          messages.push("防御反击未触发");
        }
      }
      if (state.enemyHp <= 0) return;
      if (action.damage) {
        const playerRecoveryCountered = state.selected.length === 1 && state.selected[0] === "heal" && isAttackAction(action.cards);
        if (!playerRecoveryCountered) damagePlayer(action.damage, messages, action.combo);
      }
      if (action.recovery) {
        const enemyRecoveryCountered = isAttackAction(state.selected);
        if (enemyRecoveryCountered) {
          messages.push("敌人的回血不生效（攻击伤害已直接结算）");
        } else {
          healEnemy(action.recovery, messages);
        }
      }
      clearTemporaryDefense();
    }

    function endBattle(won, messages) {
      if (state.ended) return;
      state.ended = true;
      state.busy = true;
      messages.push(won ? "战斗胜利" : "你被击倒了");
      say(messages);
      render();
      const settlement = won ? [
        { type: "setFlag", key: "card_battle_won", value: true },
        { type: "setFlag", key: "carriage_02_passed", value: true },
        { type: "setFlag", key: "clicker_cleared", value: true },
        { type: "dialogue", text: "你在战斗轮中击倒了无眼者，抵达通往先头车厢的安全门前。" }
      ] : [
        { type: "setFlag", key: "card_battle_won", value: false },
        { type: "dialogue", text: "无眼者抓住了你的破绽，战斗轮失败。" },
        { type: "jump", next: "E_030" }
      ];
      resultTimer = schedule(() => {
        resolveSettlement(settlement);
      }, 420);
    }

    function finishTurn(messages) {
      if (state.enemyHp <= 0) return endBattle(true, messages);
      resolveEnemyAction(messages);
      if (state.enemyHp <= 0) return endBattle(true, messages);
      if (state.playerHp <= 0) return endBattle(false, messages);
      say(messages);
      render();
      transitionTimer = schedule(() => {
        state.round += 1;
        state.ultimateCooldown = Math.max(0, state.ultimateCooldown - 1);
        state.enemyUltimateCooldown = Math.max(0, state.enemyUltimateCooldown - 1);
        if (state.round % 2 === 1) {
          state.energy = clamp(state.energy + 1, 0, MAX_ENERGY);
          state.enemyEnergy = clamp(state.enemyEnergy + 1, 0, MAX_ENERGY);
        }
        state.enemyCandidates = pickEnemyCandidates(state.enemyEnergy, state.enemyUltimateCooldown, state.enemyHp, enemyInfiniteEnergyHp);
        state.enemyAction = null;
        state.enemyPlayed = null;
        state.intentRevealed = false;
        state.selected = [];
        state.busy = false;
        say([state.round % 2 === 1 ? "双方恢复 1 点体力。" : "本回合不恢复体力。"]);
        render();
      }, ENEMY_PLAY_DISPLAY_MS);
    }

    function selectCard(cardId) {
      if (state.busy || state.ended || (cardId === "ultimate" && state.ultimateCooldown > 0)) return;
      const index = state.selected.indexOf(cardId);
      if (index >= 0) state.selected.splice(index, 1);
      else if (state.selected.length < 2) state.selected.push(cardId);
      render();
    }

    function revealIntent() {
      if (state.busy || state.ended || state.enemyPlayed) return;
      state.intentRevealed = !state.intentRevealed;
      render();
    }

    function playSelected() {
      if (state.busy || state.ended || state.selected.length === 0) return;
      const actionCost = getPlayerActionCost(state.selected);
      if (state.energy < actionCost) {
        say([`这次出牌需要 ${actionCost} 点体力，请等体力恢复。`]);
        return;
      }
      state.busy = true;
      const selected = [...state.selected];
      const messages = [selected.length === 2 ? `你同时使用了${selected.map((id) => cardNames[id]).join("＋")}` : `你使用了${cardNames[selected[0]]}`];
      commitEnemyAction();
      state.energy -= actionCost;
      if (selected.length === 2) resolveCombo(selected, messages);
      else resolveSingle(selected[0], messages);
      render();
      transitionTimer = schedule(() => finishTurn(messages), 180);
    }

    function cleanup() {
      if (cleaned) return;
      cleaned = true;
      if (transitionTimer !== null) window.clearTimeout(transitionTimer);
      if (resultTimer !== null) window.clearTimeout(resultTimer);
      elements.cards.forEach((button) => button.removeEventListener("click", onCardClick));
      elements.intent.removeEventListener("click", revealIntent);
      elements.play.removeEventListener("click", playSelected);
      root.remove();
      style.remove();
    }

    function onCardClick(event) {
      selectCard(event.currentTarget.dataset.card);
    }

    elements.cards.forEach((button) => button.addEventListener("click", onCardClick));
    elements.intent.addEventListener("click", revealIntent);
    elements.play.addEventListener("click", playSelected);
    context.onQuit(() => null);
    context.registerCleanup(cleanup);
    say(["双方每 2 回合恢复 1 点体力。"]);
    render();
    return finished;
  }

  function createRun(enemyInfiniteEnergyHp) {
    return (context) => run(context, enemyInfiniteEnergyHp);
  }

  Game.Minigames.register("card_battle", {
    title: "战斗轮 · 卡牌对决（简单模式）",
    allowQuit: false,
    run: createRun(3)
  });

  Game.Minigames.register("card_battle_hard", {
    title: "战斗轮 · 卡牌对决（困难模式）",
    allowQuit: false,
    run: createRun(5)
  });
})(window.TrainGame);
