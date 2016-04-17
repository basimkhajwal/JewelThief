var Engine = Engine || {};
var Game = Game || {};

Game.World = Game.World || {};

Game.World.Player = function (startX, startY, world) {
    "use strict";

    var clamp = function (x, a, b) {
            return Math.max(a, Math.min(b, x));
        },
        wasSpaceDown = false,
        wasPDown = false,
        wasODown = false;

    return {

        entity: Game.World.Entity(startX, startY, 40, 40, world),
        health: 5,

        update: function (delta) {

            var keyDown = Engine.KeyboardInput.isKeyDown,
                getKey = Engine.Keys.getAlphabet,
                speed = 350,

                i,
                j,
                bullet,

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

            if (!keyDown(Engine.Keys.SPACE) && wasSpaceDown) {
                this.entity.shape = this.entity.shape === 'C' ? 'R' : 'C';
                if (this.entity.shape === 'C') {
                    this.entity.width = this.entity.height = 40;
                    this.entity.colour = "#c0392b";
                } else {
                    this.entity.width = this.entity.height = 35;
                    this.entity.colour = "#8e44ad";
                }
            }
            wasSpaceDown = keyDown(Engine.Keys.SPACE);

            if (!keyDown(getKey('P')) && wasPDown) {
                this.entity.fireBullet(0, true);
            }
            wasPDown = keyDown(getKey('P'));

            if (!keyDown(getKey('O')) && wasODown) {
                this.entity.fireBullet(180, true);
            }
            wasODown = keyDown(getKey('O'));

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

            for (i = 0; i < this.entity.bullets.length; i += 1) {
                bullet = this.entity.bullets[i];

                for (j = 0; j < world.guards.length; j += 1) {
                    if (world.guards[j].entity.collisionFunction(bullet.getX(), bullet.getY())) {
                        world.guards[j].shootDown();
                        this.entity.removeBullet(i);
                        i -= 1;
                        break;
                    }
                }
            }
        },

        render: function (canvas) {
            this.entity.render(canvas);
        },

        shootDown: function () {
            this.health -= 1;
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
