(function (Game) {
  "use strict";

  class GameState {
    constructor(initialState) {
      this.initialState = Game.deepClone(initialState);
      this.reset();
    }

    reset() {
      const source = Game.deepClone(this.initialState);
      this.sceneId = source.sceneId || null;
      this.currentEventId = source.currentEventId || null;
      this.attributes = source.attributes || {};
      this.flags = source.flags || {};
      this.inventory = source.inventory || [];
      this.objectStates = source.objectStates || {};
      this.checkResults = source.checkResults || {};
    }

    snapshot() {
      return Game.deepClone({
        sceneId: this.sceneId,
        currentEventId: this.currentEventId,
        attributes: this.attributes,
        flags: this.flags,
        inventory: this.inventory,
        objectStates: this.objectStates,
        checkResults: this.checkResults
      });
    }

    restore(snapshot) {
      const clean = Game.deepClone(snapshot);
      this.sceneId = clean.sceneId || null;
      this.currentEventId = clean.currentEventId || null;
      this.attributes = clean.attributes || {};
      this.flags = clean.flags || {};
      this.inventory = Array.isArray(clean.inventory) ? clean.inventory : [];
      this.objectStates = clean.objectStates || {};
      this.checkResults = clean.checkResults || {};
    }

    addItem(itemId) {
      if (!this.inventory.includes(itemId)) this.inventory.push(itemId);
    }

    setObjectState(objectId, patch) {
      this.objectStates[objectId] = {
        ...(this.objectStates[objectId] || {}),
        ...Game.deepClone(patch)
      };
    }
  }

  class SaveManager {
    constructor(state, storageKey = "train-game-save-v1") {
      this.state = state;
      this.storageKey = storageKey;
    }

    save() {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state.snapshot()));
    }

    load() {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return false;
      this.state.restore(JSON.parse(raw));
      return true;
    }
  }

  Game.GameState = GameState;
  Game.SaveManager = SaveManager;
})(window.TrainGame);
