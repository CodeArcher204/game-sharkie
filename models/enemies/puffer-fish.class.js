/**
 * Represents a Puffer Fish enemy in the game with multiple animation states and behaviors.
 * Extends MovableObject to utilize basic positional attributes and advanced animation capabilities.
 */
class Puffer_Fish extends MovableObject {
    height = 80;
    width = 80;
    health = 50;
    animationInterval = null;
    verticalMovement = null;
    name = "PufferFish";
    isTouchingSharkie = false;
    hasTransitioned = false;
    soundManager = SoundManager.instance;

    IMAGES_SWIMMING = [
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
    ];

    IMAGES_DEAD = [
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/Dead_1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/Dead_2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/Dead_3.png",
    ];

    IMAGES_TRANSITION = [
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png",
    ];

    IMAGES_BUBBLESWIM = [
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png",
        "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png",
    ];
    /**
     * Initializes a new Puffer Fish object with default settings and loads various animations.
     */
    constructor() {
        super().loadImage("img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png");
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_TRANSITION);
        this.loadImages(this.IMAGES_BUBBLESWIM);
        this.x = 350 + Math.random() * 1800;
        this.y = Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.25;
        this.markedForDeletion = false;
        this.animate();
    }
    /**
     * Manages continuous animations and interactions of the Puffer Fish.
     */
    animate() {
        this.moveLeft();
        this.moveUpAndDown();
        this.animationInterval = setInterval(() => {
            if (this.isTouchingSharkie && !this.hasTransitioned) {
                this.playTransitionAnimation();
            } else if (this.hasTransitioned) {
                this.playAnimation(this.IMAGES_BUBBLESWIM);
                this.width = 100;
            } else {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 250);
    }

    /**
     * Plays the transition animation with sound effect and sets the state to transitioned upon completion.
     */
    playTransitionAnimation() {
        this.playAnimation(this.IMAGES_TRANSITION);
        this.soundManager.play("pufferFish");
        setTimeout(() => {
            this.hasTransitioned = true;
        }, this.IMAGES_TRANSITION.length);
    }
    /**
     * Plays the death animation of the Puffer Fish and handles cleanup upon animation completion.
     * @returns {Promise} A promise that resolves when the death animation completes.
     */
    playDeathAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
        this.verticalMovement = setInterval(() => {
            this.y -= 15;
        }, 100);
        return new Promise((resolve) => {
            this.soundManager.play("pufferFishDead");
            this.playAnimationOnce(this.IMAGES_DEAD, () => {
                clearInterval(this.verticalMovement);
                this.verticalMovement = null;
                resolve();
            });
        });
    }
}
