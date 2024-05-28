/**
 * Represents a health bar in the game, showing different stages of player health through visual elements.
 * Extends DrawableObject to utilize image loading and drawing capabilities.
 */
class HealthBar extends DrawableObject{
    IMAGES = [
        "img/4. Marcadores/green/Life/0_life.png",
        "img/4. Marcadores/green/Life/20_life.png",
        "img/4. Marcadores/green/Life/40_life.png",
        "img/4. Marcadores/green/Life/60_life.png",
        "img/4. Marcadores/green/Life/80_life.png",
        "img/4. Marcadores/green/Life/100_life.png",
    ];

    percentage = 100;
    /**
     * Initializes a new instance of HealthBar with predefined images and default properties.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
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
        if(this.percentage == 100) {
            return 5;
        }else if(this.percentage > 80) {
            return 4;
        }else if(this.percentage > 60) {
            return 3;
        }else if(this.percentage > 40) {
            return 2;
        }else if(this.percentage > 20) {
            return 1;
        }else {
            return 0;
        }
    }
}