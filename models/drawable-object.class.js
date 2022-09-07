class DrawableObject {
    x = 200;
    y = 300;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    drawable = true;

    /**
     * this function loads an image with a given path and passes it to the new Image() class
     * 
     * @param {string} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * this function adds an image to the context(canvas) at specified coordinates with a specified height and width
     * 
     * @param {*} ctx - canvas. getContext("2d");
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * this function draws a colored border around the inserted moving images
     * 
     * @param {*} ctx 
     */
    drawBorder(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * this function loads images via their paths from an array and passes them to the class new Image()
     * 
     * @param {Array} arr 
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}