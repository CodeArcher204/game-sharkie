/**
 * Initializes the game level by creating instances of enemies, background objects, coins, and poison bottles.
 * This function sets up the entire environment and characters needed for the game to run.
 */
let level1;
function initLevel() {

    level1 = new Level(
    
        [
            new Puffer_Fish(),
            new Puffer_Fish(),
            new Puffer_Fish(),
            new Puffer_Fish(),
            new Puffer_Fish(),
            new JellyFish(),
            new JellyFish(),
            new JellyFish(),
            new JellyFish(),
            new JellyFish(),
            new Endboss(),
            
        ],
        [
            new Light(),
        ],
        [
            new BackgroundObject('img/3. Background/Layers/5. Water/L.png', 0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L1.png', 0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L1.png', 0),
            new BackgroundObject('img/3. Background/Layers/5. Water/L.png', 719),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', 719),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 719),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', 719),
    
            new BackgroundObject('img/3. Background/Layers/5. Water/L.png', 719 * 2),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L1.png', 719 * 2),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 719 * 2),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L1.png', 719 * 2),
            new BackgroundObject('img/3. Background/Layers/5. Water/L.png', 719 * 3),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', 719 * 3),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 719 * 3),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', 719 * 3),
    
            new BackgroundObject('img/3. Background/Layers/5. Water/L.png', 719 * 4),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L1.png', 719 * 4),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 719 * 4),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L1.png', 719 * 4),
            new BackgroundObject('img/3. Background/Layers/5. Water/L.png', 719 * 5),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', 719 * 5),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 719 * 5),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', 719 * 5),
        ],
        [
            new Coin(500, 350),
            new Coin(530, 300),
            new Coin(600, 280),
            new Coin(650, 280),
            new Coin(710, 300),
            new Coin(750, 350),
        
            new Coin(1000, 150),
            new Coin(1050, 105),
            new Coin(1100, 60),
            new Coin(1150, 105),
            new Coin(1200, 150),
            new Coin(1150, 195),
            new Coin(1100, 240),
            new Coin(1050, 195),
        
            new Coin(1600, 250),
            new Coin(1630, 400),
            new Coin(1700, 300),
            new Coin(1750, 200),
            new Coin(1810, 100),
            new Coin(1850, 350),
        
            new Coin(1900, 50),
            new Coin(1950, 100),
            new Coin(2000, 120),
            new Coin(2050, 120),
            new Coin(2110, 100),
            new Coin(2150, 50),
        ],
        [
            new poisonBottle(630, 360),
            new poisonBottle(1020, 380),
            new poisonBottle(1090, 130),
            new poisonBottle(1700, 350),
            new poisonBottle(2020, 45),
        ]
        
    );
}
