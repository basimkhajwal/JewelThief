var Engine = Engine || {};
var Game = Game || {};

Game.States = Game.States || {};

Game.States.Loading = function () {
    "use strict";

    var game = null,
        state = Engine.GameState.create(),
        startedChanging = false,
        changing = false,

        loadingText = Engine.UI.TextArea.create(500, 300, "Loading.."),
        changingText = Engine.UI.TextArea.create(500, 450, "Changing screen.."),

        loadingBar = Engine.UI.LoadingBar.create(320, 800, 30, 1000);

    loadingText.setSize(40);
    loadingText.setFamily("Lato");
    loadingText.setColour("#f1c40f");

    changingText.setSize(20);
    changingText.setFamily("Lato");
    changingText.setColour("#f39c12");

    loadingBar.setColour("#c0392b");

    state.onCreate = function (g) {
        game = g;

        //The image loading stuff
        var asset;

        for (asset in Game.Assets) {
            if (Game.Assets.hasOwnProperty(asset)) {
                Engine.AssetManager.queueDownload(Game.Assets[asset]);
            }
        }

        //Download everything
        Engine.AssetManager.downloadAll();
    };

    state.update = function (delta) {
        loadingBar.setPercentage(Engine.AssetManager.getProgress());

        if (Engine.AssetManager.isDone() && !startedChanging) {
            startedChanging = true;

            window.setInterval(function () {
                changing = true;
            }, 500);
        }

        if (changing) {
            game.getGameStateManager().setState(Game.States.Menu());
        }
    };

    state.render = function (ctx) {
        //Custom background colour
        ctx.fillStyle = "#e74c3c";
        ctx.fillRect(0, 0, 1000, 600);

        //Draw the text
        loadingText.render(ctx);

        //Draw the loading bar
        loadingBar.render(ctx);

        //Draw if we are changing
        if (startedChanging) {
            changingText.render(ctx);
        }
    };

    return state;
};
