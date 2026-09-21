(function (Game) {
  "use strict";

  var artBySceneId = Object.freeze({
    carriage_02: "assets/Image/Ui/Save/save-silhouette-carriage-02.ie.jpg",
    carriage_03: "assets/Image/Ui/Save/save-silhouette-carriage-03.ie.jpg",
    carriage_04: "assets/Image/Ui/Save/save-silhouette-carriage-04.ie.jpg",
    carriage_05: "assets/Image/Ui/Save/save-silhouette-carriage-05.ie.jpg",
    carriage_06: "assets/Image/Ui/Save/save-silhouette-carriage-06.ie.jpg",
    carriage_07: "assets/Image/Ui/Save/save-silhouette-carriage-07.ie.jpg",
    front_carriage: "assets/Image/Ui/Save/save-silhouette-front-carriage.ie.jpg",
    carriage_inner_01: "assets/Image/Ui/Save/save-silhouette-carriage-inner-01.ie.jpg",
    carriage_inner_02: "assets/Image/Ui/Save/save-silhouette-carriage-inner-02.ie.jpg",
    carriage_fake_01: "assets/Image/Ui/Save/save-silhouette-carriage-fake-01.ie.jpg",
    carriage_fake_02: "assets/Image/Ui/Save/save-silhouette-carriage-fake-02.ie.jpg",
    carriage_fake_03: "assets/Image/Ui/Save/save-silhouette-carriage-fake-03.ie.jpg",
    carriage_fake_04: "assets/Image/Ui/Save/save-silhouette-carriage-fake-04.ie.jpg",
    flower_sea: "assets/Image/Ui/Save/save-silhouette-flower-sea.ie.jpg",
    flower_sea_inside: "assets/Image/Ui/Save/save-silhouette-flower-sea-inside.ie.jpg"
  });
  function createPreview(info, sceneName) {
    var preview = document.createElement("div");
    preview.className = "save-slot-preview";
    var imagePath = !info.empty && info.compatible ? artBySceneId[info.sceneId] : null;
    if (imagePath) {
      var image = document.createElement("img");
      image.className = "save-slot-image";
      image.src = imagePath;
      image.alt = "".concat(sceneName || "当前场景", "\u526A\u5F71");
      preview.append(image);
    } else {
      var placeholder = document.createElement("span");
      placeholder.className = "save-slot-placeholder";
      placeholder.textContent = info.empty ? "暂无车厢记录" : "暂无对应车厢图";
      preview.append(placeholder);
    }
    return preview;
  }
  Game.SaveSlotArt = Object.freeze({
    createPreview: createPreview
  });
})(window.TrainGame);
