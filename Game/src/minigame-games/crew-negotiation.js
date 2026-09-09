(function (Game) {
  "use strict";

  // 乘务员安抚与交涉小游戏：三轮 × 每轮两个选项，正确/错误影响后续最终检定的成功率加成。
  // - 与 webgl3d_demo 一样只在顶层做注册（编译器会在 node:vm 里加载本文件收集编号），
  //   所有 DOM 操作延迟到 run()，保证无 DOM 环境（自动化测试）下加载安全。
  // - 玩法：每轮乘务员抛出一个问题，玩家在两个回应里选一个；正确选项（内部标记按“安抚得当”
  //   制定，不向玩家明示正确与否）+30%，错误选项 +10%。三轮结束后按
  //   bonus = 30*正确数 + 10*错误数（即 30 + 20*正确数）结算，范围 30~90。
  // - 结果只通过结算动作列表表达：setFlag ev014_negotiation_bonus = bonus。
  //   提前点“退出小游戏”视为交涉中断，加成记为 0（事件引擎随后仍会执行最终检定）。
  // - 布局按需求示意图：左右人物立绘、中央背景、顶部对话记录、中部当前问题与两个选项。

  const BACKGROUND_IMAGE = "assets/miniGame/交涉背景.png";
  const CREW_PORTRAIT = "assets/crew-portrait.png";
  const PC_PORTRAIT = "assets/pc-portrait.png";

  // 占位剧情数据：每轮一个“乘务员提问”，玩家在两个回应里二选一。
  // correct 为内部标记（true=安抚得当），不展示给玩家；reaction 为乘务员对你回应的反应。
  // 注意：只在此逐步建立信任与获取部分信息，不提前泄露“怪物对声音敏感”这一关键线索
  // （那是最终检定成功后在 E_014_TALK_S 里给出的奖励，避免剧情重复）。
  const ROUNDS = [
    {
      speaker: "乘务员",
      prompt: "呃……好痛……我是不是要死了……（她声音发颤，眼神慌乱地望着你）",
      options: [
        {
          label: "（压低声音，语气坚定）不会的。你先别乱动，我会陪着你。",
          correct: true
        },
        {
          label: "（焦急催促）先别管这些！快说，那些怪物到底是什么？！",
          correct: false
        }
      ],
      reaction: {
        good: "（她狠狠喘了几口气，终于稍稍安定下来）……嗯……我是这里的乘务员……谢谢你……",
        bad: "（她被你的催促吓得一哆嗦，声音更抖了）我……我不知道……求你别逼我……"
      }
    },
    {
      speaker: "乘务员",
      prompt: "那些东西……太可怕了。我一闭上眼，就全是它们的影子……我不想再回忆了。",
      options: [
        {
          label: "（放缓语速，语气温和）我明白。你只要记起一点点就好——它们是朝你扑过来的，还是很远就发现了你？",
          correct: true
        },
        {
          label: "（步步紧逼）你必须说清楚！到底有多少只？它们到底从哪儿来的？",
          correct: false
        }
      ],
      reaction: {
        good: "（她握紧拳头，努力回想）有……有两只很高的东西，动作特别快。它们好像是从车厢那头突然扑过来的……",
        bad: "（她痛苦地摇头，眼神躲闪）别再问了……我真的、真的记不清了……"
      }
    },
    {
      speaker: "乘务员",
      prompt: "你……你不会也丢下我吧？我好害怕……（她望着你，眼里泛着泪光）",
      options: [
        {
          label: "（认真地）我会想办法让这辆车停下来。但我也需要你帮忙——坚持住，我们一起离开这里。",
          correct: true
        },
        {
          label: "（别过脸，不想承诺）现在……我自己能不能活下来都还难说。",
          correct: false
        }
      ],
      reaction: {
        good: "（她用力点点头，眼里重新有了一点光）……好。我把知道的都告诉你，拜托了……",
        bad: "（她眼里闪过一丝失落，缓缓别过头去）……嗯。随你吧。"
      }
    }
  ];

  function createEl(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text != null) element.textContent = text;
    return element;
  }

  function run(context) {
    // 无 DOM（自动化测试）时直接跳过画面，视为无结算。
    if (!context.stage) return Promise.resolve(null);

    const stage = context.stage;
    const root = createEl("div", "mg-negotiation-root");
    stage.append(root);

    // 中央背景（整幅铺满，位于最底层）。
    const background = createEl("div", "mg-negotiation-bg");
    background.style.backgroundImage = `url("${BACKGROUND_IMAGE}")`;
    root.append(background);

    // 左右人物立绘。
    const left = createEl("div", "mg-negotiation-side mg-negotiation-side-left");
    const crewImage = createEl("img", "mg-negotiation-portrait");
    crewImage.src = CREW_PORTRAIT;
    crewImage.alt = "乘务员";
    left.append(crewImage);
    root.append(left);

    const right = createEl("div", "mg-negotiation-side mg-negotiation-side-right");
    const pcImage = createEl("img", "mg-negotiation-portrait");
    pcImage.src = PC_PORTRAIT;
    pcImage.alt = "你";
    right.append(pcImage);
    root.append(right);

    // 中央交互区：轮次指示 + 对话记录（聊天式自动上滚）+ 选项。
    const center = createEl("div", "mg-negotiation-center");
    const roundIndicator = createEl("div", "mg-negotiation-round");
    const history = createEl("div", "mg-negotiation-history");
    history.setAttribute("aria-live", "polite");
    const optionsBox = createEl("div", "mg-negotiation-options");
    center.append(roundIndicator, history, optionsBox);
    root.append(center);

    function addLine(container, speaker, text) {
      const line = createEl("p", "mg-negotiation-line");
      const name = createEl("span", "mg-negotiation-speaker", speaker);
      name.classList.add(speaker === "你" ? "mg-negotiation-speaker-pc" : "mg-negotiation-speaker-crew");
      line.append(name, document.createTextNode(`：${text}`));
      container.append(line);
      return line;
    }

    let correctCount = 0;
    let currentRound = 0;
    let resolved = false;
    let resolveFinish = null;
    const finished = new Promise((resolve) => { resolveFinish = resolve; });

    // 正确 +30%、错误 +10%；三轮后 = 30*正确 + 10*错误。
    function computeBonus() {
      return 30 * correctCount + 10 * (ROUNDS.length - correctCount);
    }

    function renderOptions() {
      optionsBox.replaceChildren();
      const round = ROUNDS[currentRound];
      if (!round) return;
      let firstButton = null;
      for (const option of round.options) {
        const button = createEl("button", "mg-negotiation-option", option.label);
        button.type = "button";
        button.addEventListener("click", () => choose(option));
        optionsBox.append(button);
        if (!firstButton) firstButton = button;
      }
      firstButton?.focus();
    }

    // 新的一轮：把乘务员的提问追加进对话记录（自动上滚到最新一行），并渲染两个选项。
    function showRound() {
      const round = ROUNDS[currentRound];
      if (!round) return;
      roundIndicator.textContent = `第 ${currentRound + 1} / ${ROUNDS.length} 轮`;
      addLine(history, round.speaker, round.prompt);
      history.scrollTop = history.scrollHeight;
      renderOptions();
    }

    function finish() {
      if (resolved) return;
      resolved = true;
      resolveFinish([{ type: "setFlag", key: "ev014_negotiation_bonus", value: computeBonus() }]);
    }

    async function choose(option) {
      if (resolved || currentRound >= ROUNDS.length) return;
      const round = ROUNDS[currentRound];
      // 玩家的回应与乘务员的反应也逐条追加进对话记录，像聊天软件那样自动上滚。
      addLine(history, "你", option.label);
      addLine(history, round.speaker, option.correct ? round.reaction.good : round.reaction.bad);
      history.scrollTop = history.scrollHeight;
      if (option.correct) correctCount += 1;
      currentRound += 1;
      if (currentRound >= ROUNDS.length) {
        // 稍作停顿让玩家看清最后一轮乘务员的反应，再关闭小游戏回到事件流程。
        await context.wait(800);
        finish();
        return;
      }
      showRound();
    }

    // 提前退出：交涉中断，加成记为 0；若已在最后一轮作答后退出，则按已取得的实际加成结算。
    context.onQuit(() => {
      if (resolved) return null;
      resolved = true;
      const bonus = currentRound >= ROUNDS.length ? computeBonus() : 0;
      return [{ type: "setFlag", key: "ev014_negotiation_bonus", value: bonus }];
    });

    // 收尾：本模块不挂全局监听，只需移除自绘根节点（宿主关闭时整个窗口元素也会被移除）。
    context.registerCleanup(() => {
      root.remove();
    });

    showRound();
    return finished;
  }

  Game.Minigames.register("crew_negotiation", {
    title: "安抚与交涉",
    run
  });
})(window.TrainGame);
