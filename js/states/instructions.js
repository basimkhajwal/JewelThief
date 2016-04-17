var Engine = Engine || {};
var Game = Game || {};

Game.States.Instructions = function () {
    "use strict";

    var state = Engine.GameState.create(),
        game,

        nextButton = Engine.UI.TextButton.create(775, 475, 200, 100, "Next"),
        wasNextPressed = false,

        instructions = [
            (function () {

                var title = Engine.UI.TextArea.create(500, 75, "Instructions", 50, "#ecf0f1", "Lato", 900),

                    lines = [
                        "You must steal the jewel hidden in the castle on the far right of the screen.",
                        "There are two types of guards along the way.",
                        "",
                        "",
                        "A guard will attack you if you are a different shape from it and go close enough",
                        "that the guard can see you. Or, if the guard sees another guard attacking you",
                        "",
                        "",
                        "Get to the end!!"
                    ],

                    i,
                    fontSize = 20,
                    ret = [title];

                for (i = 0; i < lines.length; i += 1) {
                    ret.push(Engine.UI.TextArea.create(500, 125 + 35 * i, lines[i], 25, "#2c3e50", "Lato", 400));
                }

                return ret;
            }()),

            (function () {

                var title = Engine.UI.TextArea.create(500, 75, "Controls", 50, "#ecf0f1", "Lato", 900),

                    infoButton = function (x, y, width, height, text) {
                        var button = Engine.UI.TextButton.create(x, y, width, height, text);
                        button.setColour("#bdc3c7");
                        button.setHoverColour("#ecf0f1");
                        button.setClickColour("#bdc3c7");
                        button.setCornerRadius(15);
                        button.getText().setFamily("Lato");
                        button.getText().setWeight(700);
                        button.getText().setSize(30);
                        button.getText().setColour("#2c3e50");
                        return button;
                    },

                    ret = [title];

                ret.push(infoButton(200, 150, 75, 75, "W"));
                ret.push(infoButton(115, 235, 75, 75, "A"));
                ret.push(infoButton(200, 235, 75, 75, "S"));
                ret.push(infoButton(285, 235, 75, 75, "D"));
                ret.push(Engine.UI.TextArea.create(237.5, 140, "Movement", 30, "#2c3e50", "Lato", 700));

                ret.push(Engine.UI.TextArea.create(450, 400, "Toggle Shape", 30, "#2c3e50", "Lato", 700));
                ret.push(infoButton(250, 410, 400, 65, "Space"));

                ret.push(Engine.UI.TextArea.create(750, 150, "Shoot Bullet", 30, "#2c3e50", "Lato", 700));
                ret.push(Engine.UI.TextArea.create(700, 200, "Left", 25, "#2c3e50", "Lato", 700));
                ret.push(Engine.UI.TextArea.create(800, 200, "Right", 25, "#2c3e50", "Lato", 700));
                ret.push(infoButton(662.5, 210, 75, 75, "O"));
                ret.push(infoButton(762.5, 210, 75, 75, "P"));

                return ret;
            }())

        ],
        currentInstruction = 0;

    nextButton.setCornerRadius(20);
    nextButton.setColour("#27ae60");
    nextButton.setHoverColour("#2ecc71");
    nextButton.setClickColour("#27ae60");
    nextButton.getText().setFamily("Lato");
    nextButton.getText().setWeight(700);
    nextButton.getText().setSize(30);
    nextButton.getText().setColour("#2c3e50");

    state.onCreate = function (g) {
        game = g;
    };

    state.render = function (canvas) {

        canvas.fillStyle = "#e67e22";
        canvas.fillRect(0, 0, 1000, 600);

        instructions[currentInstruction].forEach(function (object) {
            object.render(canvas);
        });
        nextButton.render(canvas);

        if (wasNextPressed && !nextButton.isClicked()) {
            currentInstruction += 1;

            if (currentInstruction === instructions.length) {
                game.getGameStateManager().setState(Game.States.Game());
            } else if (currentInstruction === instructions.length - 1) {
                nextButton.getText().setText("Start");
            }
        }
        wasNextPressed = nextButton.isClicked();
    };

    state.update = function (delta) {

        nextButton.update(delta);

        instructions[currentInstruction].forEach(function (object) {
            if (typeof object.update === 'function') {
                object.update(delta);
            }
        });
    };


    return state;
};
