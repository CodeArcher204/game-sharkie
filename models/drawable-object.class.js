/**
 * Represents a drawable object that can be rendered on a canvas. This class provides basic functionalities
 * for loading and drawing images.
 */
class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 100;
    y = 250;
    height = 100;
    width = 100;

    /**
     * Loads an image from a given path and assigns it to this object.
     * @param {string} path - The path to the image file to be loaded.
     */
    loadImage(path) {
        this.img = new Image(); // new Image() = document.getElementByID('image)<img id="image" src>
        this.img.src = path;
    }

    /**
     * Draws the object's current image to the specified canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the image will be drawn.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images from an array of paths, storing them in the image cache.
     * @param {string[]} arr - An array of image paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}