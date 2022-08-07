window.addEventListener('load', () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const rect = {h: 10, w: 10, to: {x: 0, y: 0}}
    // Resizing
    canvas.width = 500;
    canvas.height = 500;

    let column = canvas.width / rect.w;
    let row = canvas.height / rect.w;


    class fruit {
        constructor(){
            this.x;
            this.y;
        }


        pickLocation() {
            this.x =( Math.floor(Math.random() * row)) * rect.w;
            this.y =( Math.floor(Math.random() * column)) * rect.w;
            if (this.x > canvas.width) {
                this.x = canvas.width;
            }
            if (this.y > canvas.height) {
                this.y = canvas.height;
            }
        }

        draw() {
            ctx.fillStyle = "crimson";
            ctx.fillRect(this.x, this.y, rect.w, rect.h);
        }
    }


    class sprite {
        constructor(x,y) {
            this.positionX = x;
            this.positionY = y;
            this.speedY = 0;
            this.speedX = rect.w * 1;
            this.move = "none";
            this.total = 0;
            this.tail = [];
        }

        setMove(x) {
            this.move = x;
        }

        draw() {
            ctx.fillStyle = "#000000";

            for (let i=0; i<this.tail.length; i++) {
                ctx.fillRect(this.tail[i].x,this.tail[i].y,rect.w,rect.h);
            }

            ctx.fillRect(this.positionX,this.positionY,rect.w,rect.h);
        }

        update() {
            for (let i=0; i <this.tail.length - 1; i++){
                this.tail[i] = this.tail[i+1];
            }
        
            this.tail[this.total - 1] = {x: this.positionX, y: this.positionY}

            // update
            this.positionX += this.speedX;
            this.positionY += this.speedY;

            if (this.positionX > canvas.width) {
                this.positionX = 0;
            }
            if (this.positionX < 0) {
                this.positionX = canvas.width;
            }
            if (this.positionY > canvas.height) {
                this.positionY = 0;
            }
            if (this.positionY < 0) {
                this.positionY = canvas.height;
            }
        }

        direction(){
            switch(this.move){
                case 'DOWN':
                    this.speedY = rect.w * 1;
                    this.speedX = 0;
                    break;
                case 'UP':
                    this.speedY = rect.w * -1;
                    this.speedX = 0;
                    break;
                case 'RIGHT':
                    this.speedY = 0;
                    this.speedX = rect.w * 1;
                    break;
                case 'LEFT':
                    this.speedY = 0;
                    this.speedX = rect.w * -1;
                    break;
                
            }
        }

        eat(fruit){
            if (this.positionX == fruit.x && this.positionY == fruit.y) {
                this.total++;
                console.log("Total Ekor: " + this.total);
                return true;
            }
        }
    }

    window.addEventListener('keydown', (e) => {
        switch(e.key){
            case 'w':
                player.setMove('UP');
                break;
            case 's':
                player.setMove('DOWN');
                break;
            case 'd':
                player.setMove('RIGHT');
                break;
            case 'a':
                player.setMove('LEFT');
                break;
        }
    })

    let player = new sprite(0, 0);
    let buah = new fruit();
    buah.pickLocation();
    window.setInterval(function() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        player.draw();
        player.update();
        player.direction();
        buah.draw();

        if (player.eat(buah)) {
            buah.pickLocation();
        }
    }, 100);
})