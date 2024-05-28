/**
 * Represents the entire game world, including all characters, enemies, and environmental objects.
 * Manages interactions, collisions, and rendering of all game elements.
 */
class World {
    character = new Character();
    soundManager = SoundManager.instance;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    poisonBar = new PoisonedBubbles();
    endbossHealthBar = new EndbossHealthBar();
    bubbleAttacks = [];
    isAnimating = false;
    endbossEncounterStarted = false;

    /**
     * Initializes the game world with necessary game components and rendering contexts.
     * @param {HTMLCanvasElement} canvas - The canvas on which the game is drawn.
     * @param {Object} keyboard - Object managing the keyboard input for player interactions.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.gameIsPaused = false;

    }
    
    /**
     * Assigns the current world instance to the character for reference.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Manages background music changes based on the game state and character location.
     */
    manageMusic() {
        if(!this.character.isDead()){
            if (this.character.x <= 2340 && !this.endbossEncounterStarted) {
                this.soundManager.play("backgroundMusic");
            }
            if (this.character.x >= 2340 && !this.endbossEncounterStarted) {
                this.soundManager.stop("backgroundMusic");
                this.soundManager.play("endbossBackgroundMusic");
                this.endbossEncounterStarted = true;
            }
        }
        else {
            setTimeout(() => {
                this.soundManager.stopAllSounds();
            }, 3500);
        }
    }

    /**
     * Checks for collisions between bubble attacks and enemies and handles their interactions.
     */
    checkBubbleCollisions() {
        this.bubbleAttacks.forEach((bubble, bubbleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bubble.isColliding(enemy, "bubbleAttack")) {
                    this.handleCollisionByEnemyType(bubble, bubbleIndex, enemy, enemyIndex);
                }
            });
        });
    }

    /**
     * Handles collisions based on the type of the enemy involved.
     * @param {BubbleAttack} bubble - The bubble that is colliding.
     * @param {number} bubbleIndex - Index of the bubble in the bubbleAttacks array.
     * @param {Enemy} enemy - The enemy involved in the collision.
     * @param {number} enemyIndex - Index of the enemy in the level.enemies array.
     */
    handleCollisionByEnemyType(bubble, bubbleIndex, enemy, enemyIndex) {
        if (enemy.name === "JellyFish") {
            this.handleJellyFishCollision(bubble, bubbleIndex, enemy, enemyIndex);
        } else if (enemy.name === "Endboss") {
            this.handleEndbossCollision(bubble, bubbleIndex, enemy, enemyIndex);
        }
    }

    /**
     * Specific handling for collisions with JellyFish.
     * @param {BubbleAttack} bubble - The bubble that is colliding.
     * @param {number} bubbleIndex - Index of the bubble in the bubbleAttacks array.
     * @param {Enemy} enemy - The JellyFish enemy.
     * @param {number} enemyIndex - Index of the enemy in the level.enemies array.
     */
    handleJellyFishCollision(bubble, bubbleIndex, enemy, enemyIndex) {
        enemy.playDeathAnimation();
        this.soundManager.play('jellyFishDead');  
        setTimeout(() => {
            this.level.enemies.splice(enemyIndex, 1);
        }, 600);
        this.bubbleAttacks.splice(bubbleIndex, 1);
    }

    /**
     * Specific handling for collisions with Endboss.
     * @param {BubbleAttack} bubble - The bubble that is colliding.
     * @param {number} bubbleIndex - Index of the bubble in the bubbleAttacks array.
     * @param {Enemy} enemy - The Endboss enemy.
     * @param {number} enemyIndex - Index of the enemy in the level.enemies array.
     */
    handleEndbossCollision(bubble, bubbleIndex, enemy, enemyIndex) {
        enemy.enemyHit(bubble.damage);
        this.endbossHealthBar.setPercentage(enemy.health);
        this.bubbleAttacks.splice(bubbleIndex, 1);
        if (enemy.enemyIsDead()) {
            this.soundManager.playForDuration("endbossDead", 1000);
            enemy.playDeathAnimation();
            setTimeout(() => {
                this.level.enemies.splice(enemyIndex, 1);
                showYouWinScreen();
            }, 1000);
            setTimeout(() => {
                this.soundManager.toggleMute(); 
            }, 3000);
        }
    }

    /**
     * Checks for collisions between the character and coin objects.
     */
    checkCoinCollision() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin, "normalCollision")) {
                this.character.coinCollected();
                this.soundManager.playMultipleSoundsAtOnce("collectCoin");
                this.coinBar.setPercentage(this.character.coins);
                this.level.coins.splice(index, 1);
                this.ctx.clearRect(coin.x, coin.y, coin.width, coin.height);
                return;
            }
        });
    }

    /**
     * Checks for collisions between the character and poison bottle objects.
     */
    checkPoisonBottleCollision() {
        this.level.poisonBottle.forEach((bottle, index) => {
            if (this.character.isColliding(bottle, "normalCollision")) {
                this.character.poisonBottleCollected();
                this.soundManager.playMultipleSoundsAtOnce("collectBottle");
                this.poisonBar.setPercentage(this.character.poisonedBottles);
                this.level.poisonBottle.splice(index, 1);
                this.ctx.clearRect(bottle.x, bottle.y, bottle.width, bottle.height);
                return
            }
        });
    }

    /**
     * Checks for collisions between the character and enemy objects.
     */
    checkEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy, "normalCollision", enemy.name)) {
                if (enemy.name == "JellyFish") {
                    enemy.isElectrified = true;
                    setTimeout(() => {
                        enemy.isElectrified = false;
                    }, 2000);
                } else if (enemy.name == "PufferFish") {
                    enemy.isTouchingSharkie = true;
                }
                this.character.lastEnemyType = enemy.name;
                this.character.hit();
                this.healthBar.setPercentage(this.character.health);
            }
        });
    }

    /**
     * Main collision detection and management function. Checks all types of collisions and handles them.
     */
    checkCollisions() {
        setInterval(() => {
            this.checkBubbleCollisions();
            this.manageMusic();
            this.checkCoinCollision();
            this.checkPoisonBottleCollision();
        }, 100);
        setInterval(() => {
            this.checkEnemyCollision();
        }, 200);
    }

    /**
     * Draws all game objects to the canvas. This function is called repeatedly to update the game's visual elements.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisonBottle);
        this.addObjectsToMap(this.level.lights);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.poisonBar);
        if(this.endbossEncounterStarted) {
            this.addToMap(this.endbossHealthBar);
        }
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.bubbleAttacks);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);
        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the map for rendering.
     * @param {DrawableObject[]} objects - Array of drawable objects to be added to the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single movable object to the map for rendering.
     * @param {MovableObject} movableObject - The object to draw on the canvas.
     */ 
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        // movableObject.drawFrame(this.ctx);

        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }

    /**
     * Flips the image of a drawable object horizontally.
     * @param {MovableObject} movableObject - The object whose image is to be flipped.
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    /**
     * Restores the flipped image of a drawable object to its original orientation.
     * @param {MovableObject} movableObject - The object whose image was flipped.
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}
