import { Player } from './player.js';
import { InputHandler } from './inputHandler.js';
import { Platform } from './platform.js';
import { Goal } from './goal.js';

// https://stackoverflow.com/questions/67758479/how-to-fit-html-canvas-to-screen-while-maintaining-aspect-ratio-and-not-cutting

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Game {
        constructor(width, height) {
            this.aspectRatio = 16 / 9;
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.sideMargin = 20;

            if(this.width / this.height > this.aspectRatio) {
                this.width = this.height * this.aspectRatio;
            }

            if(this.width / this.height < this.aspectRatio) {
                this.height = this.width / this.aspectRatio;
            }

            this.InputHandler = new InputHandler();
            this.player = new Player(this);

            
            
            // luo tasoja
            this.platforms = [
                new Platform(this, 400, 663, 100, 217),
                new Platform(this, 600, 600, 20, 100),
                new Platform(this, 800, 600, 20, 100),
                new Platform(this, 900, 500, 20, 100),
            ];

            this.goal = new Goal(this, 400, 500, 100, 100);
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

