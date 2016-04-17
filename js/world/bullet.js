var Engine = Engine || {};
var Game = Game || {};

Game.World.Bullet = function (x, y, speed, lifeTime) {
    "use strict";

    return {

        update: function (delta) {
            lifeTime -= delta;
            x += speed * delta;
        },

        render: function (canvas) {

            canvas.globalAlpha = 0.2;
            canvas.fillStyle = "#2c3e50";
            canvas.fillRect(x - 4, y + 2, 8, 4);

            canvas.globalAlpha = 1;
            canvas.fillStyle = "#2980b9";
            canvas.fillRect(x - 4, y - 2, 8, 4);

        },

        isFinished: function () {
            return lifeTime < 0;
        },

        getX: function () {
            return x;
        },

        getY: function () {
            return y;
        }

    };


};
