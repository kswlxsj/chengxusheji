function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function (Game) {
  "use strict";

  // 乘务员安抚与交涉小游戏：三轮 × 每轮两个选项，正确/错误影响后续最终检定的成功率加成。
  // - 与 webgl3d_demo 一样只在顶层做注册（编译器会在 node:vm 里加载本文件收集编号），
  //   所有 DOM 操作延迟到 run()，保证无 DOM 环境（自动化测试）下加载安全。
  // - 玩法：每轮乘务员抛出一个问题，玩家在两个回应里选一个；正确选项（内部标记按“安抚得当”
  //   制定，不向玩家明示正确与否）每次 +15%，错误选项不提供加成。三轮结束后按
  //   bonus = 15*正确数结算，范围 0~45。
  // - 结果只通过结算动作列表表达：setFlag ev014_negotiation_bonus = bonus。
  //   提前点“退出小游戏”视为交涉中断，加成记为 0（事件引擎随后仍会执行最终检定）。
  // - 布局按需求示意图：左右人物立绘、中央背景、顶部对话记录、中部当前问题与两个选项。
  var BACKGROUND_IMAGE = "assets/Image/Scene/Background/crew-negotiation.ie.jpg";
  var CREW_PORTRAIT = "assets/Image/Portrait/conductor-crying.ie.png";
  var PC_PORTRAIT = "assets/Image/Portrait/player.ie.png";

  // 占位剧情数据：每轮一个“乘务员提问”，玩家在两个回应里二选一。
  // correct 为内部标记（true=安抚得当），不展示给玩家；reaction 为乘务员对你回应的反应。
  // 注意：只在此逐步建立信任与获取部分信息，不提前泄露“怪物对声音敏感”这一关键线索
  // （那是最终检定成功后在 E_014_TALK_S 里给出的奖励，避免剧情重复）。
  var ROUNDS = [{
    speaker: "乘务员",
    prompt: "呃……好痛……我是不是要死了……",
    options: [{
      label: "不会的。你先别乱动，我会陪着你。",
      correct: true
    }, {
      label: "先别管这些！快说，那些怪物到底是什么？！",
      correct: false
    }],
    reaction: {
      good: "……嗯……我是这里的乘务员……谢谢你……",
      bad: "我……我不知道……求你别逼我……"
    }
  }, {
    speaker: "乘务员",
    prompt: "那些东西……太可怕了。我一闭上眼，就全是它们的影子……我不想再回忆了。",
    options: [{
      label: "我明白。你只要记起一点点就好——它们是朝你扑过来的，还是很远就发现了你？",
      correct: true
    }, {
      label: "你必须说清楚！到底有多少只？它们到底从哪儿来的？",
      correct: false
    }],
    reaction: {
      good: "有……有两只很高的东西，动作特别快。它们好像是从车厢那头突然扑过来的……",
      bad: "别再问了……我真的、真的记不清了……"
    }
  }, {
    speaker: "乘务员",
    prompt: "你……你不会也丢下我吧？我好害怕……",
    options: [{
      label: "我会想办法让这辆车停下来。但我也需要你帮忙——坚持住，我们一起离开这里。",
      correct: true
    }, {
      label: "现在……我自己能不能活下来都还难说。",
      correct: false
    }],
    reaction: {
      good: "……好。我把知道的都告诉你，拜托了……",
      bad: "……嗯。随你吧。"
    }
  }];
  function createEl(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (text != null) element.textContent = text;
    return element;
  }
  function run(context) {
    // 无 DOM（自动化测试）时直接跳过画面，视为无结算。
    if (!context.stage) return Promise.resolve(null);
    var stage = context.stage;
    var root = createEl("div", "mg-negotiation-root");
    stage.append(root);

    // 中央背景（整幅铺满，位于最底层）。
    var background = createEl("div", "mg-negotiation-bg");
    background.style.backgroundImage = "url(\"".concat(BACKGROUND_IMAGE, "\")");
    root.append(background);

    // 左右人物立绘。
    var left = createEl("div", "mg-negotiation-side mg-negotiation-side-left");
    var crewImage = createEl("img", "mg-negotiation-portrait");
    crewImage.src = CREW_PORTRAIT;
    crewImage.alt = "乘务员";
    left.append(crewImage);
    root.append(left);
    var right = createEl("div", "mg-negotiation-side mg-negotiation-side-right");
    var pcImage = createEl("img", "mg-negotiation-portrait");
    pcImage.src = PC_PORTRAIT;
    pcImage.alt = "你";
    right.append(pcImage);
    root.append(right);

    // 中央交互区：轮次指示 + 对话记录（聊天式自动上滚）+ 选项。
    var center = createEl("div", "mg-negotiation-center");
    var roundIndicator = createEl("div", "mg-negotiation-round");
    var history = createEl("div", "mg-negotiation-history");
    history.setAttribute("aria-live", "polite");
    var optionsBox = createEl("div", "mg-negotiation-options");
    center.append(roundIndicator, history, optionsBox);
    root.append(center);
    function addLine(container, speaker, text) {
      var line = createEl("p", "mg-negotiation-line");
      var name = createEl("span", "mg-negotiation-speaker", speaker);
      name.classList.add(speaker === "你" ? "mg-negotiation-speaker-pc" : "mg-negotiation-speaker-crew");
      line.append(name, document.createTextNode("\uFF1A".concat(text)));
      container.append(line);
      return line;
    }
    var correctCount = 0;
    var currentRound = 0;
    var resolved = false;
    var resolveFinish = null;
    var finished = new Promise(function (resolve) {
      resolveFinish = resolve;
    });

    // 每个恰当回应提供 15% 加成；最终检定的四档成功率为 40%/55%/70%/85%。
    function computeBonus() {
      return 15 * correctCount;
    }
    function renderOptions() {
      var _firstButton;
      optionsBox.replaceChildren();
      var round = ROUNDS[currentRound];
      if (!round) return;
      var firstButton = null;
      var _iterator = _createForOfIteratorHelper(round.options),
        _step;
      try {
        var _loop = function _loop() {
          var option = _step.value;
          var button = createEl("button", "mg-negotiation-option", option.label);
          button.type = "button";
          button.addEventListener("click", function () {
            return choose(option);
          });
          optionsBox.append(button);
          if (!firstButton) firstButton = button;
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      (_firstButton = firstButton) === null || _firstButton === void 0 || _firstButton.focus();
    }

    // 新的一轮：把乘务员的提问追加进对话记录（自动上滚到最新一行），并渲染两个选项。
    function showRound() {
      var round = ROUNDS[currentRound];
      if (!round) return;
      roundIndicator.textContent = "\u7B2C ".concat(currentRound + 1, " / ").concat(ROUNDS.length, " \u8F6E");
      addLine(history, round.speaker, round.prompt);
      history.scrollTop = history.scrollHeight;
      renderOptions();
    }
    function finish() {
      if (resolved) return;
      resolved = true;
      resolveFinish([{
        type: "setFlag",
        key: "ev014_negotiation_bonus",
        value: computeBonus()
      }, {
        type: "setFlag",
        key: "crew_04_left_seated",
        value: true
      }]);
    }
    function choose(_x) {
      return _choose.apply(this, arguments);
    } // 提前退出：交涉中断，加成记为 0；若已在最后一轮作答后退出，则按已取得的实际加成结算。
    function _choose() {
      _choose = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(option) {
        var round;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(resolved || currentRound >= ROUNDS.length)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              round = ROUNDS[currentRound]; // 玩家的回应与乘务员的反应也逐条追加进对话记录，像聊天软件那样自动上滚。
              addLine(history, "你", option.label);
              addLine(history, round.speaker, option.correct ? round.reaction.good : round.reaction.bad);
              history.scrollTop = history.scrollHeight;
              if (option.correct) correctCount += 1;
              currentRound += 1;
              if (!(currentRound >= ROUNDS.length)) {
                _context.n = 3;
                break;
              }
              _context.n = 2;
              return context.wait(800);
            case 2:
              finish();
              return _context.a(2);
            case 3:
              showRound();
            case 4:
              return _context.a(2);
          }
        }, _callee);
      }));
      return _choose.apply(this, arguments);
    }
    context.onQuit(function () {
      if (resolved) return null;
      resolved = true;
      var bonus = currentRound >= ROUNDS.length ? computeBonus() : 0;
      return [{
        type: "setFlag",
        key: "ev014_negotiation_bonus",
        value: bonus
      }, {
        type: "setFlag",
        key: "crew_04_left_seated",
        value: true
      }];
    });

    // 收尾：本模块不挂全局监听，只需移除自绘根节点（宿主关闭时整个窗口元素也会被移除）。
    context.registerCleanup(function () {
      root.remove();
    });
    showRound();
    return finished;
  }
  Game.Minigames.register("crew_negotiation", {
    title: "安抚与交涉",
    run: run
  });
})(window.TrainGame);
