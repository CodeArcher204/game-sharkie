/**
 * Represents a graphical indicator of poisoning level in the game, showing different stages of poison effect through visual elements.
 * Extends DrawableObject to leverage image loading and drawing capabilities.
 */
class PoisonedBubbles extends DrawableObject {
    IMAGES = [
        "img/4. Marcadores/green/poisoned bubbles/0_poison.png",
        "img/4. Marcadores/green/poisoned bubbles/20_poison.png",
        "img/4. Marcadores/green/poisoned bubbles/40_poison.png",
        "img/4. Marcadores/green/poisoned bubbles/60_poison.png",
        "img/4. Marcadores/green/poisoned bubbles/80_poison.png",
        "img/4. Marcadores/green/poisoned bubbles/100_poison.png",
    ];
    /**
     * Initializes a new PoisonedBubbles instance with predefined images and default properties.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 70;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0);
    }
    
    /**
     * Sets the displayed poison level based on a percentage and updates the visual representation accordingly.
     * @param {number} percentage - The percentage of poisoning to display, typically between 0 and 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        if (this.imageCache[path]) {
            this.img = this.imageCache[path];
        }
    }

    /**
     * Resolves the index of the image to display based on the current percentage of poisoning.
     * @returns {number} The index of the image in the IMAGES array that corresponds to the current poisoning level.
     */
    resolveImageIndex() {
        if (this.percentage == 5) {
            return 5;
        } else if (this.percentage == 4) {
            return 4;
        } else if (this.percentage == 3) {
            return 3;
        } else if (this.percentage == 2) {
            return 2;
        } else if (this.percentage == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
