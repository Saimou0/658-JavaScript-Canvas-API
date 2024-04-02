import { Player } from './player.js';
import { InputHandler } from './inputHandler.js';
import { Platform } from './platform.js';
import { Goal } from './goal.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.sideMargin = 20;


            this.InputHandler = new InputHandler();
            this.player = new Player(this);

            
            
            // Create platforms
            this.platforms = [
                new Platform(this, 0.3, 0.715, 0.07, 0.23),
                new Platform(this,  0.45, 0.056, 0.1, 0.66),
                new Platform(this,  0.67, 0.214, 0.1, 0.5),
                new Platform(this, 0.63, 0.715, 0.07, 0.23),
                
                // Ledges
                new Platform(this, 0.551, 0.50, 0.05, 0.02),
                new Platform(this, 0.619, 0.3, 0.05, 0.02),
            ];

            this.goal = new Goal(this, 0.70, 0.715, 0.067, 0.23);
        }

        update(deltaTime) {
            this.player.update(this.InputHandler.keys, deltaTime, this.platforms, this.goal);
        }

        draw(context) {

            this.drawGameArea(context);

            this.platforms.forEach(platform => platform.draw(context))

            this.player.draw(context);

            this.goal.draw(context);

        }

        drawGameArea(context) {
            context.beginPath();

            context.moveTo(20, this.height - this.groundMargin); // vasen alakulma
            context.lineTo(this.width - this.sideMargin, this.height - this.groundMargin); // oikea alakulma
            context.lineTo(this.width - this.sideMargin, 50); // oikea yläkulma
            context.lineTo(20, 50); // vasen yläkulma
            context.lineTo(20, this.height-this.groundMargin); // vasen alakulma

            context.strokeStyle = 'white';
            context.lineWidth = 2;
            context.stroke();
        }
    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;
    let currentTime = 0;
    
    function animate(currentTime) {
        let fpsInterval = 1000 / 60;
        const deltaTime = (currentTime - lastTime);
        
        if(deltaTime > fpsInterval) {
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            game.draw(ctx);
            game.update(deltaTime);

                        
            lastTime = currentTime;
            // console.log(deltaTime);
        }
        
        requestAnimationFrame(animate);
    }

    animate(currentTime)

});

