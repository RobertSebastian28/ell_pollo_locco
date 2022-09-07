class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 70;
    speed = 10;
    world;
    endbossIsClose = false;
    endbossIsSuperClose = false;
    endbossWasAttacked = false;
    endbossAttacksOrDead = false;
    won = false;

    images_alert = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    images_walk = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    images_attack = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    images_hurt = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    images_dead = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    endboss_dead = new Audio('audio/win.mp3');

    offset = {
        top: 30,
        left: 10,
        right: 10,
        bottom: 10
    };

    constructor() {
        super().loadImage(this.images_alert[0]);
        this.loadImages(this.images_alert);
        this.loadImages(this.images_walk);
        this.loadImages(this.images_attack);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.x = 2000;
    }

    /**
     * this function calls some other function at a defined interval
     * 
     */
    animate() {
        setInterval(() => {
            this.endbossAlertAnimation();
        }, 200);

        setInterval(() => {
            this.endbossWalkLeftRight();
        }, 120);

        setInterval(() => {
            this.endbossAttaksAnimation();
        }, 200);

        setInterval(() => {
            this.endbossIsHurtAnimation();
        }, 120);

        setInterval(() => {
            this.enbossOtherDirection();
        }, 200);

        setInterval(() => {
            this.endbossIsDeadAnimation();
        }, 200);
    }

    /**
    * this function accesses html documents and changes their visibility
    * 
    */
    winAnimation() {
        let endScreenWon = document.getElementById('end_screen_container_won');
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
     * this function changes the value of a variable to false and checks whether 
     * the variable endbossIsClose returns the value false if so, another function is executed
     * 
     */
    endbossAlertAnimation() {
        this.endbossAttacksOrDead = false;
        if (this.endbossIsClose == false) {
            this.playAnimation(this.images_alert);
        }
    }

    /**
     * this function executes two other functions
     * 
     */
    endbossWalkAnimation() {
        this.playAnimation(this.images_walk);
        this.moveLeft();
    }

    /**
     * this function checks the value of the variable enbossIsSuperClose and if this value is true
     * another function is executed and the value of the variable enbossAttacksOrDead is changed to true
     * 
     */
    endbossAttaksAnimation() {
        if (this.endbossIsSuperClose == true) {
            this.playAnimation(this.images_attack);
            this.endbossAttacksOrDead = true;
        }
    }

    /**
     * this function checks whether the function isHurt returns the value true if so, another function is executed
     * 
     */
    endbossIsHurtAnimation() {
        if (this.isHurt()) {
            this.playAnimation(this.images_hurt);
        }
    }

    /**
     * this function checks if enboss.x is smaller than character.x if so the value of the variable otherDirection
     * is changed to true if not the value of the variable is changed to false
     * 
     */
    enbossOtherDirection() {
        if (this.x < this.world.character.x) {
            this.otherDirection = true;
        }
        else {
            this.otherDirection = false;
        }
    }

    /**
     * in this function different bolic values ​​are checked and other functions are executed depending on the result
     * 
     */
    endbossWalkLeftRight() {
        if (this.checkBolischParameterForWalkingLeft()) {
            this.endbossWalkAnimation();
        }
        else if (this.checkBolischParameterForWalkingRight()) {
            this.playAnimation(this.images_walk);
            this.moveRight();
        }
    }

    /**
     * in this function it is checked whether the function isDead returns the value true if so, another function is executed
     * and the value of the variable enbossAttacksOrDead is changed to true. After a certain delay, another function is executed,
     * which in turn calls other functions that ensure that the victory animation is executed
     * 
     */
    endbossIsDeadAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.images_dead);
            this.endbossAttacksOrDead = true;
            setTimeout(() => {
                if (!this.won) {
                    clearHud();
                    this.endboss_dead.play();
                    this.won = true;
                    this.winAnimation();
                }
            }, 2000);
            setTimeout(() => {
                this.reload();
            }, 8000);
        }
    }

    /**
     * in this function certain bollian values ​​of variables are returned
     * 
     * @returns 
     */
    checkBolischParameterForWalkingLeft() {
        return this.endbossIsClose &&
            !this.otherDirection
            && !this.endbossAttacksOrDead
            || this.endbossWasAttacked
            && !this.otherDirection
            && !this.endbossAttacksOrDead
    }

    /**
    * in this function certain bollian values ​​of variables are returned
    * 
    * @returns 
    */
    checkBolischParameterForWalkingRight() {
        return this.endbossIsClose
            && this.otherDirection
            && !this.endbossAttacksOrDead
    }
}
