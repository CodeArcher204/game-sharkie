/**
 * Represents a background object in the game world, extending the capabilities of a MovableObject.
 * This class is used for creating and managing static or moving background elements in the game.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    /**
     * Creates a background object with a specified image and position.
     * @param {string} imagePath - The path to the image file used for the background object.
     * @param {number} x - The initial horizontal position of the background object.
     */
    constructor(imagePath, x,) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}