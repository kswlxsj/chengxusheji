(function (Game) {
  "use strict";

  if (Game.Auth.redirectAuthenticated()) return;
  var form = document.querySelector("#login-form");
  var usernameInput = document.querySelector("#login-username");
  var error = document.querySelector("#auth-error");
  var registeredUsername = Game.Auth.consumeRegistration();
  if (registeredUsername) {
    usernameInput.value = registeredUsername;
    document.querySelector("#login-password").focus();
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    error.textContent = "";
    var data = new FormData(form);
    var loginResult = Game.Auth.login(data.get("username"), data.get("password"));
    if (!loginResult.ok) {
      error.textContent = loginResult.message;
      return;
    }
    Game.PageFlow.markHomeOpIntent("login");
    Game.PageFlow.navigate("home", {}, true);
  });
})(window.TrainGame);
