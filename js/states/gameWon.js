var Engine = Engine || {};
var Game = Game || {};

Game.States = Game.States || {};

Game.States.GameWon = function (previousScreen) {
    "use strict";

    var state = Engine.GameState.create(),
        game,

        title = Engine.UI.TextArea.create(500, 250, "Game Won", 65, "#2c3e50", "Lato", 900),

        playAgain = Engine.UI.TextButton.create(300, 300, 400, 100, "Play Again"),
        mainMenu = Engine.UI.TextButton.create(300, 450, 400, 100, "Main Menu"),

        wasPlayPressed = false,
        wasMainPressed = false;

    playAgain.setCornerRadius(20);
    mainMenu.setCornerRadius(20);

    playAgain.setColour("#16a085");
    playAgain.setClickColour("#16a085");
    playAgain.setHoverColour("#1abc9c");
    playAgain.getText().setFamily("Lato");
    playAgain.getText().setSize(25);
    playAgain.getText().setWeight(700);
    playAgain.getText().setColour("#ecf0f1");

    mainMenu.setColour("#16a085");
    mainMenu.setClickColour("#16a085");
    mainMenu.setHoverColour("#1abc9c");
    mainMenu.getText().setFamily("Lato");
    mainMenu.getText().setSize(25);
    mainMenu.getText().setWeight(700);
    mainMenu.getText().setColour("#ecf0f1");

    state.onCreate = function (g) {
        game = g;
    };

    state.render = function (canvas) {
        canvas.putImageData(previousScreen, 0, 0);

        canvas.globalAlpha = 0.3;
        canvas.fillStyle = "#3498db";
        canvas.fillRect(0, 0, 1000, 600);
        canvas.globalAlpha = 1;

        title.render(canvas);
        playAgain.render(canvas);
        mainMenu.render(canvas);

        if (wasPlayPressed && !playAgain.isClicked()) {
            game.getGameStateManager().setState(Game.States.Game());
        }
        wasPlayPressed = playAgain.isClicked();

        if (wasMainPressed && !mainMenu.isClicked()) {
            game.getGameStateManager().setState(Game.States.Menu());
        }
        wasMainPressed = mainMenu.isClicked();
    };

    state.update = function (delta) {
        playAgain.update();
        mainMenu.update();
    };

    return state;
};
