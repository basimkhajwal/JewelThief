var Engine = Engine || {};
var Game = Game || {};

Game.States = Game.States || {};

Game.States.Game = function () {
    "use strict";

    var state = Engine.GameState.create(),
        game,
        world = Game.World.World(),

        healthSize = 30,
        healthPad = 15,

        renderHealth = function (canvas, player) {

            var width = player.health * (healthSize + healthPad) - healthPad,
                startX = 500 - width / 2,
                i;

            canvas.fillStyle = "#c0392b";
            for (i = 0; i < player.health; i += 1) {
                canvas.fillRect(startX + (healthSize + healthPad) * i, 20, healthSize, healthSize);
            }

        };

    state.onCreate = function (g) {
        game = g;
    };

    state.render = function (canvas) {
        world.render(canvas);

        renderHealth(canvas, world.getPlayer());
    };

    state.update = function (delta) {
        world.update(delta);
    };

    return state;
};
