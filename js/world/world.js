var Engine = Engine || {};
var Game = Game || {};

Game.World = Game.World || {};

Game.World.World = function (width) {
    "use strict";

    width = width || 5000;

    var camera = Engine.Camera.create(0, 0),
        player,
        grassDots = (function () {
            var g = [], i;

            for (i = 0; i < 100; i += 1) {
                g.push({x: 50 + Math.random() * (width - 100), y: Math.random() * 600 });
            }

            return g;
        }()),

        world = {

            update: function (delta) {
                player.update(delta);

                //Make camera follow player clamped to world bounds
                var clamped = Math.max(500, Math.min(width - player.getWidth() / 2 - 500, player.getX()));
                camera.setX(clamped - 500);
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

                player.render(canvas);
                camera.unProjectContext(canvas);
            },

            getWidth: function () {
                return width;
            }
        };

    player =  Game.World.Player(100, 200, world);

    return world;
};
