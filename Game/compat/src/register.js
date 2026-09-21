(function (Game) {
  "use strict";

  if (Game.Auth.redirectAuthenticated()) return;
  var form = document.querySelector("#register-form");
  var error = document.querySelector("#auth-error");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    error.textContent = "";
    var data = new FormData(form);
    var password = data.get("password");
    if (password !== data.get("confirmPassword")) {
      error.textContent = "两次输入的密码不一致";
      return;
    }
    var registerResult = Game.Auth.register(data.get("username"), password);
    if (!registerResult.ok) {
      error.textContent = registerResult.message;
      return;
    }
    Game.Auth.rememberRegistration(registerResult.username);
    window.location.replace(new URL("index.html", window.location.href));
  });
})(window.TrainGame);
