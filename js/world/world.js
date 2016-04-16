var Engine = Engine || {};
var Game = Game || {};

Game.World = Game.World || {};

Game.World.World = function (width) {
    "use strict";

    width = width || 5000;

    var camera = Engine.Camera.create(0, 0),
        player = Game.World.Player(100, 200);

    return {

        update: function (delta) {
            player.update(delta);

            //Make camera follow player clamped to world bounds
            var clamped = Math.max(500 + player.getWidth() / 2, Math.min(width - player.getWidth() / 2 - 500, player.getX()));
            camera.setX(clamped - 500);
        },

        render: function (canvas) {

            camera.projectContext(canvas);

            canvas.fillStyle = "green";
            canvas.fillRect(0, 0, 1000, 600);

            player.render(canvas);

            camera.unProjectContext(canvas);
        }

    };

};
