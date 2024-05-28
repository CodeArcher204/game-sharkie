/**
 * Represents a coin collection bar in the game, displaying different stages of coin collection through visual elements.
 * Extends DrawableObject to utilize image loading and drawing capabilities.
 */
class CoinBar extends DrawableObject {
    IMAGES = [
        "img/4. Marcadores/green/Coin/0_coin.png",
        "img/4. Marcadores/green/Coin/20_coin.png",
        "img/4. Marcadores/green/Coin/40_coin.png",
        "img/4. Marcadores/green/Coin/60_coin.png",
        "img/4. Marcadores/green/Coin/80_coin.png",
        "img/4. Marcadores/green/Coin/100_coin.png",
    ];
    /**
    * Initializes a new instance of CoinBar with predefined images and default properties.
    */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 35;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0);
    };

    /**
    * Sets the displayed coin collection level based on a percentage and updates the visual representation accordingly.
    * @param {number} percentage - The percentage of coins collected, typically between 0 and 100.
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
    * Resolves the index of the image to display based on the current percentage of coins collected.
    * @returns {number} The index of the image in the IMAGES array that corresponds to the current coin collection level.
    */
    resolveImageIndex() {
        if(this.percentage >= 100) {
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
