(function (Game) {
  "use strict";

  const artBySceneId = Object.freeze({
    carriage_02: "assets/Image/Ui/Save/save-silhouette-carriage-02.png",
    carriage_03: "assets/Image/Ui/Save/save-silhouette-carriage-03.png",
    carriage_04: "assets/Image/Ui/Save/save-silhouette-carriage-04.png",
    carriage_05: "assets/Image/Ui/Save/save-silhouette-carriage-05.png",
    carriage_06: "assets/Image/Ui/Save/save-silhouette-carriage-06.png",
    carriage_07: "assets/Image/Ui/Save/save-silhouette-carriage-07.png",
    front_carriage: "assets/Image/Ui/Save/save-silhouette-front-carriage.png",
    carriage_inner_01: "assets/Image/Ui/Save/save-silhouette-carriage-inner-01.png",
    carriage_inner_02: "assets/Image/Ui/Save/save-silhouette-carriage-inner-02.png",
    carriage_fake_01: "assets/Image/Ui/Save/save-silhouette-carriage-fake-01.png",
    carriage_fake_02: "assets/Image/Ui/Save/save-silhouette-carriage-fake-02.png",
    carriage_fake_03: "assets/Image/Ui/Save/save-silhouette-carriage-fake-03.png",
    carriage_fake_04: "assets/Image/Ui/Save/save-silhouette-carriage-fake-04.png",
    flower_sea: "assets/Image/Ui/Save/save-silhouette-flower-sea.png",
    flower_sea_inside: "assets/Image/Ui/Save/save-silhouette-flower-sea-inside.png"
  });

  function createPreview(info, sceneName) {
    const preview = document.createElement("div");
    preview.className = "save-slot-preview";

    const imagePath = !info.empty && info.compatible ? artBySceneId[info.sceneId] : null;
    if (imagePath) {
      const image = document.createElement("img");
      image.className = "save-slot-image";
      image.src = imagePath;
      image.alt = `${sceneName || "当前场景"}剪影`;
      preview.append(image);
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "save-slot-placeholder";
      placeholder.textContent = info.empty ? "暂无车厢记录" : "暂无对应车厢图";
      preview.append(placeholder);
    }
    return preview;
  }

  Game.SaveSlotArt = Object.freeze({ createPreview });
})(window.TrainGame);
