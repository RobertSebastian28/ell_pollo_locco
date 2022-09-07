class Cloud extends MovableObject {
    y = 5;
    width = 500;
    height = 400;

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 1800;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 50);
    }
}