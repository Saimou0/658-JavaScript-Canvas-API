import { Player } from './player.js';
import { InputHandler } from './inputHandler.js';
import { Platform } from './platform.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;

    this.window.onresize = resizeCanvas;
    
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.sideMargin = 20;

            this.InputHandler = new InputHandler();
            this.player = new Player(this);
            
            // luo tasoja
            this.platforms = [
                new Platform(this, 400, 663, 100, 217),
                new Platform(this, 600, 600, 20, 100),
                new Platform(this, 800, 600, 20, 100),
                new Platform(this, 1000, 500, 20, 100),
            ];
        }

        update(deltaTime) {
            this.player.update(this.InputHandler.keys, deltaTime, this.platforms);

        }

        draw(context) {

            this.drawGameArea(context);

            this.platforms.forEach(platform => platform.draw(context))

            this.player.draw(context);


        }

        drawGameArea(context) {
            context.beginPath();

            context.moveTo(20, this.height-this.groundMargin);
            context.lineTo(this.width - 20, this.height-this.groundMargin);
            context.lineTo(this.width - 20, 50);
            context.lineTo(20, 50);
            context.lineTo(20, this.height-this.groundMargin);
        
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

    function resizeCanvas() {
        canvas.width = this.innerWidth;
        canvas.height = this.innerHeight;
    }
});

