export class Player {
    constructor (game) {
        this.game = game;
        this.width = 74;
        this.height = 96;

        this.x = 0;
        this.y = game.height - this.height - this.game.groundMargin;
        this.vx = 0;
        this.vy = 0;
        this.weight = 1;
        
        this.maxSpeed = 0.5;

        this.image = document.getElementById('player');
    }

    movement(input, deltaTime, platforms) {
        // Horisontaalli liike
        if(input.includes('d')) {
            this.vx = this.maxSpeed;
        } else if (input.includes('a')) {
            this.vx = -this.maxSpeed;
        } else {
            this.vx = 0;
        }

        this.x += this.vx * deltaTime;

        this.gameAreaCollision();
        
        // Vertikaali liike
        this.y += this.vy;
        for(let platform of platforms) {
            if(input.includes('w') && this.onGround(platform) || input.includes('w') && this.onPlatform(platform)){
                if(this.vy === 0) {
                    this.vy -= 20;
                    this.y += this.vy;
                    console.log("HYPPY " + this.vy);

                }
            }

        }
        
        if(!this.onGround(platforms)) {
            this.vy += this.weight;
            console.log("EI MAASSA " + this.vy)
        } else {
            this.vy = 0;
        }
        
    }

    onPlatform(platform) {
        if(this.y + this.height >= platform.y && this.y + this.height <= platform.y + platform.height && this.x + this.width > platform.x && this.x < platform.x + platform.width) {
            console.log("On platform")
            if(this.maxOverlapAxis(platform) === 'y') {
                return true;
            }
        }

        return false;
    }

    onGround() {
        if(this.y >= this.game.height - this.height - this.game.groundMargin) {
            return true;
        }

        return false;
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
            // this.vy = 0;
        }
    }

    checkCollision(platform) {
        if(!(this.x + this.width < platform.x || this.x > platform.x + platform.width || this.y + this.height < platform.y || this.y > platform.y + platform.height)) {
            return true;
        }

        return false;
    }

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

    maxOverlapAxis(platform) {
        let overlapX = Math.min(this.x + this.width - platform.x, platform.x + platform.width - this.x);
        let overlapY = Math.min(this.y + this.height - platform.y, platform.y + platform.height - this.y);

        return overlapX < overlapY ? 'x' : 'y';

    }
    
    draw(context) {
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);

        // Piirtää pelaajan rajat
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.lineWidth = 2;
        context.strokeStyle = 'red';
        context.stroke();

    }

    update(input, deltaTime, platforms) {
        this.movement(input, deltaTime, platforms);

        for(let platform of platforms) {
            if(this.handleCollision(platform)) {
                this.player.handleCollision(platform);
                break;
            }

        }
    }

    
}
