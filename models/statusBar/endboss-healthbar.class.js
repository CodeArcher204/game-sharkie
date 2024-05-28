/**
 * Represents the health bar for the end boss in the game, displaying different stages of health through visual elements.
 * Extends DrawableObject to utilize image loading and drawing capabilities.
 */
class EndbossHealthBar extends DrawableObject {
    IMAGES = [
        "img/4. Marcadores/orange/orange_health.png",
        "img/4. Marcadores/orange/orange_health20.png",
        "img/4. Marcadores/orange/orange_health40.png",
        "img/4. Marcadores/orange/orange_health60.png",
        "img/4. Marcadores/orange/orange_health80.png",
        "img/4. Marcadores/orange/orange_health100.png",
    ];

    percentage = 100;
    /**
     * Initializes a new instance of EndbossHealthBar with predefined images and default properties.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 430;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }

    /**
     * Sets the displayed health level based on a percentage and updates the visual representation accordingly.
     * @param {number} percentage - The percentage of health to display, typically between 0 and 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        if (this.imageCache[path]) {
            this.img = this.imageCache[path];
        } else {
            console.error("Bild nicht im Cache gefunden oder nicht geladen:", path);
        }
    }
    
    /**
     * Resolves the index of the image to display based on the current percentage of health.
     * @returns {number} The index of the image in the IMAGES array that corresponds to the current health level.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 70) {
            return 4;
        } else if (this.percentage > 50) {
            return 3;
        } else if (this.percentage > 30) {
            return 2;
        } else if (this.percentage > 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
