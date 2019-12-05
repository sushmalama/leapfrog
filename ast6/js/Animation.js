function Animation(canvas, ctx, row, col) {
    canvas.width = 540;
    canvas.height = 500;
    var that = this;

    this.row = row;
    this.col = col;

    var arr = [];

    this.x = 20;
    this.y = 80;
    this.gap = 30;

    this.init = function() {
        that.generateCircles();
        that.animLoop();
    }

    this.drawCanvas = function() {
        ctx.fillStyle = "#000023";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }

    this.generateCircles = function() {
        var posY = this.y;

        for (var i = 0; i < this.row; i++) {
            posY += that.gap;

            var posX = this.x;
            var phaseIncrease = 5;
            var currentPhase = 0;
            for (var j = 0; j < this.col; j++) {
                var circle = new Circle(ctx);
                circle.x = posX += this.gap;
                circle.y = posY;
                circle.currentY = posY;
                circle.currentX = posX;

                arr.push(circle);

            }
        }
    }

    this.animLoop = function() {
        that.drawCanvas();

        for (var i = 0; i < arr.length; i++) {
            arr[i].draw();
            arr[i].moveCircle();
        }

        requestAnimationFrame(that.animLoop);
    }

}

var canvas1 = document.getElementById('helix-container');
var ctx1 = canvas1.getContext('2d');
var anim1 = new Animation(canvas1, ctx1, 10, 15).init();

var canvas2 = document.getElementById('helix-container2');
var ctx2 = canvas2.getContext('2d');
var anim2 = new Animation(canvas2, ctx2, 8, 8).init();