/* ==========================================================================
   统一返回按钮（书签式）附加行为：
   - 根目录汇总入口页（GroupIntro/index.html）使用 data-noop：其“返回”按钮
     始终跳回游戏主页 home.html（与 href 指向一致）。不复用浏览器历史回退，
     否则从成员子页回到汇总页后再点“返回”，会退到上一张子页而不是主页。
   - 各成员子页直接使用指向 ../index.html 的普通链接，本脚本不干预。
   - 进入页面的“展开约 1 秒后自动收起”由 back-button.css 的纯 CSS 动画实现。
   ========================================================================== */
(function () {
  var btn = document.querySelector(".group-back__btn[data-noop]");
  if (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      // 汇总页的返回键固定回到游戏主页；无 JS 时由 href 兜底，行为一致。
      window.location.href = btn.href;
    });
  }
})();
