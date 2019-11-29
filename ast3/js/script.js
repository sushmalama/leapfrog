function Box(parentElement) {
    this.x = 15;
    this.y = 15;
    this.dx = 2;
    this.dy = -10;
    this.width = 30;
    this.height = 30;
    this.element = null;
    this.parentElement = parentElement;
    var that = this;

    this.init = function() {
        var box = document.createElement('div');
        box.style.height = this.height + 'px';
        box.style.width = this.width + 'px';
        box.style.position = 'absolute';
        box.classList.add('box');
        this.parentElement.appendChild(box);
        this.element = box;
        this.element.onclick = this.boxClicked.bind(this);
        this.draw();

        return this;
    }
    this.ant = function() {
        this.element.style.background = 'url(../images/ant.png)';
        this.element.style.backgroundSize = 'contain';
    }

    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    }

    this.checkPosition = function(boxes) {
        for (var i = 0; i < boxes.length; i++) {
            if (this.x < boxes[i].x + boxes[i].width &&
                this.x + this.width > boxes[i].x &&
                this.y < boxes[i].y + boxes[i].height &&
                this.y + this.height > boxes[i].y) {
                return true;
            }
        }
        return false;
    }

    this.setSize = function(size) {
        this.width = size;
        this.height = size;
    }

    this.setColor = function() {
        var red = Math.floor(getRandomArbitrary(0, 255));
        console.log(red);
        var green = Math.floor(getRandomArbitrary(0, 255));
        var blue = Math.floor(getRandomArbitrary(0, 255));
        this.element.style.background = 'rgba(' + red + ',' + green + ',' + blue + ',1)';

    }

    this.boxClicked = function() {
        this.element.style.display = 'none';
    }

    this.draw = function() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    this.move = function() {

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    this.checkCollisionWithWall = function(maxWidth, maxHeight) {
        if (((this.x + this.dx) > (maxWidth - this.width)) || (this.x + this.dx < 0)) {
            this.dx = -this.dx;
        }
        if (((this.y + this.dy) > (maxHeight - this.height)) || (this.y + this.dy < 0)) {
            this.dy = -this.dy;
        }
    }

    this.checkCollisionWithBox = function(boxes) {
        for (var i = 0; i < boxes.length; i++) {
            if ((this.x) < (boxes[i].x + boxes[i].width) &&
                (this.x + this.width) > (boxes[i].x) &&
                (this.y) < (boxes[i].y + boxes[i].height) &&
                (this.y + this.height) > (boxes[i].y)) {

                this.dy = -this.dy;
                this.dx = -this.dx;
                boxes[i].dy = -boxes[i].dy;
                boxes[i].dx = -boxes[i].dx;
            }
            // return true;     
        }
    }
}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function Game(parentElement, boxCount, ant) {
    var boxes = [];
    var MAX_WIDTH = 400;
    var MAX_HEIGHT = 400;
    var colors = ['red', 'blue', 'green', 'yellow', 'black'];
    this.ant = ant;
    this.parentElement = parentElement;
    this.boxCount = boxCount || 10;

    this.startGame = function() {
        for (var i = 0; i < this.boxCount; i++) {
            var box = new Box(parentElement).init();

            box.setPosition(
                getRandomArbitrary(0, MAX_WIDTH - box.width),
                getRandomArbitrary(0, MAX_HEIGHT - box.height)
            )

            // box.setSize(
            //   getRandomArbitrary(10,10)
            // );
            if (box.checkPosition(boxes)) {
                box.setPosition(
                    getRandomArbitrary(0, MAX_WIDTH - box.width),
                    getRandomArbitrary(0, MAX_HEIGHT - box.height)
                )
            }
            if (ant == 'ant') {
                box.ant();
            } else {
                box.setColor(box);
            }

            // box.element.style.background = colors[i];
            boxes.push(box);
            box.draw();
        }
        setInterval(this.moveBoxes.bind(this), 200);
    }
    this.moveBoxes = function() {
        for (var i = 0; i < this.boxCount; i++) {
            boxes[i].checkCollisionWithWall(MAX_WIDTH, MAX_HEIGHT)
                // for(var i = 0 ; i < boxes.length ; i++ ) {
            boxes[i].checkCollisionWithBox(boxes);
            boxes[i].move();
            // }
        }
    }
}

var parentElement = document.getElementById('app');

new Game(parentElement, 10).startGame();

var parentElement2 = document.getElementById('app2');

new Game(parentElement2, 10, 'ant').startGame();