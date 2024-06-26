import { Player } from './Player/player.js';
import { InputHandler } from './Player/inputHandler.js';
import { Platform } from './Obstacles & goal/platform.js';
import { Goal } from './Obstacles & goal/goal.js';
import { Spike } from './Obstacles & goal/spike.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 855;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.sideMargin = 20;

            this.InputHandler = new InputHandler();
            this.player = new Player(this);

            this.level = 0;
            this.levels = [
                // LEVEL 1
                {
                    platforms: [
                        // Create obstacles
                        new Platform(this, 0.3, 0.715, 0.07, 0.226),
                        new Platform(this, 0.305, 0.722, 0.06, 0.212),

                        new Platform(this,  0.45, 0.059, 0.1, 0.65),
                        new Platform(this,  0.455, 0.066, 0.09, 0.634),

                        new Platform(this,  0.67, 0.214, 0.1, 0.5),
                        new Platform(this,  0.675, 0.224, 0.09, 0.48),

                        new Platform(this, 0.63, 0.715, 0.07, 0.226),
                        new Platform(this, 0.635, 0.724, 0.06, 0.21),
                        
                        // Create ledges
                        new Platform(this, 0.551, 0.50, 0.05, 0.02),
                        new Platform(this, 0.619, 0.3, 0.05, 0.02),
                    ],
                    spikes: [
                        // Create spikes
                        new Spike(this, 0.45, 0.929, 0.1, 0.01),
                        new Spike(this, 0.8, 0.929, 0.1, 0.01),
                        new Spike(this, 0.45, 0.065, 0.004, 0.635),
                        new Spike(this, 0.098, 0.929, 0.12, 0.01),
                    ],
                    // Create goal
                    goal: new Goal(this, 0.70, 0.715, 0.01, 0.226)
                },
                // LEVEL 2
                {
                    platforms: [
                        // Create obstacles
                        new Platform(this, 0.15, 0.715, 0.07, 0.226),
                        new Platform(this, 0.1543, 0.724, 0.061, 0.209),

                        new Platform(this,  0.3, 0.059, 0.1, 0.65),
                        new Platform(this,  0.305, 0.068, 0.09, 0.63),

                        new Platform(this,  0.53, 0.214, 0.383, 0.727),
                        new Platform(this,  0.5365, 0.226, 0.369, 0.7),
                        
                        // Create ledges
                        new Platform(this, 0.479, 0.5, 0.05, 0.02),
                        new Platform(this, 0.479, 0.7, 0.05, 0.02),
                        new Platform(this, 0.479, 0.3, 0.05, 0.02),
                    ],
                    spikes: [
                        // Create spikes
                        new Spike(this, 0.402, 0.22, 0.06, 0.01, true, 1, 2, 410),
                        new Spike(this, 0.8, 0.25, 0.1, 0.01, true, 0, 2, 100),
                        new Spike(this, 0.8, 0.7, 0.1, 0.01, true, 0, 1, 100),
                        new Spike(this, 0.289, 0.929, 0.12, 0.01),
                    ],
                    // Create goal
                    goal: new Goal(this, 0.914, 0.92, 0.07, 0.02)
                },
                 
                {
                    platforms: [

                        // X, Y, Width, Height
                        // Create obstacles
                        new Platform(this, 0.1, 0.715, 0.07, 0.226),
                        new Platform(this, 0.105, 0.722, 0.06, 0.211),

                        new Platform(this,  0.171, 0.715, 0.75, 0.05),
                        new Platform(this,  0.176, 0.723, 0.7399, 0.034),

                        new Platform(this, 0.9011, 0.25, 0.02, 0.4635),
                        new Platform(this, 0.906, 0.256, 0.01, 0.451),

                        new Platform(this,  0.016, 0.5, 0.8, 0.05),
                        new Platform(this,  0.021, 0.511, 0.79, 0.027),
                        
                        new Platform(this,  0.1004, 0.25, 0.8, 0.05),
                        new Platform(this,  0.107, 0.2615, 0.7855, 0.027),

                    ],
                    spikes: [
                        // Create spikes
                        // Vertically moving spikes
                        new Spike(this, 0.25, 0.268, 0.06, 0.01, true, 1, 15, 400),
                        new Spike(this, 0.45, 0.268, 0.06, 0.01, true, 1, 15, 400),
                        new Spike(this, 0.65, 0.268, 0.06, 0.01, true, 1, 15, 400),
                        // new Spike(this, 0.757, 0.268, 0.06, 0.01, true, 1, 15, 400),

                        // Horizontally moving spikes
                        new Spike(this, 0.1, 0.24, 0.06, 0.01, true, 0, 15, 950),

                        // uncomment to make the level harder
                        // new Spike(this, 0.1, 0.489, 0.06, 0.01, true, 0, 10, 840),
                    ],
                    // Create goal Original x: 0.171, To test x: 0.09
                    goal: new Goal(this, 0.171, 0.767, 0.01, 0.174)
                },
            ]
            
            // Initialize the first level obstacles, spikes and goal.
            this.platforms = this.levels[this.level].platforms;
            this.spikes = this.levels[this.level].spikes;
            this.goal = this.levels[this.level].goal;
        }

        nextLevel() {
            //  Move to the next level.
            this.level++;
            if(this.level < this.levels.length) {
                this.platforms = this.levels[this.level].platforms;
                this.spikes = this.levels[this.level].spikes;
                this.goal = this.levels[this.level].goal;

                this.player.x = 0;
            }
        }

        update(deltaTime) {
            this.player.update(this.InputHandler.keys, deltaTime, this.platforms, this.goal, this.spikes);
            this.spikes.forEach(spike => spike.update());
        }

        draw(context) {
            // Draw the game area
            this.drawGameArea(context);

            // Draw the obstacles, spikes and goal
            this.platforms.forEach(platform => platform.draw(context))
            this.spikes.forEach(spike => spike.draw(context));
            this.goal.draw(context);

            // Draw the player
            this.player.draw(context);
        }

        drawGameArea(context) {
            context.beginPath();

            // Inner border
            context.moveTo(20, this.height - this.groundMargin); // vasen alakulma
            context.lineTo(this.width - this.sideMargin, this.height - this.groundMargin); // oikea alakulma
            context.lineTo(this.width - this.sideMargin, 50); // oikea yläkulma
            context.lineTo(20, 50); // vasen yläkulma
            context.lineTo(20, this.height-this.groundMargin); // vasen alakulma
            
            // Outer border
            context.moveTo(10, this.height + 10 - this.groundMargin); // vasen alakulma
            context.lineTo(this.width + 10 - this.sideMargin, this.height + 10 - this.groundMargin); // oikea alakulma
            context.lineTo(this.width + 10 - this.sideMargin, 40); // oikea yläkulma
            context.lineTo(10, 40); // vasen yläkulma
            context.lineTo(10, this.height + 10 - this.groundMargin); // vasen alakulma

            // Set color and width
            context.strokeStyle = 'white';
            context.lineWidth = 2;

            // Add glow
            context.shadowBlur = 10;
            context.shadowColor = 'white';

            context.stroke();

            // Reset glow
            context.shadowBlur = 0;
            context.shadowColor = 'transparent';

            if(this.level === 0) {
                context.font = '20px Arial';
                context.fillStyle = 'white';
                context.fillText("A <- Vasemmalle", 110, 300);
                context.fillText("D -> Oikealle", 300, 300);
                context.fillText("W = Hyppää", 200, 250);
            }
        }
    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;
    let currentTime = 0;

    function animate(currentTime) {
        // If the level varible is greater than the levels list, if it is then the game ends.
        if(game.level >= game.levels.length) {
            gameOverScreen();
            return;
        }

        let fpsInterval = 1000 / 60;
        const deltaTime = (currentTime - lastTime);
        
        if(deltaTime > fpsInterval) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            game.draw(ctx);
            game.update(deltaTime);

            lastTime = currentTime;
        }
        requestAnimationFrame(animate);
    }

    animate(currentTime)

    function gameOverScreen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.drawGameArea(ctx);
        
        let gradient = ctx.createLinearGradient(0,0, canvas.width, 0);
        gradient.addColorStop("0", "red");
        gradient.addColorStop("1", "magenta");

        ctx.font = '50px Helvetica';
        
        ctx.fillStyle = gradient;

        ctx.shadowBlur = 3;
        ctx.shadowColor = 'red';
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText('Voitit', canvas.width / 2, canvas.height / 2 - 50);
        ctx.fillText('Kuolemia: ' + game.player.deathCount, canvas.width / 2, canvas.height / 2 + 50);
    }

});

