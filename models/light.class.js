/**
 * Represents a light object in the game environment, specifically designed to handle the rendering
 * of light-related graphical elements. Extends MovableObject to include movement functionalities if needed.
 */
class Light extends MovableObject {
    y = 0;
    width = 1000;
    height = 200;
    
    /**
     * Initializes a new instance of the Light class, setting up the image and initial properties.
     */
    constructor() {
        super().loadImage("img/3. Background/Layers/1. Light/COMPLETO.png");

        this.x = 230;
    }

}

