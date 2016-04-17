var Engine = Engine || {};
var Game = Game || {};

Game.World = Game.World || {};

Game.World.Guard = function (startX, startY, world, shape) {
    "use strict";

    shape = shape || (Math.random() > 0.5 ? 'C' : 'R');

    var guard = {

        alive: true,
        entity: Game.World.Entity(startX, startY, shape === 'C' ? 40 : 35, shape === 'C' ? 40 : 35, world),

        update: function (delta) {

        },

        shootDown: function () {
            this.alive = false;
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

    guard.entity.shape = shape;
    guard.entity.colour = "#16a085";

    return guard;
};
