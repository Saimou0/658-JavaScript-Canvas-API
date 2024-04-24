const KEY = {
    W: "w",
    S: "s",
    A: "a",
    D: "d",
}

export class InputHandler {
    constructor() {
        this.keys = [];

        window.addEventListener('keydown', event => {
            switch (event.key.toLowerCase()) {
                case KEY.W:
                    if(this.keys.indexOf(KEY.W) === -1) {
                        this.keys.push(KEY.W);
                    }
                    break;
                case KEY.S:
                    if(this.keys.indexOf(KEY.S) === -1) {
                        this.keys.push(KEY.S);
                    }
                    break;
                case KEY.A:
                    if(this.keys.indexOf(KEY.A) === -1) {
                        this.keys.push(KEY.A);
                    }
                    break;
                case KEY.D:
                    if(this.keys.indexOf(KEY.D) === -1) {
                        this.keys.push(KEY.D);
                    }
                    break;
            }
            console.log(this.keys);
        });

        window.addEventListener('keyup', event => {
            switch (event.key.toLowerCase()) {
                case KEY.W:
                    this.keys.splice(this.keys.indexOf(KEY.W), 1);
                    break;
                case KEY.S:
                    this.keys.splice(this.keys.indexOf(KEY.S), 1);
                    break;
                case KEY.A:
                    this.keys.splice(this.keys.indexOf(KEY.A), 1);
                    break;
                case KEY.D:
                    this.keys.splice(this.keys.indexOf(KEY.D), 1);
                    break;
            }

            console.log(this.keys);
        });
    }
}