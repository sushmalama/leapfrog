 //BIRD
 const bird = {
     animation: [
         { sX: 276, sY: 112 },
         { sX: 276, sY: 139 },
         { sX: 276, sY: 164 },
         { sX: 276, sY: 139 }
     ],
     x: 50,
     y: 150,
     w: 34,
     h: 26,
     radius: 12,

     frame: 0,

     gravity: 0.25,
     jump: 4.6,
     speed: 0,
     rotation: 0,

     draw: function() {


         let bird = this.animation[this.frame];

         ctx.save();

         ctx.translate(this.x, this.y);

         ctx.rotate(this.rotation);
         ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);

         ctx.restore();
     },
     flap: function() {
         this.speed = -this.jump;

     },
     update: function() {
         //If the game state is get ready state, the bird must flap slowly
         this.period = state.current == state.getReady ? 10 : 5;

         //we increment the frame by 1, each period
         this.frame += frames % this.period == 0 ? 1 : 0;

         //frame gets from 0 to 4, then again to 0
         this.frame = this.frame % this.animation.length;

         if (state.current == state.getReady) {
             this.y = 150; //RESET position of the bird after game over
             this.rotation = 0 * DEGREE;
             // this.frame = 1;

         } else {
             this.speed += this.gravity;
             this.y += this.speed;

             if (this.y + this.h / 2 >= cvs.height - fg.h) {
                 this.y = cvs.height - fg.h - this.h / 2;
                 if (state.current == state.game) {
                     state.current = state.over;
                 }
             }

             //if the speed is greater than jump menas the bird is falling down
             if (this.speed >= this.jump) {
                 this.rotation = 90 * DEGREE;
                 this.frame = 1;

             } else {
                 this.rotation = -25 * DEGREE;
             }
         }
     }

 }