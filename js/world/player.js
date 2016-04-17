var Engine = Engine || {};
var Game = Game || {};

Game.World = Game.World || {};

Game.World.Player = function (x, y, world) {
    "use strict";

    var vx = 0,
        vy = 0,

        clamp = function (x, a, b) {
            return Math.max(a, Math.min(b, x));
        };

    return {

        update: function (delta) {

            var keyDown = Engine.KeyboardInput.isKeyDown,
                getKey = Engine.Keys.getAlphabet,
                speed = 350;

            vx = vy = 0;

            if (keyDown(Engine.Keys.RIGHT) || keyDown(getKey('D'))) {
                vx += speed;
            }

            if (keyDown(Engine.Keys.LEFT) || keyDown(getKey('A'))) {
                vx -= speed;
            }

            if (keyDown(Engine.Keys.UP) || keyDown(getKey('W'))) {
                vy -= speed;
            }

            if (keyDown(Engine.Keys.DOWN) || keyDown(getKey('S'))) {
                vy += speed;
            }

            if (vx !== 0 && vy !== 0) {
                vx /= Math.sqrt(2);
                vy /= Math.sqrt(2);
            }

            x += vx * delta;
            y += vy * delta;

            //Clamp position
            x = clamp(x, this.getWidth() / 2, world.getWidth() - this.getWidth() / 2);
            y = clamp(y, this.getHeight() / 2, 600 - this.getHeight() / 2);
        },

        render: function (canvas) {

            canvas.globalAlpha = 0.2;

            canvas.beginPath();
            canvas.fillStyle = "#2c3e50";
            canvas.ellipse(x, y + this.getHeight() / 2, 20, 10, 0, 0, 2 * Math.PI);
            canvas.fill();
            canvas.closePath();

            canvas.globalAlpha = 1;

            canvas.beginPath();
            canvas.fillStyle = "#c0392b";
            canvas.arc(x, y, 20, 0, 2 * Math.PI);
            canvas.fill();
            canvas.closePath();
        },

        getX: function () {
            return x;
        },

        getY: function () {
            return y;
        },

        getWidth: function () {
            return 40;
        },

        getHeight: function () {
            return 40;
        }

    };
};
