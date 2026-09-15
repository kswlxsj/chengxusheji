// ConfirmDialog —— 存档页（选择槽位 / 存档管理）共用的页面内确认框：
// 用与游戏本体一致的深色面板 + 金色描边样式代替浏览器原生 window.confirm，
// 只负责“标题 + 按钮”的询问，不依赖游戏数据，也不接管页面导航。
(function (Game) {
  "use strict";

  // 确认框挂载点：页面里预置的层容器（缺失时回退到 body）。
  const LAYER_ID = "confirm-layer";
  // 遮罩与面板类名，样式定义在 main.css 第 6 节（存档页）。
  const DEFAULT_BACKDROP_CLASS = "confirm-backdrop";
  const DEFAULT_WINDOW_CLASS = "confirm-dialog-window";

  class ConfirmDialog {
    constructor() {
      this.root = null;
      this.backdropClass = DEFAULT_BACKDROP_CLASS;
      this.windowClass = DEFAULT_WINDOW_CLASS;
      this.backdrop = null;
      this.resolve = null;
      this.previousFocus = null;
      this.onKeydown = (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          this.close(false);
        }
      };
    }

    isOpen() {
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
    ask({ title, confirmLabel = "确定", cancelLabel = "取消", backdropClass, windowClass }) {
      // 连点或重复调用时先关掉上一次，避免多层遮罩堆叠（与 MenuWindow 的策略一致）。
      this.close(false);
      this.previousFocus = document.activeElement;

      const root = this.resolveRoot();
      const backdrop = document.createElement("div");
      backdrop.className = ["modal-backdrop", backdropClass || this.backdropClass].join(" ");
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) this.close(false);
      });

      const panel = document.createElement("section");
      panel.className = ["game-window", windowClass || this.windowClass].join(" ");
      // 与 MenuWindow 同构：面板内再放一层 .menu-content 承载标题与按钮，复用既有布局。
      const content = document.createElement("div");
      content.className = "menu-content";
      const heading = document.createElement("h1");
      heading.textContent = title || "请确认";
      const actions = document.createElement("div");
      actions.className = "menu-actions";
      const cancelButton = this.makeButton(cancelLabel, false);
      const confirmButton = this.makeButton(confirmLabel || "确定", true);
      actions.append(cancelButton, confirmButton);
      content.append(heading, actions);
      panel.append(content);
      backdrop.append(panel);
      root.append(backdrop);

      this.backdrop = backdrop;
      document.addEventListener("keydown", this.onKeydown, true);
      // 默认聚焦确认按钮；单按钮模式下退化为聚焦唯一按钮。
      const focusTarget = confirmButton.hidden ? cancelButton : confirmButton;
      focusTarget.focus();

      return new Promise((resolve) => {
        this.resolve = resolve;
      });
    }

    // 生成确认框按钮：确认按钮结算 true，取消按钮结算 false；取消按钮文字留空时隐藏（单按钮模式）。
    makeButton(label, isConfirm) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = isConfirm ? "confirm-dialog-confirm" : "confirm-dialog-cancel";
      button.textContent = label;
      if (!isConfirm && !label) button.hidden = true;
      button.addEventListener("click", () => this.close(isConfirm));
      return button;
    }

    /**
     * 关闭确认框并结算等待中的 Promise；未打开或重复调用时为无操作。
     * @param {boolean} [value=false] - 结算值，true 表示已确认。
     */
    close(value = false) {
      if (this.backdrop) this.backdrop.remove();
      this.backdrop = null;
      document.removeEventListener("keydown", this.onKeydown, true);
      const resolve = this.resolve;
      this.resolve = null;
      if (resolve) resolve(value);
      // 关闭后把焦点还给触发按钮，键盘玩家可以接着操作同一个槽位卡片。
      if (this.previousFocus instanceof HTMLElement && this.previousFocus.isConnected) {
        this.previousFocus.focus();
      }
      this.previousFocus = null;
    }

    resolveRoot() {
      if (!this.root || !this.root.isConnected) {
        this.root = document.getElementById(LAYER_ID) || document.body;
      }
      return this.root;
    }
  }

  // 对外暴露的模块接口：共享实例（dialog）+ ask / close / isOpen
  Game.ConfirmDialog = {
    dialog: new ConfirmDialog(),

    ask(config) {
      return this.dialog.ask(config);
    },

    close(value = false) {
      this.dialog.close(value);
    },

    isOpen() {
      return this.dialog.isOpen();
    }
  };
})(window.TrainGame);
