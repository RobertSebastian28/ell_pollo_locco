class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;
    actionIsEnabled = true;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    

    /**
     * this function increases the value of the variable x by the value of the variable speed
     * 
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * this function subtracts the value of the variable x by the value of the variable speed
     * 
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * this function returns the path of various images from an array. 
     * The Modulo operator creates a loop and when you have arrived at the last image of the array, the value 0 is always calculated and the loop starts over
     * 
     * @param {Array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * this function checks if it is an instance of class ThrowableObject. If so, the value true is passed; if not, the value y is less than 160 is passed
     * 
     * @returns 
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 160;
        }
    }

    /**
     * This function checks whether AboveGround() returns the value true or whether the variable speedY has a value greater than 0. If 1 of the 2 parameters
     * is true then the variable y is subtracted by the value of speedY and the value of the variable speedY is subtracted by acceleration
     * 
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);

    }

    /**
     * this function changes the value of the variable speedY to 22
     * 
     */
    jump() {
        this.speedY = 22;
    }

    /**
     * this function returns a calculated value created by subtracting, adding and comparing greater than smaller from certain variables
     * 
     * @param {*} mo - the variable mo is assigned the value of various movable object variables
     * @returns 
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * this function subtracts 20 from the variable energy and checks whether the value of the variable energy is less than 0 if so, 
     * the value of the variable energy is assigned 0. If none of this is the case, the value of the last hit variable is changed to the current date/time
     * 
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * this function changes the value of the variable energy to 0
     * 
     */
    kill() {
        this.energy = 0;
    }

    /**
     * this function returns the value energy == 0
     * 
     * @returns 
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * this function calculates how much time has passed since the last hit
     * 
     * @returns 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // differenz in ms
        timepassed = timepassed / 1000; // differenz in sekunden
        return timepassed < 1;
    }
} 