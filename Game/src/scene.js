(function (Game) {
  "use strict";

  function readObjectState(state, query) {
    const object = state.objectStates[query.objectId] || {};
    return object[query.property];
  }

  function evaluateCondition(condition, state) {
    if (!condition) return true;
    if (condition.all) return condition.all.every((part) => evaluateCondition(part, state));
    if (condition.any) return condition.any.some((part) => evaluateCondition(part, state));
    if (condition.not) return !evaluateCondition(condition.not, state);
    if (condition.flag) return Boolean(state.flags[condition.flag]) === condition.equals;
    if (condition.hasItem) return state.inventory.includes(condition.hasItem);
    if (condition.objectState) {
      return readObjectState(state, condition.objectState) === condition.objectState.equals;
    }
    console.warn("未知显示条件，按不满足处理：", condition);
    return false;
  }

  class SceneManager {
    constructor(root, scenes, state) {
      this.root = root;
      this.state = state;
      this.scenes = new Map(scenes.map((scene) => [scene.id, scene]));
      this.onObjectClick = null;
      this.interactionEnabled = true;
    }

    load(sceneId) {
      const scene = this.scenes.get(sceneId);
      if (!scene) throw new Error(`场景不存在：${sceneId}`);
      this.state.sceneId = sceneId;
      this.render(scene);
    }

    hasScene(sceneId) {
      return this.scenes.has(sceneId);
    }

    refresh() {
      if (this.state.sceneId) this.load(this.state.sceneId);
    }

    setInteractionEnabled(value) {
      this.interactionEnabled = value;
      for (const object of this.root.querySelectorAll(".scene-object")) object.disabled = !value;
    }

    render(scene) {
      this.root.replaceChildren();
      const background = document.createElement("img");
      background.className = "scene-background";
      background.src = scene.background;
      background.alt = scene.name;
      this.root.append(background);

      for (const object of scene.objects || []) {
        if (!evaluateCondition(object.visibleWhen, this.state)) continue;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "scene-object";
        button.disabled = !this.interactionEnabled;
        button.title = object.name || object.id;
        button.setAttribute("aria-label", object.name || object.id);
        button.style.left = `${object.position.x}%`;
        button.style.top = `${object.position.y}%`;
        button.style.width = `${object.position.width}%`;
        button.style.height = `${object.position.height}%`;
        button.style.zIndex = String(object.zIndex || 10);
        const image = document.createElement("img");
        image.src = object.image;
        image.alt = "";
        button.append(image);
        button.addEventListener("click", () => {
          if (this.interactionEnabled && object.clickEvent && this.onObjectClick) {
            this.onObjectClick(object.clickEvent, object);
          }
        });
        this.root.append(button);
      }

      document.querySelector("#scene-name").textContent = scene.name;
    }
  }

  Game.evaluateCondition = evaluateCondition;
  Game.SceneManager = SceneManager;
})(window.TrainGame);
