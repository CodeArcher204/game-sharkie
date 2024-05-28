/**
 * Represents a game level containing all relevant game objects like enemies, collectibles, and environment features.
 */
class Level {
    enemies;
    lights;
    coins;
    poisonBottle;
    backgroundObjects;
    level_end_x = 3200;

    /**
     * Constructs a new game level with specified objects.
     * @param {Array} enemies - Array of enemy objects present in the level.
     * @param {Array} lights - Array of light objects used for illumination effects in the level.
     * @param {Array} backgroundObjects - Array of background objects that make up the environmental setting.
     * @param {Array} coins - Array of collectible coins placed throughout the level.
     * @param {Array} poisonBottle - Array of poison bottles that the player can collect.
     */
    constructor(enemies, lights, backgroundObjects, coins, poisonBottle) {
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.poisonBottle = poisonBottle;
    }

    /**
     * Resets the level to its initial state. Intended to restart the level.
     */
    reset() {
        this.init()
    }
}