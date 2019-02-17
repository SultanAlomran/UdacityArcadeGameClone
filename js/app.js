let scoreLbl = document.querySelector('#score');
        score = 0;
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.width = 80; // get image width
  this.height = 70; // get image height
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  this.x +=  this.speed * dt;
   if (this.x > 505){
      this.x=-115;
 }
  if (checkDetection(this,allplayers[1]) === true){
    setTimeout(() => {
        allplayers[1].x = 200;
        allplayers[1].y = 405;
      }, 1);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  // set the player on the starting positon (default paramaters)
  constructor(x = 200, y = 405, sprite) {
    this.x = x;
    this.y = y;
    this.width = 90; // get image width
    this.height = 70; // get image height
    this.sprite = sprite;
  }
  update() {
    // return the player to starting point when he reaches the blue block after 1/2 second
    if (this.y < 0) {
        
        
      setTimeout(() => {
        this.x = 200;
        this.y = 405;
    // add 20 as a score for each time player lands on the blue water (I made the score 0.65 cause I am using a time out)
        score += 0.65;
        scoreLbl.innerHTML = Math.floor(score);
      },500 );
    
    }
    
   }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(keyboardKeys) {
    if (keyboardKeys === "left" && this.x > 0) {
      this.x -= 100;
    } else if (keyboardKeys === "right" && this.x <= 300) {
      this.x += 100;
    } else if (keyboardKeys === "up" && this.y > -10) {
      this.y -= 83;
    } else if (keyboardKeys === "down" && this.y <= 400) {
      this.y += 83;
    }
  }
}
class PlayerSelector {
  // set the player on the starting positon (default paramaters)
  constructor(x, y, block,width=100,height=170) {
    this.x = x;
    this.y = y;
    this.width = width; 
    this.height = height; 
    this.block = block;
  }
  update(dt){
      if (checkDetection(allplayers[1],this) === true){
            allplayers[1].x = 0;
            allplayers[1].y = 555;    
            let shuffledArray = shuffle(allplayers);
                allplayers[1].x = 200;
                allplayers[1].y = 405;
                allplayers.forEach(function(player){ 
                    console.log(player);
                    if (player === allplayers[1]){
                         player.x = 200;
                         player.y = 405;
                    }
                    });
      }
  }
  render() {
    ctx.drawImage(Resources.get(this.block), this.x, this.y,this.width,this.height);
  }
}
/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 */
var shuffle = (array) => {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};
// this will check if two objects collide and update players position or change player selection .. (check engine.js)
let checkDetection = (object1, object2) => {
  if (
    object1.x < object2.x + object2.width &&
    object1.x + object1.width > object2.x &&
    object1.y < object2.y + object2.height &&
    object1.y + object1.height > object2.y
  ) {
    return true;
  }
};
//  instantiate objects.
// Place all enemy objects in an array called allEnemies
let enemy1 = new Enemy(-100, 60, 260);
let enemy2 = new Enemy(-100, 145, 290);
let enemy3 = new Enemy(-320, 145, 200);
let enemy4 = new Enemy(-100, 230, 260);
let allEnemies = [enemy1, enemy2, enemy3,enemy4];

// Place the player object in a variable called player
let boy = new Player(0, 555, "images/char-boy.png");
let pinkGirl = new Player(undefined, undefined, "images/char-pink-girl.png");
let catGirl = new Player(0, 555, "images/char-cat-girl.png");
let hornGirl = new Player(0, 555, "images/char-horn-girl.png");
let princessGirl = new Player(0, 555,"images/char-princess-girl.png");
let allplayers = [boy, pinkGirl, catGirl, hornGirl, princessGirl];

// intiliaze Player selector block
 let selectorBlock = new PlayerSelector(0,392, "images/Selector.png");

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  allplayers[1].handleInput(allowedKeys[e.keyCode]);

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
