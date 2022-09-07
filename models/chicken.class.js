class Chicken extends MovableObject {
    height = 80;
    width = 60;
    y = 355;
    world;
    chickenDead = false;
    images_walking = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    images_dead = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    chicken_hit = new Audio('audio/chicken_dead.mp3');

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 5
    };

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_dead);
        this.chickenSpawn();
    }

    /**
     * this function calls some other function at a defined interval
     * 
     */
    animate() {
        setInterval(() => {
            this.chickenMoveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead() && !this.chickenDead) {
                this.chickenDeadAnimation();
            }
            else if (!this.chickenDead) {
                this.playAnimation(this.images_walking);
            }
        }, 200);
    }

    /**
     * this function generates two random numbers in a defined range for two variables
     * 
     */
    chickenSpawn() {
        this.x = 500 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.25;
    }

    /**
     * this function checks whether the function isDead returns false if so, another function is executed
     * 
     */
    chickenMoveLeft() {
        if (!this.isDead()) {
            this.moveLeft();
        }
    }

    /**
     * this function executes two other functions and changes the value of the variable chickeDead to true
     * 
     */
    chickenDeadAnimation() {
        this.playAnimation(this.images_dead);
        this.chicken_hit.play();
        this.chickenDead = true;
    }
}