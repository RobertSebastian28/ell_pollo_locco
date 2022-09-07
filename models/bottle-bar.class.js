class BottleBar extends DrawableObject {


    bottle_bar_imgs = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    bottleAmmount = 0;

    
    constructor() {
        super();
        this.loadImages(this.bottle_bar_imgs);
        this.x = 10;
        this.y = 70;
        this.width = 190;
        this.height = 50;

        this.setBottleAmmount(0);
    }

    /**
     * this function changes the image for the bottle_bar display
     * 
     * @param {number} bottleAmmount - that is the number of bottles available
     */
    setBottleAmmount(bottleAmmount) {
        this.bottleAmmount = bottleAmmount;
        let path = this.bottle_bar_imgs[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * this function returns a number between 0 and 5
     * 
     * @returns {number} 
     */
    resolveImageIndex() {
        if (this.bottleAmmount == 5) {
            return 5;
        } else if (this.bottleAmmount >= 4) {
            return 4;
        } else if (this.bottleAmmount >= 3) {
            return 3;
        } else if (this.bottleAmmount >= 2) {
            return 2;
        } else if (this.bottleAmmount >= 1) {
            return 1;
        } else if (this.bottleAmmount >= 0) {
            return 0;
        }
    }
}