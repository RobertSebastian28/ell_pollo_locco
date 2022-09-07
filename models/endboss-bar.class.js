class EndbossBar extends DrawableObject {

    images_bar = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
        './img/7_statusbars/3_icons/icon_health_endboss.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.images_bar);
        this.drawable = false;
        this.x = 520;
        this.y = -10;
        this.width = 190;
        this.height = 50;
        this.setPercentege(100);
    }

    /**
     * this function changes the image for the bottle_bar display
     * 
     * @param {number} percentage - the current number of percentage
     */
    setPercentege(percentage) {
        this.percentage = percentage;
        let path = this.images_bar[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * this function returns a number between 0 and 5
     * 
     * @returns {number} 
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80 && this.percentage < 100) {
            return 4;
        } else if (this.percentage >= 60 && this.percentage < 80) {
            return 3;
        } else if (this.percentage >= 40 && this.percentage < 60) {
            return 2;
        } else if (this.percentage >= 20 && this.percentage < 40) {
            return 1;
        } else {
            return 0;
        }
    }
}