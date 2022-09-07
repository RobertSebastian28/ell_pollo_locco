class Coin extends MovableObject {

    images_coin = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    offset = {
        top: 25,
        left: 25,
        right: 25,
        bottom: 25
    };

    constructor() {
        super();
        this.loadImages(this.images_coin);
        this.x = 200 + Math.random() * 2100;
        this.y = 250 - Math.random() * 150;
        this.width = 100;
        this.height = 100;
        this.animate();
    }

    /**
     * this function calls another function at a defined interval
     * 
     */
    animate() {
        setInterval(() => {
           this.playAnimation(this.images_coin);
        }, 190);
    }
}