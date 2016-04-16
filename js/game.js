var Engine = Engine || {};
var Game = Game || {};

//Call back to start a new game
var startGame = function () {
    "use strict";

    var game = Engine.Game.create({
        state: Game.States.Menu(),
        width: 1000,
        height: 600,
        devmode: true
    });

    game.start();

};

//When the page loads, start the game
window.addEventListener("load", startGame, false);
