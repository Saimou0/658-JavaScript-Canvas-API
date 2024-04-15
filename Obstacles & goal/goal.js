export class Goal {
    constructor (game, x, y, width, height) {
        this.game = game;
        this.x = x * this.game.width;
        this.y = y * this.game.height;
        this.width = width * this.game.width;
        this.height = height * this.game.height;
    }
    
    traceOutline(context) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y);
        context.lineTo(this.x + this.width, this.y + this.height);
        context.lineTo(this.x, this.y + this.height);
        context.lineTo(this.x, this.y);

        context.strokeStyle = "white";
        context.lineWidth = 2;
        
        context.shadowBlur = 20;
        context.shadowColor = 'green';

        context.stroke();
    }

    draw(context) {
        this.traceOutline(context);

        let gradient = context.createLinearGradient(this.x, this.y, this.x + this.width, this.y + this.height);
        gradient.addColorStop(0.2, 'green');
        gradient.addColorStop(0.5, '#74f78c');
        gradient.addColorStop(1, 'green');

        context.fillStyle = gradient;
        context.fillRect(this.x, this.y, this.width, this.height);

        context.shadowBlur = 0;
        context.shadowColor = 'transparent';
    }

}