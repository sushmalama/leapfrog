function ForeGround(gameHeight) {
    this.gameHeight = gameHeight;
    this.sX = 276;
    this.sY = 0;
    this.width = 224;
    this.height = 112;
    this.x = 0;
    this.y = this.gameHeight - this.height;

    this.dx = 2; //move 
    this.image = document.getElementById('sprite');

    this.draw = function(ctx) {
        ctx.drawImage(this.image, this.sX, this.sY, this.width, this.height,
            this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.sX, this.sY, this.width, this.height,
            this.x + this.width, this.y, this.width, this.height);
    }

    this.update = function() {
        this.x = (this.x - this.dx) % (this.width / 2.3);
    }
}