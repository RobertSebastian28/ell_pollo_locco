class Character extends MovableObject {

    height = 280;
    y = 160;
    speed = 3;
    timeNow = 0;
    lastAction = 0;
    characterIsMoving = false;
    characterDead = false;

    offset = {
        top: 90,
        left: 10,
        right: 10,
        bottom: 1
    };

    images_walking = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png',
    ];

    images_jumping = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png',
    ];

    images_death = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png',
    ];

    images_hurt = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];

    images_idle = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    images_sleep = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;
    walking_sound = new Audio('audio/music.mp3');
    collect_sound = new Audio('audio/coin.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');



    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_death);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_idle);
        this.loadImages(this.images_sleep);
        this.applyGravity();
    }

    /**
     * this function calls some other function at a defined interval
     * 
     */
    animate() {

        setInterval(() => {
            this.checkCharacterMoving();
        }, 50);

        setInterval(() => {
            this.characterMoveRight();
            this.characterMoveLeft();
            this.characterJump();

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.characterDeadAnimation();
            }
            else if (this.isHurt()) {
                this.characterHurtAnimation();
            }
            else if (this.isAboveGround()) {
                this.characterJumpAnimation();
            }
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.characterWalkAnimation();
            }
            else {
                this.sleepAnimation();
            }
        }, 65);
    }

    /**
     * this function checks whether certain keys are pressed and saves the time when a key was last pressed and the current time
     * 
     */
    checkCharacterMoving() {
        if (this.checkKeyPressed()) {
            this.lastAction = new Date().getTime();
        }
        this.timeNow = new Date().getTime();
    }

    /**
     * this function checks when the last time a key was pressed and if the last keystroke exceeds a defined time, an animating function is executed
     * 
     */
    sleepAnimation() {
        this.characterIsMoving = false;
        if (this.timeNow - this.lastAction > 4000) {
            this.playAnimation(this.images_sleep);
        }
        else {
            this.playAnimation(this.images_idle);
        }
    }

    /**
     * this function increases the value of coinAmmount by 1 and plays a sound
     * 
     */
    collectCoins() {
        this.world.coinBar.coinAmmount++;
        this.collect_sound.play();
    }

    /**
     * this function increases the value of bottleAmmount by 1 and plays a sound
     * 
     */
    collectBottle() {
        this.world.bottleBar.bottleAmmount++;
        this.collect_sound.play();
    }

    /**
     * this function subtracts 1 from bottleAmmount and passes the new value of bottleAmmount to another function
     * 
     */
    throwBottle() {
        this.world.bottleBar.bottleAmmount--;
        this.world.bottleBar.setBottleAmmount(this.world.bottleBar.bottleAmmount);
    }

    /**
     * this function accesses html documents and changes their visibility
     * 
     */
    LossAnimation() {
        let endScreenWon = document.getElementById('end_screen_container_loss');
        let canvasScreen = document.getElementById('canvas');
        let screenSizeButton = document.getElementById('screen_size_button');
        let header = document.getElementById('header');
        let hud = document.getElementById('hud');
        header.classList.add('d-none');
        hud.classList.remove('hud');
        screenSizeButton.classList.add('d-none');
        canvasScreen.classList.add('d-none');
        endScreenWon.classList.remove('d-none');
        endScreenWon.classList.add('d-flex');
    }

    /**
     * this function reloads index.html
     * 
     */
    reload() {
        window.location = 'index.html';
    }

    /**
     * this function checks if a certain key was pressed and if the x coordinate of the character
     * is smaller than the x coordinate of another variable if true another function is executed 
     * and the value of the variable other direction is set to false
     * 
     */
    characterMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
    }

    /**
     * this function checks if a certain key was pressed and if the x coordinate of the character
     *  is greater than 0 if so, another function is executed and the value of the variable
     *  otherDirection is changed to true
     * 
     */
    characterMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
    }

    /**
     * this function checks if a certain key was pressed and if another function returns the value false
     * if so, two other functions are executed
     * 
     */
    characterJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.jumping_sound.play();
        }
    }

    /**
     * this function executes other functions that play different animations
     * 
     */
    characterDeadAnimation() {
        this.playAnimation(this.images_death);
        this.characterIsMoving = true;
        setTimeout(() => {
            this.characterDead = true;
            clearHud();
            this.LossAnimation();
        }, 2000);
        setTimeout(() => {
            this.reload();
        }, 8000);
    }

    /**
     * this function executes two other functions and ends the value of the variable characterIsMoving to true
     * 
     */
    characterHurtAnimation() {
        this.playAnimation(this.images_hurt);
        this.hurt_sound.play();
        this.characterIsMoving = true;
    }

    /**
     * this function executes another function and changes the value of the variable characterIsMoving to true
     * 
     */
    characterJumpAnimation() {
        this.playAnimation(this.images_jumping);
        this.characterIsMoving = true;
    }

    /**
     * this function executes another function and changes the value of the variable characterIsMoving to true
     * 
     */
    characterWalkAnimation() {
        this.playAnimation(this.images_walking);
        this.characterIsMoving = true;
    }

    /**
    * in this function certain bollian values ​​of variables are returned
    * 
    * @returns 
    */
    checkKeyPressed() {
        return this.world.keyboard.LEFT
            || this.world.keyboard.RIGHT
            || this.world.keyboard.SPACE
            || this.world.keyboard.D
    }
}