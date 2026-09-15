(function (Game) {
  "use strict";

  if (Game.Auth.redirectAuthenticated()) return;

  const form = document.querySelector("#register-form");
  const error = document.querySelector("#auth-error");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    error.textContent = "";
    const data = new FormData(form);
    const password = data.get("password");
    if (password !== data.get("confirmPassword")) {
      error.textContent = "两次输入的密码不一致";
      return;
    }

    const registerResult = Game.Auth.register(data.get("username"), password);
    if (!registerResult.ok) {
      error.textContent = registerResult.message;
      return;
    }
    Game.Auth.rememberRegistration(registerResult.username);
    window.location.replace(new URL("index.html", window.location.href));
  });
})(window.TrainGame);
