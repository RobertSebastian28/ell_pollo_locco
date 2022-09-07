class Level {
    enemies;
    clouds;
    backgroundObjects;
    coin;
    bottle;
    level_end_x = 2950;

    constructor(enemies, clouds, backgroundObjects, coin, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.bottle = bottle;
    }

    /**
     * this function executes another function and passes certain parameters/variables to it
     * 
     */
    animateLevel() {
        this.animateAll(this.enemies,this.clouds);
    }

    /**
     * this function passes certain variables to another function that executes each variable in itself
     * 
     * @param {*} mos - variable for movable objects
     */
     animateAll(mos,lid) {
        mos.forEach(mo => mo.animate());
        lid.forEach(lid => lid.animate());
    }
}