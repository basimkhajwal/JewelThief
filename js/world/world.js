var Engine = Engine || {};
var Game = Game || {};

Game.World = Game.World || {};

Game.World.World = function (width) {
    "use strict";

    width = width || 1000;

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

        drawEnd = function (canvas) {

            canvas.globalAlpha = 0.2;
            canvas.fillStyle = "#2c3e50";
            canvas.fillRect(width - 120, 0, 20, 600);
            canvas.globalAlpha = 1;

            canvas.fillStyle = "#95a5a6";
            canvas.fillRect(width - 100, 0, 100, 600);

            canvas.fillStyle = "#bdc3c7";
            canvas.fillRect(width - 100, 550, 100, 50);

            canvas.fillStyle = "#7f8c8d";
            canvas.fillRect(width - 100, 550, 100, 10);

            //x: 0-7, y : 0-20
            var bricks = [
                [1, 10],
                [5, 15],
                [3, 6],
                [2, 20]
            ];

            canvas.strokeStyle = "#7f8c8d";
            bricks.forEach(function (brick) {

                canvas.globalAlpha = 0.2;
                canvas.fillRect(width - 100 + brick[0] * 12.5, brick[1] * 25, 12.5, 25);
                canvas.globalAlpha = 1;

                canvas.beginPath();
                canvas.moveTo(width - 100 + brick[0] * 12.5, brick[1] * 25);
                canvas.lineTo(width - 100 + brick[0] * 12.5, brick[1] * 25 + 25);
                canvas.lineTo(width - 100 + brick[0] * 12.5 + 12.5, brick[1] * 25 + 25);
                canvas.stroke();
                canvas.closePath();
            });
        },

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

                canvas.fillStyle = "#34495e";
                canvas.fillRect(width - 160, 250, 100, 100);
                canvas.fillStyle = "#2c3e50";
                canvas.fillRect(width - 135, 275, 100, 50);

                for (i = 0; i < this.renderables.length; i += 1) {
                    this.renderables[i].render(canvas);
                }

                drawEnd(canvas);

                camera.unProjectContext(canvas);
            },

            getWidth: function () {
                return width - 100;
            },

            getPlayer: function () {
                return player;
            }
        };

    player =  Game.World.Player(100, 200, world);
    world.renderables.push(player);

    for (i = 0; i < 2; i += 1) {
        guard = Game.World.Guard(Math.random() * width, Math.random() * 600, world);
        world.renderables.push(guard);
        world.guards.push(guard);
    }

    return world;
};
