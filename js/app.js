
/*
 * Global vairables
 */
let scoreLbl = document.querySelector('#score');
let background = document.querySelector('body');
score = 0;

/*
 * Function Constructors and Classes 
 */

// Enemies the player must avoid : 
var Enemy = function(x, y, speed) {
 // set the image of the enemy , its location (x,y),speed , width ,height
 this.sprite = "images/enemy-bug.png";
 this.x = x; 
 this.y = y; 
 this.width = 80; 
 this.height = 70; 
 this.speed = speed; 
};

// Update the enemy's position 
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

 this.x += this.speed * dt;
 if (this.x > 505){
 this.x=-115;
 }
 // once the player collides with the enemy change his position back to start and update current score
 if (checkDetection(this,allplayers[1]) === true)
 {if(score > 0){
 score -= 20;
 score = Math.round(score);
 scoreLbl.innerHTML = score ;
 }
 else if (score <= 0){
 
 scoreLbl.innerHTML = score;
 }
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

// This class consists of update(), render() and
// a handleInput() method.
class Player {
 // set the player on the starting positon (default paramaters)
 constructor(x = 200, y = 405, sprite) {
 this.x = x;
 this.y = y;
 this.width = 90; // set image width
 this.height = 70; // set image height
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
 // once the score reaches 100 game is won and show modal
 } if (score >= 100){
 modal.open();
 }
 }

 render() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 }

 // handle input from keyboard(left,right,up,down) and update new position
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
// This class consists of update(), render() 
class PlayerSelector {
 // set the block of changing charachter on this point (default paramaters)
 constructor(x, y, block,width=100,height=170) {
 this.x = x;
 this.y = y;
 this.width = width; 
 this.height = height; 
 this.block = block;
 }

 // 
 update(){
 if (checkDetection(allplayers[1],this) === true){
 allplayers[1].x = 0;
 allplayers[1].y = 555; 
 // Shuffle the array that contain list of players
 let shuffledArray = shuffle(allplayers);
 // position the new randomly selected player to starting point
 allplayers[1].x = 200;
 allplayers[1].y = 405;
 // set score back to 0
 score = 0;
 scoreLbl.innerHTML = score;
 // change background color!
 background.classList.toggle('gradientTwo');
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
// Modals 
class Modal {
 constructor(overlay) {
 this.overlay = overlay;
 const totalScore = document.querySelector('#totalScore');
 setInterval(() => {
 totalScore.textContent = "Total Score : " + scoreLbl.textContent;
 }, 10);
 const restartLink = document.querySelector('.restartLink');
 restartLink.addEventListener("click", this.restart.bind(this));
 const closeButton = document.querySelector('.closeBtn');
 closeButton.addEventListener('click', this.close.bind(this));
 overlay.addEventListener('click', e => {
 if (e.srcElement.id === this.overlay.id) {
 this.close();
 }
 });
 }
 open() {
 console.log(this.overlay); 
 this.overlay.classList.remove('d-none');
 }

 close() {
 
 this.overlay.classList.toggle('d-none');
 }
 restart(){
 location.reload();
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
/**
 * Objects Initilaization
 */

 // Enemies 
let enemy1 = new Enemy(-100, 60, 260);
let enemy2 = new Enemy(-100, 145, 290);
let enemy3 = new Enemy(-320, 145, 200);
let enemy4 = new Enemy(-100, 230, 260);
let allEnemies = [enemy1, enemy2, enemy3,enemy4];

// Player and (different Charachtes)
let boy = new Player(undefined, undefined, "images/char-boy.png");
let pinkGirl = new Player(0, 555, "images/char-pink-girl.png");
let catGirl = new Player(0, 555, "images/char-cat-girl.png");
let hornGirl = new Player(0, 555, "images/char-horn-girl.png");
let princessGirl = new Player(0, 555,"images/char-princess-girl.png");
let allplayers = [ pinkGirl,boy, catGirl, hornGirl, princessGirl];

// intiliaze Player selector
 let selectorBlock = new PlayerSelector(0,392, "images/Selector.png");
 // intiliaze Modal 
 const modal = new Modal(document.querySelector('.modal'));


// This listens for key presses and sends the keys to your
document.addEventListener("keyup", function(e) {
 var allowedKeys = {
 37: "left",
 38: "up",
 39: "right",
 40: "down"
 };

 allplayers[1].handleInput(allowedKeys[e.keyCode]);

});


 
 