let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game by setting up the start screen, canvas, world, and event listeners.
 */
function init() {
    handleStartScreen();
    canvas = document.getElementById("canvas");
    if (!world) {
        initLevel();
        world = new World(canvas, keyboard);
    }
    initEventListener();
}

/**
 * Sets up all necessary event listeners for the game, including touch controls and UI button interactions.
 */
function initEventListener() {
    initTouchControls();
    document.getElementById("stopAllSounds").addEventListener("click", function () {
        switchMuteBtnIMG();
        SoundManager.instance.toggleMute();
    });
    document.getElementById("backToMainMenu").addEventListener("click", function () {
        document.getElementById("menuBtnsContainer").classList.add("show");
        document.getElementById("menuBtnsContainer").classList.remove("d-none");
    });
    document.getElementById("no-btn").addEventListener("click", function () {
        document.getElementById("menuBtnsContainer").classList.remove("show");
        document.getElementById("menuBtnsContainer").classList.add("d-none");
    });
    document.getElementById("yes-btn").addEventListener("click", function () {
        restartGame();
    });
}

/**
 * Switches the image of the mute button to indicate current sound status.
 */
function switchMuteBtnIMG() {
    var element = document.getElementById("stopAllSounds");
    var aktuellesSrc = element.src;

    if (aktuellesSrc.includes("volume_off.svg")) {
        element.src = "img/icons/volume_mute.svg";
    } else {
        element.src = "img/icons/volume_off.svg";
    }
}

/**
 * Attaches an event listener to the "startGameButton" to initialize the game and start playing background music after a delay.
 */
document.getElementById("startGameButton").addEventListener("click", function () {
    init();
    setTimeout(() => {
        world.soundManager.play("backgroundMusic");
    }, 1000);
});

/**
 * Adds a global event listener for keydown events to handle player movement and actions.
 */
window.addEventListener("keydown", (event) => {
    let isMoving = false;

    if (event.code == "ArrowUp") {
        keyboard.UP = true;
        isMoving = true;
    } else if (event.code == "ArrowLeft") {
        keyboard.LEFT = true;
        isMoving = true;
    } else if (event.code == "ArrowRight") {
        keyboard.RIGHT = true;
        isMoving = true;
    } else if (event.code == "ArrowDown") {
        keyboard.DOWN = true;
        isMoving = true;
    } else if (event.code == "Space") {
        keyboard.SPACE = true;
    } else if (event.code == "KeyD") {
        keyboard.D = true;
    }
});

/**
 * Adds a global event listener for keyup events to reset the player's movement and action states when keys are released.
 */
window.addEventListener("keyup", (event) => {
    if (event.code == "ArrowUp") {
        keyboard.UP = false;
    } else if (event.code == "ArrowLeft") {
        keyboard.LEFT = false;
    } else if (event.code == "ArrowRight") {
        keyboard.RIGHT = false;
    } else if (event.code == "ArrowDown") {
        keyboard.DOWN = false;
    } else if (event.code == "Space") {
        keyboard.SPACE = false;
    } else if (event.code == "KeyD") {
        keyboard.D = false;
    }
});

/**
 * Handles initial display adjustments when the game starts.
 */
function handleStartScreen() {
    //show canvas
    document.getElementById("canvasContainer").classList.remove("d-none");
    //remove startscreen
    document.getElementById("startScreen").classList.add("d-none");
    document.getElementById("websiteLinks").classList.add("d-none")
}

/**
 * Displays control instructions for the game.
 */
function handleControlScreen() {
    document.getElementById("controlDiv").classList.remove("d-none");
    document.getElementById("menuButtons").classList.add("d-none");
}

/**
 * Returns to the main menu from the controls screen.
 */
function goBack() {
    document.getElementById("controlDiv").classList.add("d-none");
    document.getElementById("menuButtons").classList.remove("d-none");
}

/**
 * Displays the win screen when the player wins the game.
 */
function showYouWinScreen() {
    SoundManager.instance.play("youWin");
    document.getElementById("youWinContainer").classList.remove("d-none");
    document.getElementById("canvasContainer").classList.add("d-none");
}

/**
 * Displays the lose screen when the player loses the game.
 */
function showYouLoseScreen() {
    SoundManager.instance.play("gameOver");
    document.getElementById("youLoseContainer").classList.remove("d-none");
    document.getElementById("canvasContainer").classList.add("d-none");
}

/**
 * Restarts the game by reloading the window.
 */
function restartGame() {
    window.location.reload();
}

/**
 * Initializes touch controls for mobile users.
 */
function initTouchControls() {
    const hud = document.getElementById("touchControls");

    hud.addEventListener(
        "touchstart",
        function (event) {
            if (event.target.id) {
                event.preventDefault();
                handleTouchControl(event.target.id, true);
            }
        },
        false
    );

    hud.addEventListener(
        "touchend",
        function (event) {
            if (event.target.id) {
                event.preventDefault();
                handleTouchControl(event.target.id, false);
            }
        },
        false
    );
}

/**
 * Handles touch input for mobile controls.
 * @param {string} buttonId - The ID of the button being pressed.
 * @param {boolean} isPressed - Whether the button is being pressed or released.
 */
function handleTouchControl(buttonId, isPressed) {
    if (buttonId === "up-btn") {
        keyboard.UP = isPressed;
    } else if (buttonId === "left-btn") {
        keyboard.LEFT = isPressed;
    } else if (buttonId === "right-btn") {
        keyboard.RIGHT = isPressed;
    } else if (buttonId === "down-btn") {
        keyboard.DOWN = isPressed;
    } else if (buttonId === "space-btn") {
        keyboard.SPACE = isPressed;
    } else if (buttonId === "d-btn") {
        keyboard.D = isPressed;
    }
}
