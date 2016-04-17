var Engine = Engine || {};
var Game = Game || {};

Game.World.Entity = function (ix, iy, iwidth, iheight) {
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

        update: function (delta) {
            //Move
            this.x += this.vx * delta;
            this.y += this.vy * delta;
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

                canvas.fillStyle = this.colour;
                canvas.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            }

        }

    };


};
