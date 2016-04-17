var Engine = Engine || {};
var Game = Game || {};

Game.States = Game.States || {};

Game.States.GameOver = function (previousScreen) {
    "use strict";

    var state = Engine.GameState.create();

    state.render = function (canvas) {
        canvas.putImageData(previousScreen, 0, 0);

        canvas.globalAlpha = 0.2;
        canvas.fillStyle = "#2c3e50";
        canvas.fillRect(0, 0, 1000, 600);
        canvas.globalAlpha = 1;

    };

    state.update = function (delta) {


    };

    return state;
};
