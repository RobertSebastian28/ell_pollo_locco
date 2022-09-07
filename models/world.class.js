class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 100;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    throwableObjects = [];
    endboss = this.level.enemies.find(e => e instanceof Endboss);
    chicken = this.level.enemies.filter(e => e instanceof Chicken);

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * this function calls two other functions and they take care of the animation of the game
     * 
     */
    animate() {
        this.level.animateLevel();
        this.character.animate();
    }

    /**
     * This function ensures that 2 variables/classes are passed to the class (World).
     * 
     */
    setWorld() {
        this.character.world = this; 
        this.endboss.world = this;
    }

    /**
     * this function runs other functions that check certain things at a certain interval
     * 
     */
    run() {
        setInterval(() => {

            this.checkCollisions();
            this.checkThrowObject();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.endbossHealtBarDrawable();
            this.checkEndbossIsClose();
            this.checkEndbossIsSuperClose();
            this.throwableObjects.forEach(bottle => {
                this.bottleCollideWithEndboss(bottle);
            })
        }, 200);
    }

    /**
     * this function checks whether the d key was pressed and whether the variable bottle amount is greater than 0.
     * If this is the case, a new bottle is created and generated in the world at certain coordinates. Then another function is executed
     * 
     */
    checkThrowObject() {
        if (this.keyboard.D && this.bottleBar.bottleAmmount > 0) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 90, this.character.otherDirection); 
            this.throwableObjects.push(bottle);
            this.character.throwBottle();
            this.keyboard.D = false;
        }
    }

    /**
     * This function checks whether the character comes into contact with one of the created enemies
     * 
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.checkCharacterCollision(enemy);
            }
        });
    }

    /**
     * in this function certain bolic values/variables are checked and in certain cases 1 or 2 other functions are executed
     * 
     * @param {*} enemy 
     */
    checkCharacterCollision(enemy) {
        if (this.validateCollision(enemy)) {
        if (this.character.isAboveGround()) {
            if (enemy instanceof Chicken) {
                enemy.kill();
            }
        }

        else {
            this.character.hit();
            this.statusBar.setPercentege(this.character.energy);
        }
    }
    }

    /**
     * in this function certain bollian values ​​are returned
     * 
     */
    validateCollision(enemy) {
        return !this.character.isHurt() && !enemy.isDead() && this.character.isColliding(enemy);
    }

    /**
     * In this function it is checked whether the chracter collides with 1 or more of the generated coins. If so, certain other functions are executed
     * 
     */
    checkCoinCollisions() {
        this.level.coin.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoins();
                this.coinBar.setCoinAmmount(this.coinBar.coinAmmount);
                this.level.coin.splice(index, 1);
            }
        });
    }

    /**
     * This function checks whether the character collides with 1 or more of the generated bottles. If so, certain other functions are executed
     * 
     */
    checkBottleCollisions() {
        this.level.bottle.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle();
                this.bottleBar.setBottleAmmount(this.bottleBar.bottleAmmount);
                this.level.bottle.splice(index, 1);
            }
        });
    }

    /**
     * in this function, 2 bolic values ​​are queried if they return the correct bolic values, other functions are executed
     * 
     * @param {*} bottle 
     */
    bottleCollideWithEndboss(bottle) {
        if (!bottle.breaked && bottle.isColliding(this.endboss)) {
            this.endboss.hit();
            this.endboss.endbossWasAttacked = true;
            this.endbossBar.setPercentege(this.endboss.energy);
            bottle.breaked = true;
        }
    }

    //funktioniert noch nicht
    checkBottleCollisionsFloor(bottle) {
        if (bottle.y == 160) {
            bottle.breaked = true;
            console.log(bottle.breaked);
        }
    }

    /**
     * in this function, 3 variables are calculated with each other and if the calculated value is less than 150, the value of a bolic variable is changed to true
     * 
     */
    checkEndbossIsClose() {
        if (this.endboss.x - (this.character.x + this.character.width) < 150) {
            this.endboss.endbossIsClose = true;
        }
    }

    /**
     * in this function, 3 variables are calculated with each other and the value of a 4 variable is checked and depending on the result, 
     * the value of the bolic variable endbossIsSuperClose is changed to true or false
     * 
     */
    checkEndbossIsSuperClose() {
        if (this.endboss.x - (this.character.x + this.character.width) < 6 && this.endboss.otherDirection == false) {
            this.endboss.endbossIsSuperClose = true;
        }
        else if (this.character.x - (this.endboss.x + this.endboss.width) < 6 && this.endboss.otherDirection == true) {
            this.endboss.endbossIsSuperClose = true;
        }
        else {
            this.endboss.endbossIsSuperClose = false;
        }
    }

    /**
     * in this function, 3 variables are calculated with each other and if the calculated value is less than 500 
     * and the variable drawable returns the value false, the variable drawable is changed to true
     * 
     */
    endbossHealtBarDrawable() {
        if (this.endboss.x - (this.character.x + this.character.width) < 500 && !this.endbossBar.drawable) {
            this.endbossBar.drawable = true;
        }
    }

    /**
     * in this fuction all images are drawn/added to the canvas
     * 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0); 


        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);

        this.addToMap(this.character);


        this.ctx.translate(-this.camera_x, 0);
        // ---------Space for fxed objects ---------


        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);

        this.ctx.translate(this.camera_x, 0);



        this.ctx.translate(-this.camera_x, 0);

        let self = this; // this. funktioniert nicht in requestAnimationFrame funktion. deshalb this auslagern. Diese function ist a syncron.
        requestAnimationFrame(function () { // funktion wird so oft ausgeführt wie gut die grafik karte ist 
            self.draw();
        });

    }

    /**
     * in this function iterates through all objects and these objects/variables are passed on to another function
     * 
     * @param {*} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => { // for schleife für jedes object.
            this.addToMap(o);
        });
    }

    /**
     * in this function, bolic values ​​are queried and other functions are executed depending on the result
     * 
     * @param {*} mo 
     */
    addToMap(mo) {
        if (mo.drawable) {
            if (mo.otherDirection) {
                this.flipImage(mo);
            }

            mo.draw(this.ctx);

            if (mo.otherDirection) {
                this.flipImageBack(mo);
            }
        }
    }

    /**
     * this function gContext2D.save() method of the Canvas 2D API saves the entire state of the canvas by pushing the current state onto a stack.
     * And moves the canvas and its origin x units horizontally and y units vertically.
     * And adds a scaling transformation to the canvas units horizontally and/or vertically.
     * 
     * @param {*} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * this function restores the most recently saved canvas state by popping the top entry in the drawing state stack.
     * 
     * @param {*} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
