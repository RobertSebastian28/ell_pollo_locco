class ThrowableObject extends MovableObject {

    images_bottle_brake = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    images_bottle_rotate = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    constructor(x, y, otherDirection) {
        super().loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.images_bottle_brake);
        this.loadImages(this.images_bottle_rotate);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 80;
        this.width = 70;
        this.speedY = 15;
        this.applyGravity();
        this.throw();
    }

    world;
    breaked = false;
    throw_sound = new Audio('audio/throw.mp3');
    brake_sound = new Audio('audio/bottle.mp3');

    /**
     * in this function, bolic variables are checked at a certain interval and then other functions are executed or the value of the variable x is changed
     * 
     */
    throw() {

        this.throw_sound.play();

        setInterval(() => {
            this.bottleAnimation();
        }, 100);

        setInterval(() => {
            if (this.otherDirection)
                this.x -= 10;
            else
                this.x += 10;
        }, 30);

    }

    /**
     * this function checks the bolic value of a variable and depending on the result executes another function
     * 
     */
    bottleAnimation() {
        if (!this.breaked) {
            this.playAnimation(this.images_bottle_rotate);
        }
        else if (this.breaked) {
            this.playAnimation(this.images_bottle_brake);
        }
    }
}