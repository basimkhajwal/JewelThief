var Game = Game || {};
var Engine = Engine || {};

Game.States = Game.States || {};

Game.States.Menu = function () {
    "use strict";

    var state = Engine.GameState.create(),
        game,
        title = Engine.UI.TextArea.create(500, 250, "Jewel Thief", 70, "#000", "Lato"),
        shadowTitle = Engine.UI.TextArea.create(500, 249, "Jewel Thief", 70, "rgba(0,0,0,0.5)", "Lato"),
        bottomText = Engine.UI.TextArea.create(500, 570, "Made in 48 hours for LD35", 25, "#8e44ad", "Lato"),

        startButton = Engine.UI.TextButton.create(350, 400, 300, 75, "Start Game");

    title.setWeight("900");
    title.setColour("#8e44ad");
    shadowTitle.setWeight("900");
    shadowTitle.setColour("#2c3e50");

    startButton.setCornerRadius(25);
    startButton.setColour("#d35400");
    startButton.getText().setSize(30);
    startButton.getText().setFamily("Lato");
    startButton.getText().setWeight(700);

    bottomText.setWeight(700);

    startButton.setClickListener(function () {
        game.getGameStateManager().setState(Game.States.Game());
    });

    state.onCreate = function (g) {
        game = g;
    };

    state.render = function (canvas) {

        canvas.fillStyle = "#f39c12";
        canvas.fillRect(0, 0, 1000, 600);

        canvas.fillStyle = "#f1c40f";
        canvas.fillRect(0, 375, 1000, 120);

        canvas.fillStyle = "#ecf0f1";
        canvas.fillRect(300, 535, 400, 45);

        shadowTitle.render(canvas);
        title.render(canvas);
        bottomText.render(canvas);

        startButton.render(canvas);
    };

    state.update = function (delta) {
        startButton.update();
    };

    return state;

};
