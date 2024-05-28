/**
 * Represents a collectible coin in the game that animates to simulate spinning. Extends MovableObject to incorporate
 * basic positional attributes and animation capabilities.
 */
class Coin extends MovableObject {
    IMAGES = [
        "img/4. Marcadores/1. Coins/1.png",
        "img/4. Marcadores/1. Coins/2.png",
        "img/4. Marcadores/1. Coins/3.png",
        "img/4. Marcadores/1. Coins/4.png",
    ];
    /**
     * Initializes a coin object with specific position settings and loads its animation frames.
     * @param {number} x - The initial horizontal position of the coin.
     * @param {number} y - The initial vertical position of the coin.
     */
    constructor(x, y) { 
        super().loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES);
        this.width = 40;
        this.height = 40;
        this.x = x;
        this.y = y;

        this.animate();
    }

    /**
     * Initiates or continues the animation of the coin by cycling through its images to simulate spinning.
     */
    animate() {
        setInterval(()=> {
            this.playAnimation(this.IMAGES);
        }, 350)
    }
}