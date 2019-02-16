// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // this.x +=  this.speed * dt;
    // if (this.x > 510){
    // }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
    class Player{
        // set the player on the starting positon (default paramaters) 
        constructor(x = 200 , y = 405 , sprite){
            this.x = x ;
            this.y = y ;
            this.sprite = sprite;
            
        }
        update(){
            // return the player to starting point when he reaches the blue block
            if (this.y < 0){
                setTimeout()
                this.x = 200;
                this.y = 405;
            }
        }
        render(){
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
        handleInput(keyboardKeys){
            if (keyboardKeys === 'left' && this.x > 0){
                this.x -= 100;
            }else if(keyboardKeys === 'right' && this.x <= 300){
                this.x += 100;
            }else if(keyboardKeys === 'up' && this.y > -10 ){
                this.y -= 83;
            }else if(keyboardKeys === 'down' && this.y <= 400){
                this.y += 83;
            }
                
            
        }
    }

function checkDetection(x1,y1,x2,y2){
    if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
        object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
// The objects are touching
}
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
    let enemy1 = new Enemy(0,60,0);
    let enemy2 = new Enemy(0,145,10);
    let enemy3 = new Enemy(0,225,0);
    let allEnemies = [enemy1,enemy2,enemy3];


    let boy = new Player(undefined,undefined, 'images/char-boy.png');
    let pinkGirl = new Player(undefined,undefined,'images/char-pink-girl.png');
    let catGirl = new Player(undefined,undefined, 'images/char-cat-girl.png');
    let hornGirl = new Player(undefined,undefined, 'images/char-horn-girl.png');
    let princessGirl = new Player(undefined,undefined, 'images/char-princess-girl.png');
    let allPlayer = [boy,pinkGirl,catGirl,hornGirl,princessGirl];
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

       
    allPlayer[1].handleInput(allowedKeys[e.keyCode]);
    
});

// Creating Modal Constructor


// let modal = document.getElementById("congratsModal");
// let showModal = function() {
  
//     // let modalContent = document.getElementsByClassName("modal-content")[0];
//     // close the modal when close button is clicked
//     closeBtn.addEventListener("click", closeModal);    

//   };
//   let closeModal = function() {
//     modal.classList.toggle("d-none");
//   };
  
//   showModal();

// class Modal{
//     constructor(overlay){
//         this.overlay = overlay;
//         const closeOverlay = overlay.querySelector('.closeBtn');
//         closeOverlay.addEventListener('click', this.closeModal.bind(this));
//         overlay.addEventListener('click', e => {
//           if (e.srcElement.id === this.overlay.id) {
//             this.closeModal();
//           }
//         });
//     }
//     openModal(){
//         this.overlay.classList.remove("d-none");
//     }
//     closeModal(){
//         this.overlay.classList.toggle("d-none");
//     }
// }
// const modal = new Modal(document.querySelector('.modal-content'));
// window.open = modal.openModal.bind(modal);
// window.open();