class CoinBar extends DrawableObject {


    images_coins = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    coinAmmount = 0;

    constructor() {
        super();
        this.loadImages(this.images_coins);
        this.x = 10;
        this.y = 30;
        this.width = 190;
        this.height = 50;

        this.setCoinAmmount(0);
    }

    /**
     * this function changes the image for the coin_bar display
     * 
     * @param {number} coinAmmount - that is the number of coins available
     */
    setCoinAmmount(coinAmmount) {
        this.coinAmmount = coinAmmount;
        let path = this.images_coins[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * this function returns a number between 0 and 5
     * 
     * @returns {number} 
     */
    resolveImageIndex() {
        if (this.coinAmmount >= 5) {
            return 5;
        } else if (this.coinAmmount >= 4) {
            return 4;
        } else if (this.coinAmmount >= 3) {
            return 3;
        } else if (this.coinAmmount >= 2) {
            return 2;
        } else if (this.coinAmmount >= 1) {
            return 1;
        } else if (this.coinAmmount >= 0) {
            return 0;
        }
    }
}