/**
 * Represents a poison bottle in the game that can animate through a series of images to show its content dynamically.
 * Extends MovableObject to utilize basic movement and animation functionalities.
 */
class poisonBottle extends MovableObject {
    IMAGES = [
        "img/4. Marcadores/Posión/Animada/1.png",
        "img/4. Marcadores/Posión/Animada/2.png",
        "img/4. Marcadores/Posión/Animada/3.png",
        "img/4. Marcadores/Posión/Animada/4.png",
        "img/4. Marcadores/Posión/Animada/5.png",
        "img/4. Marcadores/Posión/Animada/6.png",
        "img/4. Marcadores/Posión/Animada/7.png",
        "img/4. Marcadores/Posión/Animada/8.png",
    ];
    /**
     * Constructs a poison bottle with a specified position and preloads images for animation.
     * @param {number} x - The initial horizontal position of the poison bottle.
     * @param {number} y - The initial vertical position of the poison bottle.
     */
    constructor(x, y) {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.loadImages(this.IMAGES);
        this.width = 60;
        this.height = 60;
        this.x = x;
        this.y = y;

        this.animate();
    }
    /**
     * Initiates or continues the animation of the poison bottle by cycling through its images.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 350)
    }
}