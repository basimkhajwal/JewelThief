var Engine = Engine || {};
var Game = Game || {};

Game.States = Game.States || {};

Game.States.Game = function () {
    "use strict";

    var state = Engine.GameState.create();

    return state;
};
