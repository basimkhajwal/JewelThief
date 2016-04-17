var Engine = Engine || {};
var Game = Game || {};

Game.World.Bullet = function (x, y, angle, speed, lifeTime, isPlayer) {
    "use strict";

    angle = angle * Math.PI / 180;
    isPlayer = isPlayer || false;

    var vx = Math.cos(angle) * speed,
        vy = Math.sin(angle) * speed,

        rotatedRect = function (canvas, a, b, w, h) {
            canvas.save();

            canvas.beginPath();
            canvas.translate(a + w / 2, b + h / 2);
            canvas.rotate(angle);
            canvas.rect(-w / 2, -h / 2, w, h);
            canvas.fill();
            canvas.closePath();

            canvas.restore();
        };

    return {

        update: function (delta) {
            lifeTime -= delta;

            x += vx * delta;
            y += vy * delta;
        },

        render: function (canvas) {

            canvas.globalAlpha = 0.2;
            canvas.fillStyle = "#2c3e50";
            rotatedRect(canvas, x - 4, y + 2, 8, 4);

            canvas.globalAlpha = 1;
            canvas.fillStyle = "#2980b9";
            rotatedRect(canvas, x - 4, y - 2, 8, 4);

        },

        isFinished: function () {
            return lifeTime < 0;
        },

        getX: function () {
            return x;
        },

        getY: function () {
            return y;
        },

        isPlayerBullet: function () {
            return isPlayer;
        }

    };


};
