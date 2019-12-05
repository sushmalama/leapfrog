function Circle(ctx) {
    this.r = 50;
    this.radiusAmp = 10;
    this.x = 0;
    this.y = 0;

    this.currentX;
    this.currentY;

    var move = 0;
    this.phase = 0;
    var that = this;
    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    //animationpart
    this.moveCircle = function() {
        move += 0.02;
        this.y = 50 + (Math.sin(move) * 100) + this.currentY;
        this.x = 20 + (Math.cos(move) * 5) + this.currentX;

        // this.y = 100 + (Math.sin(move) * this.radius);
        // this.y = 100 + (Math.cos(move) * this.radius);
        frames++;
        this.r = Math.cos(move) * this.radiusAmp / 2 + this.radiusAmp / 2;
    }
}