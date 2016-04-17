var Engine = Engine || {};
var Game = Game || {};

Game.World = Game.World || {};

Game.World.Entity = function (ix, iy, iwidth, iheight, world) {
    "use strict";

    return {

        shape: 'C',
        colour: "#c0392b",
        x: ix || 0,
        y: iy || 0,
        vx: 0,
        vy: 0,
        width: iwidth || 10,
        height: iheight || 10,
        bullets: [],

        update: function (delta) {
            //Move
            this.x += this.vx * delta;
            this.y += this.vy * delta;

            var i, removing;

            for (i = 0; i < this.bullets.length; i += 1) {
                this.bullets[i].update(delta);

                if (this.bullets[i].isFinished()) {
                    this.removeBullet(i);
                    i -= 1;
                }
            }
        },

        render: function (canvas) {

            if (this.shape === 'C') {
                canvas.globalAlpha = 0.2;
                canvas.beginPath();
                canvas.fillStyle = "#2c3e50";
                canvas.ellipse(this.x, this.y + this.height / 2, this.width / 2, this.height / 4, 0, 0, 2 * Math.PI);
                canvas.fill();
                canvas.closePath();

                canvas.globalAlpha = 1;
                canvas.beginPath();
                canvas.fillStyle = this.colour;
                canvas.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
                canvas.fill();
                canvas.closePath();
            } else {

                canvas.globalAlpha = 0.2;
                canvas.fillStyle = "#2c3e50";
                canvas.fillRect(this.x - this.width / 2 + 2, this.y, this.width - 4, this.height * 0.8);

                canvas.globalAlpha = 1;
                canvas.fillStyle = this.colour;
                canvas.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            }

        },

        fireBullet: function (angle, isPlayer, speed, lifeTime) {
            isPlayer = isPlayer || false;
            lifeTime = lifeTime || 3;
            speed = speed || 500;

            var bullet = Game.World.Bullet(this.x, this.y - 1, angle, speed, lifeTime, isPlayer);
            this.bullets.push(bullet);
            world.renderables.push(bullet);
        },

        removeBullet: function (bulletIndex) {
            world.renderables.splice(world.renderables.indexOf(this.bullets[bulletIndex]), 1);
            this.bullets.splice(bulletIndex, 1);
        },

        getY: function () {
            return this.y;
        },

        collisionFunction: function (cx, cy) {
            if (this.shape === 'C') {
                return (cx - this.x) * (cx - this.x) + (cy - this.y) * (cy - this.y) < this.width * this.width;
            } else {
                var hw = this.width / 2,
                    hh = this.height / 2;
                return (cx >= this.x - hw && cx <= this.x + hw) && (cy >= this.y - hh && cy <= this.y + hh);
            }
        }

    };


};
