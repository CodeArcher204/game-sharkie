/**
 * Represents a JellyFish enemy in the game with multiple animation states for swimming, being electrified, and dying.
 * Extends MovableObject to utilize basic positional attributes and animation capabilities.
 */
class JellyFish extends MovableObject {
    height = 80;
    width = 80;
    health = 100;
    animationInterval = null;
    verticalMovement = null;
    name = "JellyFish";
    isElectrified = false;
    soundManager = SoundManager.instance;

    IMAGES_SWIMMING = [
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
        "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
    ];

    IMAGES_DEAD = [
        "img/2.Enemy/2 Jelly fish/Dead/green/g1.png",
        "img/2.Enemy/2 Jelly fish/Dead/green/g2.png",
        "img/2.Enemy/2 Jelly fish/Dead/green/g3.png",
        "img/2.Enemy/2 Jelly fish/Dead/green/g4.png",
    ];

    IMAGES_ELECTRIC = [
        "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
        "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
        "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
        "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
    ];
    /**
     * Initializes a new JellyFish object with default settings and loads various animations.
     */
    constructor() {
        super().loadImage("img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png");
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ELECTRIC);
        this.x = 800 + Math.random() * 1800;
        this.y = Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    } 
    /**
     * Manages continuous animations and interactions of the JellyFish.
     */
    animate() {
        this.moveLeft();
        this.moveUpAndDown();
        setInterval(() => {
            if (!this.isElectrified) {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
            if (this.isElectrified) {
                this.soundManager.playForDuration("sharkieElectric", 1800);
                this.playAnimation(this.IMAGES_ELECTRIC);
            }
        }, 250);
    } 
    /**
     * Plays the death animation of the JellyFish and handles cleanup upon animation completion.
     * @returns {Promise} A promise that resolves when the death animation completes.
     */
    playDeathAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
        this.verticalMovement = setInterval(() => {
            this.y -= 35;
            this.x += 15;
        }, 100);
        return new Promise((resolve) => {
            this.playAnimationOnce(this.IMAGES_DEAD, () => {
                clearInterval(this.verticalMovement);
                this.verticalMovement = null;
                resolve();
            });
        });
    }
}
