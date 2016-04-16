var Engine = Engine || {};
var Game = Game || {};

Game.World = Game.World || {};

Game.World.World = function (width) {
    "use strict";

    width = width || 1000;

    var camera = Engine.Camera.create(0, 0);

    return {

        update: function (delta) {
            camera.setX(camera.getX() + 20 * delta);
        },

        render: function (canvas) {

            camera.projectContext(canvas);

            canvas.fillStyle = "green";
            canvas.fillRect(0, 0, 1000, 600);

            camera.unProjectContext(canvas);
        }

    };

};
