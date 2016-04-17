var Engine = Engine || {};
var Game = Game || {};

Game.World = Game.World || {};

Game.World.Guard = function (startX, startY, world, shape) {
    "use strict";

    shape = shape || (Math.random() > 0.5 ? 'C' : 'R');

    var viewDistance = 300,
        moveChance = (1 / 3) * (1 / 60),

        dist = function (a, b, x, y) {
            return Math.sqrt((x - a) * (x - a) + (y - b) * (y - b));
        },

        clamp = function (x, a, b) {
            return Math.max(a, Math.min(b, x));
        },

        surpriseText = Engine.UI.TextArea.create(0, 0, "!", 40, "red", "Lato", 700),

        guard = {

            alive: true,
            entity: Game.World.Entity(startX, startY, shape === 'C' ? 40 : 35, shape === 'C' ? 40 : 35, world),

            currentState: 0, // 0 - Idle, 1 - Surprised, 2 - Attacking
            moving: false,
            movingTime: 0,
            surpriseTime: 0,
            bulletTime: 0,

            update: function (delta) {

                var player = world.getPlayer(),
                    angleToPlayer,
                    dx,
                    dy;

                if (this.moving && (this.movingTime -= delta) <= 0) {
                    this.moving = false;
                    this.entity.vx = this.entity.vy = 0;
                }

                if (this.currentState === 0) {

                    if (player.entity.shape !== shape && dist(player.getX(), player.getY(), this.entity.x, this.entity.y) <= 300) {

                        this.moving = false;
                        this.entity.vx = this.entity.vy = 0;
                        this.currentState = 1;
                        this.surpriseTime = 1;

                    } else if (!this.moving && Math.random() > moveChance) {

                        do {
                            dx = Math.random() * 300 - 150;
                        } while (this.entity.x + dx < this.entity.width || this.entity.x + dx > world.getWidth() - this.entity.width);
                        do {
                            dy = Math.random() * 300 - 150;
                        } while (this.entity.y + dy < this.entity.height || this.entity.y + dy > 600 - this.entity.height);

                        this.moving = true;
                        this.movingTime = 2;
                        this.entity.vx = dx / 2;
                        this.entity.vy = dy / 2;
                    }

                } else if (this.currentState === 1) {
                    this.surpriseTime -= delta;
                    if (this.surpriseTime <= 0) {
                        this.currentState = 2;
                    }
                } else if (this.currentState === 2) {

                    angleToPlayer = Math.atan2(this.entity.y - player.entity.y, player.entity.x - this.entity.x);
                    angleToPlayer *= -1;

                    this.bulletTime -= delta;
                    if (this.bulletTime <= 0) {
                        this.bulletTime = 1;
                        this.entity.fireBullet(angleToPlayer * 180 / Math.PI);
                    }

                    if (!this.moving) {
                        do {
                            dx = Math.random() * 300 - 150;
                        } while (player.entity.x + dx < this.entity.width || player.entity.x + dx > world.getWidth() - this.entity.width);
                        do {
                            dy = Math.random() * 300 - 150;
                        } while (player.entity.y + dy < this.entity.height || player.entity.y + dy > 600 - this.entity.height);

                        dx += player.entity.x - this.entity.x;
                        dy += player.entity.y - this.entity.y;

                        this.moving = true;
                        this.movingTime = 2;
                        this.entity.vx = dx / 2;
                        this.entity.vy = dy / 2;
                    }
                }

                this.entity.update(delta);

                //Clamp position
                this.entity.x = clamp(this.entity.x, this.entity.width / 2, world.getWidth() - this.entity.width / 2);
                this.entity.y = clamp(this.entity.y, this.entity.height / 2, 600 - this.entity.height / 2);
            },

            shootDown: function () {
                this.alive = false;
            },

            render: function (canvas) {

                if (this.currentState === 1) {
                    surpriseText.setX(this.entity.x);
                    surpriseText.setY(this.entity.y - this.entity.height / 2 - 3);
                    surpriseText.render(canvas);
                }

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

    guard.entity.shape = shape;
    guard.entity.colour = "#16a085";

    return guard;
};
