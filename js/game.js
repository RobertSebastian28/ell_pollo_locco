let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let myAudio = new Audio('audio/music.mp3');
let musicPlay = true;

/**
 * This function initializes and animates the game
 * 
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.animate();
    startGame();
    playMusic();
}

/**
 * getting informations if a button was pressed
 * 
 */

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }

});

/**
  * getting informations if an certain mobile button is preesed
  */
function rightBtn() {
    document.getElementById('button_right').addEventListener('touchstart', () => {
        keyboard.RIGHT = true;
    });
    document.getElementById('button_right').addEventListener('touchend', () => {
        keyboard.RIGHT = false;
    });
}

function leftBtn() {
    document.getElementById('button_left').addEventListener('touchstart', () => {
        keyboard.LEFT = true;
    });
    document.getElementById('button_left').addEventListener('touchend', () => {
        keyboard.LEFT = false;
    });
}

function upBtn() {
    document.getElementById('button_up').addEventListener('touchstart', () => {
        keyboard.SPACE = true;
    });
    document.getElementById('button_up').addEventListener('touchend', () => {
        keyboard.SPACE = false;
    });
}

function actionBtn() {
    document.getElementById('button_action').addEventListener('touchstart', () => {
        keyboard.D = true;
    });
    document.getElementById('button_action').addEventListener('touchend', () => {
        keyboard.D = false;
    });
}

/**
 * this function accesses html documents and changes their visibility
 * 
 */
function startGame() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('start_screen_container').classList.remove('d-flex');
    document.getElementById('start_screen_container').classList.add('d-none');
    document.getElementById('header').classList.add('head');
    document.getElementById('screen_size_button').classList.remove('d-none');
    responsiveHud();
}

/**
 * this function enlarges the game screen
 * 
 */
function goFullScreen() {
    var canvas = document.getElementById("canvas");
    if (canvas.requestFullScreen)
        canvas.requestFullScreen();
    else if (canvas.webkitRequestFullScreen)
        canvas.webkitRequestFullScreen();
    else if (canvas.mozRequestFullScreen)
        canvas.mozRequestFullScreen();
}

/**
 * this function opens an info window for key input
 * 
 */
function openControls() {
    document.getElementById('start_screen_container').classList.remove('d-flex');
    document.getElementById('start_screen_container').classList.add('d-none');
    document.getElementById('start_screen_controls').classList.add('startScreen', 'd-flex');
}

/**
 * this function opens the start screen
 * 
 */
function startScreen() {
    document.getElementById('start_screen_controls').classList.remove('startScreen', 'd-flex');
    document.getElementById('start_screen_container').classList.remove('d-none');
    document.getElementById('start_screen_container').classList.add('d-flex');
}

/**
 * this function allows the game music to run in a continuous loop
 * 
 */
function playMusic() {
    if (typeof myAudio.loop == 'boolean') {
        myAudio.loop = true;
    }
    else {
        myAudio.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    myAudio.play();
    musicPlay = true;
    changeMuteButton();
}

function stopMusic() {
    myAudio.pause();
    musicPlay = false;
    changeMuteButton();
}

function changeMuteButton() {
    if (musicPlay) {
        document.getElementById('screen_size_button').innerHTML = `<button onclick="goFullScreen()" class="buttons margin_button_screen">Full Screen</button>
        <button onclick="stopMusic()" class="buttons margin_button_screen">Mute Music</button>`;
    }
    else if(!musicPlay) {
        document.getElementById('screen_size_button').innerHTML = `<button onclick="goFullScreen()" class="buttons margin_button_screen">Full Screen</button>
        <button onclick="playMusic()" class="buttons margin_button_screen">Music On</button>`;
    }
}

/**
 * this function makes the header disappear in the mobile view
 * 
 */
function responsiveScreen() {
    setInterval(() => {
        if (window.innerWidth < 720 || window.innerHeight < 480 || world.character.characterDead || world.endboss.won) {
            document.getElementById('header').classList.remove('head');
            document.getElementById('header').classList.add('d-none');
        }
        else {
            document.getElementById('header').classList.add('head');
            document.getElementById('header').classList.remove('d-none');
        }
    }, 100);

}

function responsiveHud() {
    document.getElementById('hud').innerHTML = `<div>
  <img onclick="leftBtn()" id="button_left" class="hud_buttons_imgs" src="./img/buttons/arrow_left.ico">
  <img onclick="rightBtn()" id="button_right" class="hud_buttons_imgs" src="./img/buttons/arrow_right.ico">
</div>
<div>
  <img onclick="upBtn()" id="button_up" class="hud_buttons_imgs" src="./img/buttons/arrow_up.ico">
  <img onclick="actionBtn()" id="button_action" class="hud_buttons_imgs" src="./img/buttons/action.ico">
</div>`;
}

function clearHud() {
    document.getElementById('hud').innerHTML = ``;
}

function mobileControls() {
    openControls();
    if (window.innerWidth < 1000) {
        document.getElementById('start_screen_controls').innerHTML = `
    <div class="controls">
                <h2>How do I play the Game?</h2>
                <ul>
                    <li>
                        <p class="control">Move: &ensp; Press left Arrow & right Arrow</p>
                    </li>
                    <li>
                        <p class="control">Jump: &ensp; Press up Arrow</p>
                    </li>
                    <li>
                        <p class="control">Throw Bottle: &ensp; Press action Button</p>
                    </li>
                </ul>
                <button onclick="startScreen()" class="buttons">Back</button>
            </div>`;
    }
    else {
        document.getElementById('start_screen_controls').innerHTML = `<div class="controls">
        <h2>How do I play the Game?</h2>
        <ul>
            <li>
                <p class="control">Move: &ensp; Press left Arrow & right Arrow</p>
            </li>
            <li>
                <p class="control">Jump: &ensp; Press SPACE</p>
            </li>
            <li>
                <p class="control">Throw Bottle: &ensp; Press D</p>
            </li>
        </ul>
        <button onclick="startScreen()" class="buttons">Back</button>
    </div>`;
    }
}



