class BubbleAttack extends MovableObject {
    /**
     * Initializes a new instance of BubbleAttack with specific properties.
     * @param {number} x - The initial horizontal position of the bubble.
     * @param {number} y - The initial vertical position of the bubble.
     * @param {boolean} isPowerful - Determines if the bubble is a more damaging poisoned bubble.
     * @param {number} damage - The damage the bubble will inflict if it hits an enemy.
     * @param {boolean} otherDirection - Indicates if the bubble should move in the reverse direction.
     */
    constructor(x, y, isPowerful, damage, otherDirection) {
        super();
        this.height = 60;
        this.width = 60;
        this.x = x;
        this.y = y;
        this.damage = damage;
        this.otherDirection = otherDirection;

        if(isPowerful) {
            this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');

        }else {
            this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        }
        this.throw(x, y,);
    }
    
    /**
     * Defines the motion of the bubble, causing it to move in its initial direction and adjusting its trajectory.
     * @param {number} x - The horizontal position from which the bubble is thrown.
     * @param {number} y - The vertical position from which the bubble is thrown.
     */
    throw(x, y) {
        this.x = x;
        this.y = y;
        setInterval(() => {
            if(this.otherDirection) {
                this.x -= 12; 
            } else {
                this.x += 12; 
            }
            this.y -= 2; 
        }, 120);
    }
}