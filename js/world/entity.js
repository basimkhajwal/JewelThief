var Engine = Engine || {};
var Game = Game || {};

Game.World.Entity = function (ix, iy, iwidth, iheight, world) {
    "use strict";

    return {

        shape: 'C',
        colour: "red",
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
                    world.renderables.splice(world.renderables.indexOf(this.bullets[i]), 1);
                    this.bullets.splice(i, 1);
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

        fireBullet: function (speed, lifeTime) {
            var bullet = Game.World.Bullet(this.x, this.y - 1, speed, lifeTime);
            this.bullets.push(bullet);
            world.renderables.push(bullet);
        },

        getY: function () {
            return this.y;
        },

        collisionFunction: function (cx, cy) {
            if (this.shape === 'C') {
                return (cx - this.x) * (cx - this.x) + (cy - this.y) * (cy - this.y) < this.width * this.width;
            } else {
                return (cx >= this.x && cx <= this.x + this.width) && (cy >= this.y && cy <= this.y + this.height);
            }
        }

    };


};
