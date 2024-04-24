export class Spike {
    constructor (game, x, y, width, height, shouldMove, moveDirection, speed, moveDistance) {
        this.game = game;
        this.x = x * this.game.width;
        this.y = y * this.game.height;
        this.width = width * this.game.width;
        this.height = height * this.game.height;
        
        this.shouldMove = shouldMove;
        this.speed = speed;

        this.originalX = this.x;
        this.originalY = this.y;

        this.moveDistance = moveDistance;

        // Decide the move direction, either the x or y axis
        // 0 = x axis, 1 = y axis
        this.moveDirection = moveDirection;
        if(moveDirection === 0) {
            this.velocity = { x: speed, y: 0 };
        } else {
            this.velocity = { x: 0, y: speed };
        }
    }
    
    traceOutline(context) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y);
        context.lineTo(this.x + this.width, this.y + this.height);
        context.lineTo(this.x, this.y + this.height);
        context.lineTo(this.x, this.y);
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        
        context.shadowBlur = 10;
        context.shadowColor = 'red';
        
        context.stroke();
    }

    draw(context) {
        this.traceOutline(context);

        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);

        context.shadowBlur = 0;
        context.shadowColor = 'transparent';
    }

    update() {
        if(this.shouldMove) {
            // Movement y axis
            if(this.moveDirection === 1) {
                this.y += this.velocity.y;
    
                if(this.y - this.originalY >= this.moveDistance) {
                    this.velocity.y = -this.speed;
                }
                
                if(this.y <= this.originalY) {
                    this.velocity.y = this.speed;
                }
            } 
            // Movement x axis
            else {
                this.x += this.velocity.x;
    
                if(this.x - this.originalX >= this.moveDistance) {
                    this.velocity.x = -this.speed;
                }

                if(this.x === this.originalX) {
                    this.velocity.x = this.speed;
                }
            }
        }
    }

}
