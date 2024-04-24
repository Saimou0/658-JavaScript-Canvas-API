export class Player {
    constructor (game) {
        this.game = game;
        this.width = 74;
        this.height = 96;

        this.x = 0;
        this.y = game.height - this.height - this.game.groundMargin;
        this.vx = 0;
        this.vy = 0;
        this.gravity = 1;
        
        this.maxSpeed = 0.5;

        this.deathCount = 0;

        this.image = new Image();
        this.image.src = 'assets/Character.png';
        this.direction;
    }

    movement(input, deltaTime, platforms, spikes) {
        // Horizontal movement
        if(input.includes('d')) {
            this.vx = this.maxSpeed;
        } else if (input.includes('a')) {
            this.vx = -this.maxSpeed;
        } else {
            this.vx = 0;
        }
        this.x += this.vx * deltaTime;

        this.gameAreaCollision();

        this.verticalMovement(input, platforms);        
        this.vy += this.gravity;

        if(!this.onGround(platforms)) {
            console.log("EI MAASSA " + this.vy);
        } else {
            this.vy = 0;
        }
        
        platforms.forEach(platform => this.handleCollision(platform));
        spikes.forEach(spikes => this.handleSpikeCollision(spikes));

    }

    verticalMovement(input, platforms) {
        this.y += this.vy;
        for(let platform of platforms) {
            if(input.includes('w') && this.onGround(platform) || input.includes('w') && this.onPlatform(platform)){
                if(this.vy === 0) {
                    this.vy -= 20;
                    this.y += this.vy;
                }
            }

        }
    }

    gameAreaCollision() {
        // Oikea reuna
        if(this.x <= this.game.sideMargin) {
            this.x = this.game.sideMargin;
        }
        
        // Vasen reuna
        if(this.x >= this.game.width - this.game.sideMargin - this.width) {
            this.x = this.game.width - this.game.sideMargin - this.width;
        }

        // Alareuna
        if(this.y >= this.game.height - this.height -this.game.groundMargin) {
            this.y = this.game.height - this.height - this.game.groundMargin;
        }

        if(this.y >= this.game.height - this.game.groundMargin) {
            this.y = this.game.height - this.game.groundMargin;
        }

        // yläreuna
        if(this.y < 50) {
            this.vy = 0;
            this.y = 50;
        }
    }

    // Ground, platform and goal collision detection
    onGround() {
        if(this.y >= this.game.height - this.height - this.game.groundMargin) {
            return true;
        }

        return false;
    }

    onPlatform(platform) {
        if(this.y + this.height >= platform.y && this.y + this.height <= platform.y + platform.height && this.x + this.width > platform.x && this.x < platform.x + platform.width) {
            if(this.maxOverlapAxis(platform) === 'y') {
                return true;
            }
        }

        return false;
    }

    checkCollision(object) {
        if(!(this.x + this.width < object.x || this.x > object.x + object.width || this.y + this.height < object.y || this.y > object.y + object.height)) {
            return true;
        }

        return false;
    }
    
    maxOverlapAxis(object) {
        let overlapX = Math.min(this.x + this.width - object.x, object.x + object.width - this.x);
        let overlapY = Math.min(this.y + this.height - object.y, object.y + object.height - this.y);

        return overlapX < overlapY ? 'x' : 'y';

    }

    // Platform collision handling
    handleCollision(platform) {
        if(this.checkCollision(platform)) {
            if(this.maxOverlapAxis(platform) === 'x') {
                if(this.x + this.width - platform.x < platform.x + platform.width - this.x) {
                    this.x = platform.x - this.width;
                } else {
                    this.x = platform.x + platform.width;
                }
            } else {
                if(this.y + this.height - platform.y < platform.y + platform.height - this.y) {
                    this.y = platform.y - this.height;
                    this.vy = 0;
                } else {
                    this.y = platform.y + platform.height;
                }
            }
        }
        // Player can clip to the top of the platform if the platform is 8 pixels abobe the player y + height.
    }

    handleSpikeCollision(spike) {
        if(this.checkCollision(spike)) {
            this.x = 0;
            this.y = this.game.height - this.height - this.game.groundMargin;
            this.deathCount++;
        }
    }

    handleGoalCollision(goal) {
        if(this.checkCollision(goal)) {
            return true;
        } else {
            return false;
        }
    }
    
    draw(context) {
        // Save the current context
        context.save();
        // Put the pen on the player's position
        context.translate(this.x, this.y);

        // Flip the context
        if(this.direction === 'left') {
            context.scale(-1, 1);
        }

        // Draw the player facing the correct way using a ternary operator
        context.drawImage(this.image, this.direction === 'left' ? -this.width : 0, 0, this.width, this.height);
        // Restore the context to the previous saved state
        context.restore();

        // This way we can draw the player facing any direction without affecting other parts of the game.
    }

    update(input, deltaTime, platforms, goal, spikes) {

        // Change the direction varible based on the player velocity
        if(this.vx < 0) {
            this.direction = 'left';
        } else if(this.vx > 0) {
            this.direction = 'right';
        }

        this.movement(input, deltaTime, platforms, spikes);

        this.handleGoalCollision(goal);
        if(this.handleGoalCollision(goal)) {
            this.game.nextLevel();
        }
    }

    
}
