var Game = Game || {};
var Engine = Engine || {};

Game.States = Game.States || {};

Game.States.Menu = function () {
    "use strict";

    var state = Engine.GameState.create(),

        title = Engine.UI.TextArea.create(500, 100, "Jewel Thief", 20, "#000", "Monospace");

    state.render = function (canvas) {
        title.render(canvas);
    };

    state.update = function (delta) {

    };

    return state;

};
