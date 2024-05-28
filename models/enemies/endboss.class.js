/**
 * Represents the Endboss in the game with multiple animation states and behaviors.
 * Extends MovableObject to utilize basic positional attributes and advanced animation capabilities.
 */
class Endboss extends MovableObject {
    height = 450;
    width = 350;
    y = -100;
    health = 100;
    name = 'Endboss';
    animationInterval = null;
    verticalMovement = null;
    hadFirstContact = false;
    movingSpeed = 10;
    bossSpawned = false;
    soundManager = SoundManager.instance;



    IMAGES_SWIMMING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png',
    ];

    IMAGES_ENDBOSS_DEAD =  [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
    ];

    IMAGES_ENDBOSS_INTRO = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ];

    IMAGES_ENDBOSS_HURT =  [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
    ];

    IMAGES_ENDBOSS_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png',
    ];
    /**
     * Initializes a new Endboss object with default settings and loads various animations.
     */
    constructor() {
        super().loadImage(this.IMAGES_ENDBOSS_INTRO[0]);
        this.loadImages(this.IMAGES_ENDBOSS_INTRO);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_ENDBOSS_DEAD);
        this.loadImages(this.IMAGES_ENDBOSS_HURT);
        this.loadImages(this.IMAGES_ENDBOSS_ATTACK);
        this.x = 2700;
        this.animate();
    }
    /**
     * Manages continuous animations and interactions of the Endboss.
     */
    animate() {
        let i = 0;
         this.animationInterval = setInterval(() => {
            if(!this.enemyIsDead() && this.hadFirstContact) {
                if (i < 9) {
                    this.playAnimation(this.IMAGES_ENDBOSS_INTRO);
                }else {
                    this.bossSpawned = true;
                }
                i++;
                if(world.character.x >= 2340 && !this.hadFirstContact) {
                    i = 0;
                }
            } 
            if(this.bossSpawned) {
                if(!world.character.isDead()) {
                    this.soundManager.play('endbossSwimming');
                } else {
                    this.soundManager.stop('endbossSwimming');
                }
                this.playAnimation(this.IMAGES_SWIMMING);
                this.followPlayer();
                this.attackPlayer();
            }
        }, 150);
         
    }

    /**
     * Inflicts damage to the Endboss and triggers hurt animation and sound.
     * @param {number} damage - The amount of damage inflicted on the Endboss.
     */
    enemyHit(damage) {
        this.health -= damage;
        if(!this.enemyIsDead()){
            this.playAnimationOnce(this.IMAGES_ENDBOSS_HURT);
            this.soundManager.playMultipleSoundsAtOnce('endbossHurt');
        }

    }

    /**
     * Checks if the Endboss is dead.
     * @returns {boolean} True if Endboss's health is zero or less, false otherwise.
     */
    enemyIsDead() {
        return this.health <= 0;
    }

    /**
     * Plays the death animation of the Endboss and handles cleanup upon animation completion.
     * @returns {Promise} A promise that resolves when the death animation completes.
     */
    playDeathAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
        return new Promise((resolve) => {
            this.playAnimationOnce(this.IMAGES_ENDBOSS_DEAD, () => {
                this.soundManager.stop('endbossBackgroundMusic');
                clearInterval(this.verticalMovement);
                this.verticalMovement = null;    
                resolve();
            });
        });
    }

    /**
     * Adjusts the Endboss's position to follow the player's movements.
     */
    followPlayer() {
        if(this.bossSpawned) {
            if(this.x < world.character.x - 250) {
                this.x += this.movingSpeed;
                this.otherDirection = true; 
            }  
            if(this.x > world.character.x + 100) {
                this.x -= this.movingSpeed;
                this.otherDirection = false; 
            }
            
            if(this.y < world.character.y - 200) {
                this.y += this.movingSpeed;
            }
            if(this.y > world.character.y - 200) {
                this.y -= this.movingSpeed;
            }
        }
    }
    
    /**
     * Triggers an attack animation if the Endboss is colliding with the player.
     */
    attackPlayer() {
        if(world.character.isColliding(this, 'normalCollision', 'Endboss') && !world.character.isDead()) {
            this.playAnimationOnce(this.IMAGES_ENDBOSS_ATTACK);
        }
    }
}