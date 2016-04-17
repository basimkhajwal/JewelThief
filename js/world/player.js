var Engine = Engine || {};
var Game = Game || {};

Game.World = Game.World || {};

Game.World.Player = function (startX, startY, world) {
    "use strict";

    var clamp = function (x, a, b) {
        return Math.max(a, Math.min(b, x));
    };

    return {

        entity: Game.World.Entity(startX, startY, 40, 40),

        update: function (delta) {

            var keyDown = Engine.KeyboardInput.isKeyDown,
                getKey = Engine.Keys.getAlphabet,
                speed = 350,

                vx = 0,
                vy = 0;

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

            this.entity.vx = vx;
            this.entity.vy = vy;

            this.entity.update(delta);

            //Clamp position
            this.entity.x = clamp(this.entity.x, this.entity.width / 2, world.getWidth() - this.entity.width / 2);
            this.entity.y = clamp(this.entity.y, this.entity.height / 2, 600 - this.entity.height / 2);
        },

        render: function (canvas) {
            this.entity.render(canvas);
        },

        getX: function () {
            return this.entity.x;
        },

        getY: function () {
            return this.entity.y;
        },

        getWidth: function () {
            return this.entity.width;
        },

        getHeight: function () {
            return this.entity.height;
        }

    };
};
