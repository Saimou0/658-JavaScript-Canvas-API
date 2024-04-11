export class Spike {
    constructor (game, x, y, width, height, shouldMove, moveDirection, speed) {
        this.game = game;
        this.x = x * this.game.width;
        this.y = y * this.game.height;
        this.width = width * this.game.width;
        this.height = height * this.game.height;
        
        this.shouldMove = shouldMove;
        this.speed = speed;

        this.originalX = this.x;
        this.originalY = this.y;

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
        context.stroke();
    }

    draw(context) {
        this.traceOutline(context);

        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        if(this.shouldMove) {
            if(this.moveDirection === 1) {
                this.y += this.velocity.y;
                // this.x += this.velocity.x;
    
                if(this.y - this.originalY >= 450) {
                    this.velocity.y = -this.speed;
                }
                
                if(this.y <= this.originalY) {
                    this.velocity.y = this.speed;
                }
                console.log(this.y, this.originalY)
            } else {
                this.x += this.velocity.x;
                // this.y += this.velocity.y;
    
                if(this.x - this.originalX >= 100) {
                    this.velocity.x = -this.speed;
                }

                if(this.x === this.originalX) {
                    this.velocity.x = this.speed;
                }
            }
        }
    }

    // spikeMovement()  {

    //     // Movement left
    //     if(this.moveDirection === 0) {
    //         if(this.x == this.endPosition) {
    //             if(this.x < this.originalX) {
    //                 this.x += this.speed;
    //             }
    //         }

    //         if(this.x > this.endPosition) {
    //             this.x -= this.speed;
    //             console.log(this.x, this.endPosition, this.startpos, this.originalX)
    //         }
    //     } 
        
    //     // Movement right
    //     if(this.moveDirection === 1) {
    //         if(this.x == this.endPosition) {
    //             this.endPosition = this.originalX;
    //             this.moveDirection = 0;
    //         }

    //         if(this.startpos < this.endPosition) {
    //             this.x += this.speed;
    //         }
    //     }

    //     // Movement up
    //     if(this.moveDirection === 2) {
    //         if(this.startpos > this.endPosition) {
    //             this.y -= this.speed;
    //         }
    //     }

    //     // Movement down
    //     if(this.moveDirection === 3) {
    //         if(this.startpos < this.endPosition) {
    //             this.y += this.speed;
    //         }
    //     }
    // }
}