var Engine = Engine || {};
var Game = Game || {};

Game.World = Game.World || {};

Game.World.World = function (width) {
    "use strict";

    width = width || 5000;

    var camera = Engine.Camera.create(0, 0),
        player,
        i,
        guard,
        grassDots = (function () {
            var g = [], i;

            for (i = 0; i < 100; i += 1) {
                g.push({x: 50 + Math.random() * (width - 100), y: Math.random() * 600 });
            }

            return g;
        }()),

        world = {

            renderables: [],
            guards: [],

            update: function (delta) {

                var clamped;

                //Update the player
                player.update(delta);

                //Make camera follow player clamped to world bounds
                clamped = Math.max(500, Math.min(width - player.getWidth() / 2 - 500, player.getX()));
                camera.setX(clamped - 500);

                //Remove shot down guards
                for (i = 0; i < this.guards.length; i += 1) {
                    this.guards[i].update(delta);
                    if (!this.guards[i].alive) {
                        this.renderables.splice(this.renderables.indexOf(this.guards[i]), 1);
                        this.guards.splice(i, 1);
                        i -= 1;
                    }
                }

                //Sort the renderables
                this.renderables.sort(function (a, b) {
                    return a.getY() - b.getY();
                });
            },

            render: function (canvas) {

                var i;

                canvas.fillStyle = "#e67e22";
                canvas.fillRect(0, 0, 1000, 600);

                camera.projectContext(canvas);

                canvas.fillStyle = "#d35400";
                for (i = 0; i < grassDots.length; i += 1) {
                    canvas.fillRect(grassDots[i].x, grassDots[i].y, 5, 5);
                }

                for (i = 0; i < this.renderables.length; i += 1) {
                    this.renderables[i].render(canvas);
                }

                camera.unProjectContext(canvas);
            },

            getWidth: function () {
                return width;
            }
        };

    player =  Game.World.Player(100, 200, world);
    world.renderables.push(player);

    for (i = 0; i < 20; i += 1) {
        guard = Game.World.Guard(Math.random() * width, Math.random() * 600, world);
        world.renderables.push(guard);
        world.guards.push(guard);
    }

    return world;
};
