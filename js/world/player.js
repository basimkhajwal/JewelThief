var Engine = Engine || {};
var Game = Game || {};

Game.World = Game.World || {};

Game.World.Player = function (x, y) {
    "use strict";

    return {

        update: function (delta) {

        },

        render: function (canvas) {
            canvas.beginPath();
            canvas.fillStyle = "red";
            canvas.arc(x, y, 20, 0, 2 * Math.PI);
            canvas.fill();
            canvas.closePath();
        }

    };
};
