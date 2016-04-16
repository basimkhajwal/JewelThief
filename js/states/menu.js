var Game = Game || {};
var Engine = Engine || {};

Game.States = Game.States || {};

Game.States.Menu = function () {
    "use strict";

    var state = Engine.GameState.create(),
        game,
        title = Engine.UI.TextArea.create(500, 100, "Jewel Thief (work in progress)", 20, "#000", "Monospace"),
        startButton = Engine.UI.TextButton.create(400, 400, 200, 75, "Start Game");

    startButton.setClickListener(function () {
        game.getGameStateManager().setState();
    });

    state.onCreate = function (g) {
        game = g;
    };

    state.render = function (canvas) {
        title.render(canvas);
        startButton.render(canvas);
    };

    state.update = function (delta) {
        startButton.update();
    };

    return state;

};
