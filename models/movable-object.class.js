/**
 * Base class for objects that can move and be animated within the game.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    speed = 10;
    otherDirection = false;
    isAnimating = false;
    health = 100;
    lastHit = 0;
    markedForDeletion = false;
    movingUpOrDown = false;
    verticalMovement = null;

    /**
     * Plays a repeated animation sequence for the object.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        if (!this.isAnimating) {
            this.isAnimating = true;
            // walk animation
            let i = this.currentImage % images.length; // let i = 0 % 6; => Rest 0
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            this.isAnimating = false;
        }
    }

    /**
     * Plays an animation sequence once and executes a callback function on completion.
     * @param {string[]} images - Array of image paths for the animation.
     * @param {Function} callback - Callback function to execute after animation ends.
     */
    playAnimationOnce(images, callback) {
        if (!this.isAnimating) {
            this.isAnimating = true;
            let animationFrame = 0;
            const animationInterval = setInterval(() => {
                if (animationFrame < images.length) {
                    let path = images[animationFrame++];
                    this.img = this.imageCache[path];
                } else {
                    clearInterval(animationInterval);
                    this.isAnimating = false;
                    if (callback) callback();
                }
            }, 100);
        }
    }
    
    /**
     * Initiates the object's movement to the left at the object's speed.
     */
    moveLeft() {
            setInterval(() => {
                this.x -= this.speed;
            }, 1000 / 60);
    }
    /**
     * Initiates vertical movement for the object within specified boundaries.
     */
    moveUpAndDown() {
        if (this.verticalMovement) {
            clearInterval(this.verticalMovement);
        }
        this.verticalMovement = setInterval(() => {
            if (this.y <= 0) {
                this.movingUpOrDown = false;
            }else if (this.y >= 330) {
                this.movingUpOrDown = true; 
            }
           
            if (this.movingUpOrDown) {
                this.y -= this.speed; 
            } else {
                this.y += this.speed; 
            }
        }, 1000 / 60);
    }
    /**
     * Determines if this object is colliding with another object based on specified attack type and enemy type.
     * @param {MovableObject} mo - The other movable object to check for collision.
     * @param {string} attackType - Type of attack ('bubbleAttack' or 'normalCollision').
     * @param {string} enemyName - Name of the enemy to consider for specific collision logic.
     * @returns {boolean} True if colliding, false otherwise.
     */
    isColliding(mo, attackType, enemyName) {
        if(attackType === 'bubbleAttack' && enemyName !== 'Endboss') {
            return (this.x + (this.width * 0.1) < mo.x + mo.width) &&
            (this.x + this.width - (this.width * 0.1) > mo.x) &&
            (this.y + (this.height * 0.1) < mo.y + mo.height) &&
            (this.y + this.height - (this.height * 0.1) > mo.y);
        } else if(attackType === 'normalCollision' && enemyName !== 'Endboss') {
            return this.x + 50 + (this.width - 100) > mo.x && 
            this.x + 50 < mo.x + mo.width &&
            this.y + 125 < mo.y + mo.height &&
            this.y + 100 + (this.height - 150) > mo.y;
        } else if (attackType === 'normalCollision' && enemyName === 'Endboss') {
            return this.x + 60 + (this.width - 115) > mo.x + 10 &&
            this.x + 60 < mo.x + 10 + mo.width - 30 &&
            this.y + 120 < mo.y + 195 + mo.height - 250 &&
            this.y + (this.height - 55) > mo.y + 195
        }
    }
    /**
     * Reduces the health of the object when hit.
     */
    hit() {
        this.health -= 5;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    /**
     * Checks if the object's health has reached zero.
     * @returns {boolean} True if dead, false otherwise.
     */
    isDead() {
        return this.health == 0;
    }
    /**
     * Checks if the object is currently in a "hurt" state based on the last time it was hit.
     * @returns {boolean} True if hurt within the last second, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }
    /**
     * Applies damage to the object's health as a result of an enemy's attack.
     */
    enemyHit() {
        this.health -= 50;
    }
    /**
     * Checks if the object's health is at or below zero as a result of being hit by an enemy.
     * @returns {boolean} True if enemy is dead, false otherwise.
     */
    enemyIsDead() {
        return this.health <= 0;
    }

    /**
     * Handles the effects of hitting an enemy.
     * @param {Object} enemy - The enemy object that was hit.
     */
    handleEnemyHit(enemy) {
        enemy.enemyHit(this.baseDamage);
        if (enemy.name === 'Endboss') {
            this.handleEndbossHit(enemy);
        }
    }
    
    /**
     * Manages the Healthbar when hitting an 'Endboss' enemy.
     * @param {Object} enemy - The Endboss enemy object.
     */
    handleEndbossHit(enemy) {
        world.endbossHealthBar.setPercentage(enemy.health);
    }

    /**
     * logic for handling the death of an Endboss.
     * @param {number} index - The index of the Endboss in the enemies array.
     * @param {Enemy} enemy - The Endboss enemy object.
     */
    handleEndbossDeath(index, enemy) {
        enemy.soundManager.playForDuration("endbossDead", 900);
        this.world.level.enemies.splice(index, 1);
        setTimeout(() => {
            this.soundManager.play('youWin');
            showYouWinScreen();
        }, 1000);
        setTimeout(() => {
            this.soundManager.toggleMute();
        }, 3000);
    }

    /**
     * Removes an enemy from the game after they die.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    removeEnemy(index) {
        this.world.level.enemies.splice(index, 1);
        // correct the index after deleting enemy
        index--;
    }
}
