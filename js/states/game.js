var Engine = Engine || {};
var Game = Game || {};

Game.States = Game.States || {};

Game.States.Game = function () {
    "use strict";

    var state = Engine.GameState.create(),
        game,

        world = Game.World.World();

    state.onCreate = function (g) {
        game = g;
    };

    state.render = function (canvas) {
        world.render(canvas);
    };

    state.update = function (delta) {
        world.update(delta);
    };

    return state;
};
