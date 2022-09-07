class Bottle extends MovableObject {

    images_bottle = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    offset = {
        top: 1,
        left: 1,
        right: 1,
        bottom: 1
    };
    
    constructor() {
        super();
        this.loadImages(this.images_bottle);
        this.x = 200 + Math.random() * 2400;
        this.y = 370;
        this.width = 70;
        this.height = 70;
        this.animate();
    }

    /**
     * this function calls another function at a defined interval
     * 
     */
    animate() {
        setInterval(() => {
           this.playAnimation(this.images_bottle);
        }, 300);
    }
}
