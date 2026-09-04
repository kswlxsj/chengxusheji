/* ==========================================================================
   统一返回按钮（书签式）附加行为：
   - 根目录汇总入口页（GroupIntro/index.html）使用 data-noop，作为游戏内
     “小组介绍”页：有来源页面（如从游戏主页进入）时原路返回上一步；
     直接打开该页时则回退到游戏主页 home.html（href 已提供无 JS 兜底）。
   - 各成员子页直接使用指向 ../index.html 的普通链接，本脚本不干预。
   - 进入页面的“展开约 1 秒后自动收起”由 back-button.css 的纯 CSS 动画实现。
   ========================================================================== */
(function () {
  var btn = document.querySelector(".group-back__btn[data-noop]");
  if (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (document.referrer) {
        window.history.back(); // 从上一页（通常为游戏主页）进入时原路返回
      } else {
        window.location.href = "../home.html"; // 直接打开时回退到游戏主页
      }
    });
  }
})();
