function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// ConfirmDialog —— 存档页（选择槽位 / 存档管理）共用的页面内确认框：
// 用与游戏本体一致的深色面板 + 金色描边样式代替浏览器原生 window.confirm，
// 只负责“标题 + 按钮”的询问，不依赖游戏数据，也不接管页面导航。
(function (Game) {
  "use strict";

  // 确认框挂载点：页面里预置的层容器（缺失时回退到 body）。
  var LAYER_ID = "confirm-layer";
  // 遮罩与面板类名，样式定义在 main.css 第 6 节（存档页）。
  var DEFAULT_BACKDROP_CLASS = "confirm-backdrop";
  var DEFAULT_WINDOW_CLASS = "confirm-dialog-window";
  var ConfirmDialog = /*#__PURE__*/function () {
    function ConfirmDialog() {
      var _this = this;
      _classCallCheck(this, ConfirmDialog);
      this.root = null;
      this.backdropClass = DEFAULT_BACKDROP_CLASS;
      this.windowClass = DEFAULT_WINDOW_CLASS;
      this.backdrop = null;
      this.resolve = null;
      this.previousFocus = null;
      this.onKeydown = function (event) {
        if (event.key === "Escape") {
          event.preventDefault();
          _this.close(false);
        }
      };
    }
    return _createClass(ConfirmDialog, [{
      key: "isOpen",
      value: function isOpen() {
        return this.backdrop !== null;
      }

      /**
       * 显示确认框并等待玩家选择。
       * @param {Object} config - 配置对象。
       * @param {string} config.title - 询问文本，使用 textContent 写入。
       * @param {string} [config.confirmLabel="确定"] - 确认按钮文字。
       * @param {string} [config.cancelLabel="取消"] - 取消按钮文字；留空则只显示确认按钮。
       * @param {string} [config.backdropClass] - 覆盖遮罩类名（按需加宽/加深遮罩）。
       * @param {string} [config.windowClass] - 覆盖面板类名。
       * @returns {Promise<boolean>} 确认返回 true；取消、Esc 或点击遮罩返回 false。
       */
    }, {
      key: "ask",
      value: function ask(_ref) {
        var _this2 = this;
        var title = _ref.title,
          _ref$confirmLabel = _ref.confirmLabel,
          confirmLabel = _ref$confirmLabel === void 0 ? "确定" : _ref$confirmLabel,
          _ref$cancelLabel = _ref.cancelLabel,
          cancelLabel = _ref$cancelLabel === void 0 ? "取消" : _ref$cancelLabel,
          backdropClass = _ref.backdropClass,
          windowClass = _ref.windowClass;
        // 连点或重复调用时先关掉上一次，避免多层遮罩堆叠（与 MenuWindow 的策略一致）。
        this.close(false);
        this.previousFocus = document.activeElement;
        var root = this.resolveRoot();
        var backdrop = document.createElement("div");
        backdrop.className = ["modal-backdrop", backdropClass || this.backdropClass].join(" ");
        backdrop.addEventListener("click", function (event) {
          if (event.target === backdrop) _this2.close(false);
        });
        var panel = document.createElement("section");
        panel.className = ["game-window", windowClass || this.windowClass].join(" ");
        // 与 MenuWindow 同构：面板内再放一层 .menu-content 承载标题与按钮，复用既有布局。
        var content = document.createElement("div");
        content.className = "menu-content";
        var heading = document.createElement("h1");
        heading.textContent = title || "请确认";
        var actions = document.createElement("div");
        actions.className = "menu-actions";
        var cancelButton = this.makeButton(cancelLabel, false);
        var confirmButton = this.makeButton(confirmLabel || "确定", true);
        actions.append(cancelButton, confirmButton);
        content.append(heading, actions);
        panel.append(content);
        backdrop.append(panel);
        root.append(backdrop);
        this.backdrop = backdrop;
        document.addEventListener("keydown", this.onKeydown, true);
        // 默认聚焦确认按钮；单按钮模式下退化为聚焦唯一按钮。
        var focusTarget = confirmButton.hidden ? cancelButton : confirmButton;
        focusTarget.focus();
        return new Promise(function (resolve) {
          _this2.resolve = resolve;
        });
      }

      // 生成确认框按钮：确认按钮结算 true，取消按钮结算 false；取消按钮文字留空时隐藏（单按钮模式）。
    }, {
      key: "makeButton",
      value: function makeButton(label, isConfirm) {
        var _this3 = this;
        var button = document.createElement("button");
        button.type = "button";
        button.className = isConfirm ? "confirm-dialog-confirm" : "confirm-dialog-cancel";
        button.textContent = label;
        if (!isConfirm && !label) button.hidden = true;
        button.addEventListener("click", function () {
          return _this3.close(isConfirm);
        });
        return button;
      }

      /**
       * 关闭确认框并结算等待中的 Promise；未打开或重复调用时为无操作。
       * @param {boolean} [value=false] - 结算值，true 表示已确认。
       */
    }, {
      key: "close",
      value: function close() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (this.backdrop) this.backdrop.remove();
        this.backdrop = null;
        document.removeEventListener("keydown", this.onKeydown, true);
        var resolve = this.resolve;
        this.resolve = null;
        if (resolve) resolve(value);
        // 关闭后把焦点还给触发按钮，键盘玩家可以接着操作同一个槽位卡片。
        if (this.previousFocus instanceof HTMLElement && this.previousFocus.isConnected) {
          this.previousFocus.focus();
        }
        this.previousFocus = null;
      }
    }, {
      key: "resolveRoot",
      value: function resolveRoot() {
        if (!this.root || !this.root.isConnected) {
          this.root = document.getElementById(LAYER_ID) || document.body;
        }
        return this.root;
      }
    }]);
  }(); // 对外暴露的模块接口：共享实例（dialog）+ ask / close / isOpen
  Game.ConfirmDialog = {
    dialog: new ConfirmDialog(),
    ask: function ask(config) {
      return this.dialog.ask(config);
    },
    close: function close() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.dialog.close(value);
    },
    isOpen: function isOpen() {
      return this.dialog.isOpen();
    }
  };
})(window.TrainGame);
