(function (Game) {
  "use strict";

  if (Game.Auth.redirectAuthenticated()) return;

  const form = document.querySelector("#login-form");
  const usernameInput = document.querySelector("#login-username");
  const error = document.querySelector("#auth-error");
  const registeredUsername = Game.Auth.consumeRegistration();
  if (registeredUsername) {
    usernameInput.value = registeredUsername;
    document.querySelector("#login-password").focus();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    error.textContent = "";
    const data = new FormData(form);
    const loginResult = Game.Auth.login(data.get("username"), data.get("password"));
    if (!loginResult.ok) {
      error.textContent = loginResult.message;
      return;
    }
    window.location.replace(new URL("home.html", window.location.href));
  });
})(window.TrainGame);
