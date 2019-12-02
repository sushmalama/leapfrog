var gameDiv = document.getElementById('game');
var scoreBoard = document.getElementById('scoreTrack')
var road = document.getElementById('road');
var CAR_HEIGHT = 100;
var CAR_WIDTH = 50;
var counter = 0;
var enemySpeed = 5;

//only whole number
var randomNumber = function(max, min) {
    return Math.floor(Math.random() * (max - min));
};

function Background(parentElement) {
    this.board = '';
    this.backgroundY = 0;
    this.mainElement = parentElement;

    var that = this;




    this.create = function() {
        this.board = document.createElement('div');
        this.board.style.height = '500px';
        this.board.style.width = '405px';
        this.board.setAttribute('id', 'road');
        this.board.style.background = 'url(/images/road2.png)';
        this.board.style.position = 'relative';

        this.board.style.overflow = 'hidden';
        this.mainElement.appendChild(this.board);
    };

    // this.scoreTrack = document.createElement('div');
    // this.scoreTrak.background = 'pink';

    // this.scoreTrack.innerHTML = 'Score<br>';
    // this.scoreTrack.style.position = 'absolute';
    // this.scoreTrack.style.color = '#e1040a';
    // this.scoreTrack.style.marginLeft = '5px';
    // this.scoreTrack.style.marginTop = '50px';
    // this.scoreTrack.style.fontWeight = 'lighter';
    // this.scoreTrack.style.textAlign = 'center';
    // this.scoreTrack.style.display = 'none';
    // // this.startBtn.style.cursor = 'pointer';


    // this.mainElement.appendChild(this.scoreTrack);

    this.update = function() {
        this.backgroundY += 10;
        this.board.style.backgroundPositionY = this.backgroundY + 'px';

    };
}

function Car(parentElement) {
    this.y = 800 - CAR_HEIGHT;
    this.x = 183;
    this.carDiv = '';
    this.height = CAR_HEIGHT;
    this.carPosition = this.x;
    this.width = CAR_WIDTH + 9;
    this.mainElement = parentElement;
    var that = this;

    this.create = function() {
        this.carDiv = document.createElement('div');
        this.carDiv.style.height = this.height + 'px';
        this.carDiv.style.width = this.width + 'px';
        this.carDiv.style.position = 'absolute';
        this.carDiv.style.zIndex = '20';
        this.carDiv.style.bottom = '0px';
        this.carDiv.style.left = this.x + 'px';

        this.carDiv.setAttribute('id', 'car-div');
        this.mainElement.appendChild(this.carDiv);

        var carImage = document.createElement('img');

        carImage.setAttribute('src', 'images/car1.png');
        // carImage.style.background = 'pink';
        carImage.style.height = '100px'
        carImage.style.width = '50px';
        this.carDiv.appendChild(carImage);
    };

    this.update = function(direction) {
        var changeCarPosition = function() {
            that.carPosition = that.carPosition + (148) * direction;
            that.carDiv.style.left = that.carPosition + 'px';
        };

        if (this.carPosition <= 35 && direction === -1) {
            this.carDiv.style.left = this.carPosition + 'px';
        } else if (this.carPosition >= 331 && direction === 1) {
            this.carDiv.style.left = this.carPosition + 'px';
        } else {
            changeCarPosition();
        }
        this.x = this.carPosition;
    };

}

function Enemy(parentElement) {
    this.y = -CAR_HEIGHT;
    this.x = 0;
    this.width = CAR_WIDTH + 9;
    this.height = CAR_HEIGHT;
    this.mainElement = parentElement;
    this.enemyDiv = document.createElement('div');

    this.create = function() {
        var lane = randomNumber(3, 0);
        var enemyImage = document.createElement('img');
        this.enemyDiv.style.zIndex = '20';
        this.enemyDiv.style.width = this.width + 'px';
        this.enemyDiv.style.height = this.height + 'px';
        this.enemyDiv.style.top = this.y + 'px';
        this.enemyDiv.style.position = 'absolute';
        enemyImage.style.width = '100%';
        enemyImage.style.height = '100%';
        enemyImage.setAttribute('src', 'images/enemy.png');

        this.mainElement.appendChild(this.enemyDiv);
        this.enemyDiv.appendChild(enemyImage);

        if (lane === 0) {
            this.x = 35;
        } else if (lane === 1) {
            this.x = 183;
        } else if (lane === 2) {
            this.x = 331;
        }
        this.enemyDiv.style.left = this.x + 'px';
        // console.log(this.x);
    };

    this.update = function() {
        this.y += enemySpeed;
        this.enemyDiv.style.top = this.y + 'px';
    };

    this.deleteEnemy = function() {
        this.mainElement.removeChild(this.enemyDiv);
    };
}

function Game(elementId) {
    this.score = 0;
    this.highScore = 0;
    this.car = '';
    this.enemy = '';
    this.enemyArray = [];
    this.resetButton = '';
    this.mainElement = elementId;

    var that = this;

    this.create = function() {
        this.mainElement.style.background = 'url(images/cover.jpg)';
        this.mainElement.style.backgroundSize = 'cover';
        this.mainElement.style.height = '500px';
        this.mainElement.style.width = '405px';

        this.mainElement.style.textAlign = 'center';
        this.mainElement.style.margin = '0 auto';

        var heading = document.createElement('h1');
        var startButton = document.createElement('button');

        var scoreBoard = document.createElement('h2');
        scoreBoard.style.margin = 'auto 0';
        scoreBoard.innerHTML = 'Score:' + that.score;

        this.mainElement.appendChild(heading);
        heading.innerHTML = "CAR LANE GAME";
        heading.setAttribute('style', 'font-size:60px;font-family:modak;font-weight:bold;text-align:center;color:#DAA520;text-shadow:3px 3px #101b2f;')

        this.mainElement.appendChild(startButton);
        startButton.innerHTML = "START";
        startButton.style.display = 'block';
        startButton.style.margin = '0px auto';
        startButton.style.marginTop = '65%';
        startButton.style.background = 'yellow';
        startButton.style.color = 'black';
        startButton.style.fontSize = '35pt';

        startButton.style.height = '60px';
        startButton.style.width = '405px';
        startButton.style.border = 'none';
        startButton.style.background = 'linear-gradient(to right, rgba(150,155,0,1), rgba(0,0,0,0))';
        startButton.style.fontFamily = 'courier';

        startButton.onclick = function() {
            that.mainElement.removeChild(startButton);
            that.mainElement.removeChild(heading);
            that.backgroundCreate();

        }
    };

    this.backgroundCreate = function() {
        this.background = new Background(this.mainElement);
        this.background.create();
        that.carCreate();
        this.resetButton = document.createElement('button');
        this.resetButton.appendChild(document.createTextNode('Reset Game'));
        this.resetButton.style.fontSize = '30px';
        this.resetButton.style.color = '#B8860B';
        this.resetButton.style.fontFamily = 'inherit';
        // this.resetButton.style.border = '2px solid linear-gradient(to right, rgba(0,0,150,1), rgba(0,0,10,0))';


        this.resetButton.style.float = 'right';
        this.resetButton.style.width = '100%';
        this.resetButton.style.height = '80px';
        this.resetButton.style.border = 'none';
        this.resetButton.style.fontWeight = 'bold';
        this.resetButton.style.background = 'linear-gradient(to right, rgba(150,155,0,1),rgba(150,155,0,0), rgba(150,155,0,1))';
        this.mainElement.appendChild(this.resetButton);

        backgroundMove = setInterval(function() {

            that.background.update();

            counter++;

            //Enemy
            for (var x = 0; x < that.enemyArray.length; x++) {
                that.enemyArray[x].update();
            }


            if (that.enemyArray.length !== 0 && that.enemyArray[0].y >= 800) {
                that.enemyArray[0].deleteEnemy(); //for div removal
                that.enemyArray.splice(0, 1); //for array removal
                that.score++;
            }

            //key-press
            document.onkeydown = function(event) {

                var key = event.keyCode;

                if (key === 37 || key === 65) {
                    that.car.update(-1);
                } else if (key === 39 || key === 68) {
                    that.car.update(1);
                }
            };


            if (counter % 60 == 0) {
                that.enemyCreate();
            }

            that.resetButton.onclick = function() {
                clearInterval(backgroundMove);


                while (that.mainElement.hasChildNodes()) {
                    that.mainElement.removeChild(that.mainElement.lastChild);
                }

                that.enemyArray.length = 0;
                that.create(); //re
            }


            that.carCollision();


        }, 30);
    };

    this.carCreate = function() {
        this.car = new Car(this.background.board); //board mean another div in background object
        this.car.create();
    };

    this.enemyCreate = function() {
        // for 50% chance of creating enemy every interval
        var test = randomNumber(2, 0);
        if (test === 1) {
            this.enemy = new Enemy(this.background.board);
            this.enemyArray.push(this.enemy);
            this.enemy.create();
        }
    };

    //car collision
    this.carCollision = function() {

        for (var x = 0; x < this.enemyArray.length; x++) {
            if (this.car.x <= this.enemyArray[x].x + this.enemyArray[x].width &&
                this.car.x + this.car.width >= this.enemyArray[x].x &&
                this.car.y <= this.enemyArray[x].y + this.enemyArray[x].height &&
                this.car.height + this.car.y >= this.enemyArray[x].y) {

                clearInterval(backgroundMove);
                console.log('car crash');

                while (that.mainElement.hasChildNodes()) {
                    that.mainElement.removeChild(that.mainElement.lastChild);
                }

                if (that.score > that.highScore) {
                    that.highScore = that.score;
                }

                var playAgain = document.createElement('button');
                that.mainElement.appendChild(playAgain);
                playAgain.innerHTML = 'Play Again';
                playAgain.style.height = '40px';
                playAgain.style.width = '405px';
                playAgain.style.fontSize = '30px';
                playAgain.style.color = 'white';
                playAgain.style.margin = '0 auto';
                playAgain.style.display = 'block';
                playAgain.style.fontFamily = 'inherint';
                playAgain.style.border = 'none';
                playAgain.style.background = 'linear-gradient(to right, rgba(150,155,0,1), rgba(0,0,0,0))';


                var score = document.createElement('h2');
                that.mainElement.appendChild(score);
                score.innerHTML = 'SCORE : ' + that.score;
                score.style.background = 'linear-gradient(to right, rgba(150,155,0,1), rgba(0,0,0,0))';
                score.style.margin = '20px 0';
                score.style.color = 'white';

                var highscore = document.createElement('h2');
                that.mainElement.appendChild(highscore);
                highscore.innerHTML = 'HIGHSCORE : ' + that.highScore;
                highscore.style.background = 'linear-gradient(to right, rgba(150,155,0,1), rgba(0,0,0,0))';
                highscore.style.color = 'white';

                highscore.style.margin = '20px 0';

                playAgain.onclick = function() {


                    while (that.mainElement.hasChildNodes()) {
                        that.mainElement.removeChild(that.mainElement.lastChild);
                    }
                    that.backgroundCreate();
                    that.enemyArray = [];
                    that.score = 0;
                }

            }
        }
    };


}

var game = new Game(gameDiv);
game.create();