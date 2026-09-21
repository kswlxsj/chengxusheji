function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function (Game) {
  "use strict";

  // 检定注册表：游戏内所有检定的唯一索引。
  // - 每个检定返回非负整数下标，或 { index, grade }；grade 用于可选大成功/大失败分支。
  // - context 与自定义动作一致（state/ui/items/attributes/skills/wait/throwIfCancelled 等）。
  // - outcomes 为事件里传来的结果事件列表；函数只返回列表下标（0..outcomes.length-1），
  //   由事件引擎校验后跳转；outcomes 为空时函数只做副作用、返回值被忽略。
  // - 依赖 Game.Registry（src/events.js 导出），因此 dice.js 必须在 events.js 之后加载。
  var dice = new Game.Registry("检定");
  function registerDice(id, fn) {
    dice.register(id, fn);
  }
  Game.Dice = dice;
  var DEFAULT_THRESHOLD = 14;
  function rollDie(sides) {
    return Math.floor(Math.random() * Math.max(1, sides)) + 1;
  }
  function rollDice(count, sides) {
    var bonus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var rolls = [];
    var total = Number(bonus) || 0;
    for (var index = 0; index < Math.max(0, count); index += 1) {
      var roll = rollDie(sides);
      rolls.push(roll);
      total += roll;
    }
    return {
      rolls: rolls,
      total: total
    };
  }
  function attributeName(context, attribute) {
    var _context$attributes$g;
    return ((_context$attributes$g = context.attributes.get(attribute)) === null || _context$attributes$g === void 0 ? void 0 : _context$attributes$g.name) || attribute;
  }

  // 先显示算式，过一会再显示“成功/失败”。
  // 由 DiceRollWindow.roll 在同一窗口内完成，动画只播一遍。
  function showDiceRollAnimation(_x, _x2, _x3, _x4) {
    return _showDiceRollAnimation.apply(this, arguments);
  } // 标准 2d6 属性检定：骰点和 + 属性值 >= 14。双6必定大成功，双1必定大失败。
  function _showDiceRollAnimation() {
    _showDiceRollAnimation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(context, rollValues, success, detailText) {
      var _context$ui;
      var grade,
        outcomeText,
        diceWindow,
        wait,
        _args0 = arguments;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            grade = _args0.length > 4 && _args0[4] !== undefined ? _args0[4] : null;
            outcomeText = _args0.length > 5 && _args0[5] !== undefined ? _args0[5] : null;
            diceWindow = (_context$ui = context.ui) === null || _context$ui === void 0 ? void 0 : _context$ui.dice;
            if (!(diceWindow && typeof diceWindow.roll === "function")) {
              _context0.n = 2;
              break;
            }
            wait = typeof context.wait === "function" ? context.wait : function (milliseconds) {
              return Game.delay(milliseconds);
            };
            _context0.n = 1;
            return diceWindow.roll({
              values: Array.isArray(rollValues) ? rollValues : null,
              value: Number.isInteger(rollValues) ? rollValues : null,
              success: success,
              grade: grade,
              text: detailText,
              outcomeText: outcomeText || (grade === "criticalSuccess" ? "大成功" : grade === "criticalFailure" ? "大失败" : success ? "成功" : "失败"),
              wait: wait
            });
          case 1:
            return _context0.a(2);
          case 2:
            _context0.n = 3;
            return context.ui.inspect.show({
              title: grade === "criticalSuccess" ? "检定大成功" : grade === "criticalFailure" ? "检定大失败" : success ? "检定成功" : "检定失败",
              text: detailText
            });
          case 3:
            return _context0.a(2);
        }
      }, _callee0);
    }));
    return _showDiceRollAnimation.apply(this, arguments);
  }
  function attrCheck(attribute) {
    var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_THRESHOLD;
    return /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(context) {
        var base, _rollDice, rolls, rollTotal, criticalSuccess, criticalFailure, success, grade, detail;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              base = context.state.getAttribute(attribute);
              _rollDice = rollDice(2, 6), rolls = _rollDice.rolls, rollTotal = _rollDice.total;
              criticalSuccess = rolls.every(function (roll) {
                return roll === 6;
              });
              criticalFailure = rolls.every(function (roll) {
                return roll === 1;
              });
              success = criticalSuccess || !criticalFailure && rollTotal + base >= threshold;
              grade = criticalSuccess ? "criticalSuccess" : criticalFailure ? "criticalFailure" : null;
              detail = "".concat(attributeName(context, attribute), "\uFF1A\u63B7\u51FA ").concat(rolls.join(" + "), " + \u5C5E\u6027 ").concat(base, " = ").concat(rollTotal + base, "\n\u9700\u8981\u8FBE\u5230 ").concat(threshold, "\u3002");
              _context.n = 1;
              return showDiceRollAnimation(context, rolls, success, detail, grade);
            case 1:
              return _context.a(2, grade ? {
                index: success ? 0 : 1,
                grade: grade
              } : success ? 0 : 1);
          }
        }, _callee);
      }));
      return function (_x5) {
        return _ref.apply(this, arguments);
      };
    }();
  }
  function averageAttrCheck(attributes) {
    var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
    return /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(context) {
        var values, average, _rollDice2, rolls, rollTotal, criticalSuccess, criticalFailure, success, grade, names, detail;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              values = attributes.map(function (attribute) {
                return context.state.getAttribute(attribute);
              });
              average = Math.floor(values.reduce(function (sum, value) {
                return sum + value;
              }, 0) / values.length);
              _rollDice2 = rollDice(2, 6), rolls = _rollDice2.rolls, rollTotal = _rollDice2.total;
              criticalSuccess = rolls.every(function (roll) {
                return roll === 6;
              });
              criticalFailure = rolls.every(function (roll) {
                return roll === 1;
              });
              success = criticalSuccess || !criticalFailure && rollTotal + average >= threshold;
              grade = criticalSuccess ? "criticalSuccess" : criticalFailure ? "criticalFailure" : null;
              names = attributes.map(function (attribute) {
                return attributeName(context, attribute);
              }).join(" + ");
              detail = "".concat(names, "\uFF1A\u5E73\u5747\u503C ").concat(average, "\uFF08").concat(values.join("、"), "\uFF09\uFF0C\u63B7\u51FA ").concat(rolls.join(" + "), "\uFF0C\u5408\u8BA1 ").concat(rollTotal + average, "\n\u9700\u8981\u8FBE\u5230 ").concat(threshold, "\u3002");
              _context2.n = 1;
              return showDiceRollAnimation(context, rolls, success, detail, grade);
            case 1:
              return _context2.a(2, grade ? {
                index: success ? 0 : 1,
                grade: grade
              } : success ? 0 : 1);
          }
        }, _callee2);
      }));
      return function (_x6) {
        return _ref2.apply(this, arguments);
      };
    }();
  }

  // 投瓶捷径：SAN 只按最多 10 点参与平均，避免无上限 SAN 让检定失去失败可能。
  // 均衡属性 8/8 时，除双1必败外，2d6 仅在合计为3时失败，失败率为 3/36≈8.3%。
  function bottleThrowCheck() {
    return /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(context) {
        var constitution, san, cappedSan, average, _rollDice3, rolls, rollTotal, criticalSuccess, criticalFailure, success, grade, sanDetail, detail;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              constitution = context.state.getAttribute("constitution");
              san = context.state.getAttribute("san");
              cappedSan = Math.min(san, 10);
              average = Math.floor((constitution + cappedSan) / 2);
              _rollDice3 = rollDice(2, 6), rolls = _rollDice3.rolls, rollTotal = _rollDice3.total;
              criticalSuccess = rolls.every(function (roll) {
                return roll === 6;
              });
              criticalFailure = rolls.every(function (roll) {
                return roll === 1;
              });
              success = criticalSuccess || !criticalFailure && rollTotal + average >= 12;
              grade = criticalSuccess ? "criticalSuccess" : criticalFailure ? "criticalFailure" : null;
              sanDetail = san === cappedSan ? String(san) : "".concat(san, "\uFF08\u6309 ").concat(cappedSan, " \u8BA1\uFF09");
              detail = "\u6295\u63B7\uFF1A\u4F53\u8D28 ".concat(constitution, " + SAN ").concat(sanDetail, "\uFF0C\u5E73\u5747\u503C ").concat(average) + "\n\u63B7\u51FA ".concat(rolls.join(" + "), "\uFF0C\u5408\u8BA1 ").concat(rollTotal + average, "\uFF1B\u9700\u8981\u8FBE\u5230 12\u3002");
              _context3.n = 1;
              return showDiceRollAnimation(context, rolls, success, detail, grade);
            case 1:
              return _context3.a(2, grade ? {
                index: success ? 0 : 1,
                grade: grade
              } : success ? 0 : 1);
          }
        }, _callee3);
      }));
      return function (_x7) {
        return _ref3.apply(this, arguments);
      };
    }();
  }

  // SAN 类检定固定按单颗 d6 判定：4~6 成功、1~3 失败，完全不读取当前 SAN。
  // 损失为整数（固定扣）或 { count, sides, bonus }（掷骰扣）；实际变化由统一属性提示显示。
  function sanCheck(attribute, passLoss, failLoss) {
    var apply = function apply(context, loss) {
      if (!loss) return;
      var amount = 0;
      if (Number.isInteger(loss)) {
        amount = loss;
      } else {
        var result = rollDice(loss.count, loss.sides, loss.bonus);
        amount = result.total;
      }
      if (amount <= 0) return;
      context.modifyAttribute(attribute, -amount);
    };
    return /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(context) {
        var roll, success, detail;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              roll = rollDie(6);
              success = roll >= 4;
              detail = "".concat(attributeName(context, attribute), "\u68C0\u5B9A\uFF1A\u63B7\u51FA ").concat(roll, "\n\u9700\u8981\u8FBE\u5230 4\u3002");
              _context4.n = 1;
              return showDiceRollAnimation(context, roll, success, detail);
            case 1:
              apply(context, success ? passLoss : failLoss);
              return _context4.a(2, success ? 0 : 1);
          }
        }, _callee4);
      }));
      return function (_x8) {
        return _ref4.apply(this, arguments);
      };
    }();
  }
  function sanLossByRoll(attribute) {
    return /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(context) {
        var roll, loss, success, detail;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              roll = rollDie(6);
              loss = roll >= 4 ? 0 : 4 - roll;
              success = loss === 0;
              detail = "".concat(attributeName(context, attribute), "\u68C0\u5B9A\uFF1A\u63B7\u51FA ").concat(roll, "\n").concat(loss ? "\u635F\u5931 ".concat(loss, " \u70B9") : "没有损失", "\u3002");
              _context5.n = 1;
              return showDiceRollAnimation(context, roll, success, detail);
            case 1:
              if (loss) context.modifyAttribute(attribute, -loss);
              return _context5.a(2, success ? 0 : 1);
          }
        }, _callee5);
      }));
      return function (_x9) {
        return _ref5.apply(this, arguments);
      };
    }();
  }
  function sanLossByFace(attribute, losses) {
    return /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(context) {
        var roll, loss, detail;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              roll = rollDie(6);
              loss = losses[roll - 1] || 0;
              detail = "".concat(attributeName(context, attribute), "\u68C0\u5B9A\uFF1A\u63B7\u51FA ").concat(roll, "\n").concat(loss ? "\u635F\u5931 ".concat(loss, " \u70B9") : "没有损失", "\u3002");
              _context6.n = 1;
              return showDiceRollAnimation(context, roll, loss === 0, detail, null, loss ? "SAN -".concat(loss) : "SAN 未减少");
            case 1:
              if (loss) context.modifyAttribute(attribute, -loss);
              return _context6.a(2, loss === 0 ? 0 : 1);
          }
        }, _callee6);
      }));
      return function (_x0) {
        return _ref6.apply(this, arguments);
      };
    }();
  }
  function innerExitSanLoss(attribute) {
    return /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(context) {
        var roll, loss, detail;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              roll = rollDie(6);
              loss = roll === 1 ? 2 : roll <= 4 ? 1 : 0;
              detail = "\u79BB\u5F00\u91CC\u4E16\u754C\uFF1A\u63B7\u51FA ".concat(roll, "\n").concat(loss ? "".concat(attributeName(context, attribute), " \u635F\u5931 ").concat(loss, " \u70B9") : "".concat(attributeName(context, attribute), "\u6CA1\u6709\u635F\u5931"), "\u3002");
              _context7.n = 1;
              return showDiceRollAnimation(context, roll, loss === 0, detail, null, loss ? "SAN -".concat(loss) : "SAN 未减少");
            case 1:
              if (loss) context.modifyAttribute(attribute, -loss);
              return _context7.a(2, loss === 0 ? 0 : 1);
          }
        }, _callee7);
      }));
      return function (_x1) {
        return _ref7.apply(this, arguments);
      };
    }();
  }

  // ==== 本批剧本候选检定 ====

  registerDice("ev001_insight_01", attrCheck("insight"));
  registerDice("ev002_insight_01", attrCheck("insight"));
  registerDice("ev004_insight_01", attrCheck("insight"));
  registerDice("ev008_insight_01", attrCheck("insight"));
  registerDice("ev007_education_01", attrCheck("education"));
  registerDice("ev011_insight_01", attrCheck("insight"));
  // 乘务员救治共三次尝试：前两次更严苛，后续紧急补救略放宽。
  // 默认教育 8 时，三次累计救活率约为 70%。
  registerDice("ev013_education_01", attrCheck("education", 17));
  registerDice("ev020_education_01", attrCheck("education", 16));
  registerDice("ev021_education_insight_01", averageAttrCheck(["education", "insight"], 15));
  registerDice("ev016_constitution_01", attrCheck("constitution"));
  registerDice("ev504_insight_01", attrCheck("insight"));
  registerDice("ev027_constitution_01", attrCheck("constitution"));
  registerDice("ev027_constitution_02", attrCheck("constitution"));
  registerDice("ev027_constitution_03", attrCheck("constitution"));
  // Clicker 初见：1~2 扣2、3~4 扣1、5~6 不扣。
  registerDice("ev026_san_01", sanLossByFace("san", [2, 2, 1, 1, 0, 0]));
  // Clicker 潜行：1~3 扣2、4~5 扣1、6 不扣；1/6 分别是大失败/大成功。
  registerDice("ev027_san_01", sanLossByFace("san", [2, 2, 2, 1, 1, 0]));
  registerDice("ev027_san_02", sanLossByFace("san", [2, 2, 2, 1, 1, 0]));
  registerDice("ev027_san_03", sanLossByFace("san", [2, 2, 2, 1, 1, 0]));
  registerDice("ev028_throw_01", bottleThrowCheck());
  registerDice("ev008_san_01", sanCheck("san", 1, {
    count: 1,
    sides: 6
  }));
  registerDice("ev010_san_01", sanCheck("san", 0, 1));
  registerDice("ev011_san_01", sanCheck("san", 0, 1));

  // ==== 游戏内检定条目（编号必须全局唯一、长期稳定，被 events.json 的 check.dice 引用）====

  // E_005：6 号车厢开门前的灵感检定（成败走不同分支）。
  registerDice("ev005_insight_01", attrCheck("insight"));

  // E_006A/B：只负责 SAN 判定与损失；结果叙事由 events.json 的 outcomes 路由。
  registerDice("ev006a_san_01", sanCheck("san", 0, 1));
  registerDice("ev006b_san_01", sanCheck("san", 1, {
    count: 1,
    sides: 4
  }));
  registerDice("ev012_san_01", sanLossByRoll("san"));
  registerDice("ev_fake01_exit_san_01", innerExitSanLoss("san"));

  // E_014：交涉小游戏的最终检定，使用小游戏写入的加成决定剧情分支。
  registerDice("ev014_negotiation_final_01", /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(context) {
      var bonus, rate, roll, success, detail;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            bonus = Number(context.state.flags.ev014_negotiation_bonus) || 0;
            rate = Math.min(100, 40 + bonus);
            roll = Math.floor(Math.random() * 100) + 1;
            success = roll <= rate;
            detail = "\u5B89\u629A\u4E0E\u4EA4\u6D89\uFF1A\u57FA\u7840\u6210\u529F\u7387 40% + \u4EA4\u6D89\u52A0\u6210 ".concat(bonus, "% = ").concat(rate, "%\u3002") + "\u63B7\u51FA ".concat(roll, "%\uFF0C\u9700\u8981\u4E0D\u9AD8\u4E8E ").concat(rate, "%\u3002");
            _context8.n = 1;
            return showDiceRollAnimation(context, null, success, detail);
          case 1:
            return _context8.a(2, success ? 0 : 1);
        }
      }, _callee8);
    }));
    return function (_x10) {
      return _ref8.apply(this, arguments);
    };
  }());

  // E_0008：收音机小游戏只写入成功标记，这里把标记转换成成功/失败剧情分支。
  registerDice("ev0008_radio_tuning", /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(context) {
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.n) {
          case 0:
            return _context9.a(2, context.state.flags.ev0008_radio_tuned ? 0 : 1);
        }
      }, _callee9);
    }));
    return function (_x11) {
      return _ref9.apply(this, arguments);
    };
  }());
})(window.TrainGame);
