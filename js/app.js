// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //reset enemy: when outside the canvas, come from the beginning
    if (this.x > 500) {
      this.x = -100;
      this.speed = 50 + Math.floor(Math.random() * 500)
    }

    //collision
    if (player.x < this.x + 40 &&
        player.y < this.y + 40 &&
        player.x + 40 > this.x &&
        player.y + 40 > this.y) {
      player.x = 200;
      player.y = 400
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite =  'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 400) {
        this.y = 400;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching top of canvas and winning the game
    if (this.y < 80) {
        this.x = 200;
        this.y = 400;
    }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  switch (keyPress) {
        case 'left':
            this.x -= 100;
            break;
        case 'up':
            this.y -= 80;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'down':
            this.y += 80;
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 400, 50);

var enemy1 = new Enemy(0, 80, 50 + Math.floor(Math.random() * 500));
var enemy2 = new Enemy(0, 160, 50 + Math.floor(Math.random() * 500));
var enemy3 = new Enemy(0, 240, 50 + Math.floor(Math.random() * 500));
var allEnemies = [enemy1, enemy2, enemy3]

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
