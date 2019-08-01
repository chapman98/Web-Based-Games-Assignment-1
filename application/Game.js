

var scaleRatio;

var score = 0;
var highscore;
var lives;

var coinsound;
var explosionsound;

var spawnrate;

var min=50; 
var max;  
var random; //from: https://www.geeksforgeeks.org/javascript-math-random-function/

//from: http://www.html5gamedevs.com/topic/21724-spawning-enemies-at-random-period/
var time_til_spawn = Math.random()*3000;  //Random time between 2 and 5 seconds.
var alast_spawn_time;
var clast_spawn_time;

var ship = {
    sprite: null,
    speed: 0,

}

var asteroid;
var createasteroid;

var coin = [];

 function spawnasteroid(){ // from: https://phaser.io/examples/v2/sprites/add-several-sprites
	createasteroid = game.add.sprite(random, -50, 'asteroid_img');
	createasteroid.scale.setTo(scaleRatio, scaleRatio); //from: https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
   createasteroid.anchor.set(0.5);
		
	game.physics.arcade.enable([createasteroid]);
						   
	createasteroid.body.collideWorldBounds = false;
	
	
	game.add.tween(createasteroid).to({ y: game.height + (3500 + createasteroid.y) }, 20000, Phaser.Easing.Linear.None, true);

	this.asteroid.add(createasteroid);
}
function spawncoin(){ // from: https://phaser.io/examples/v2/sprites/add-several-sprites
	var createcoin;
	createcoin = game.add.sprite(random, -50, 'coin_img');
	createcoin.scale.setTo(scaleRatio, scaleRatio); //from: https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
   createcoin.anchor.set(0.5);
		
	game.physics.arcade.enable([createcoin]);
						   
	createcoin.body.collideWorldBounds = false;
	
	
	game.add.tween(createcoin).to({ y: game.height + (1600 + createcoin.y) }, 20000, Phaser.Easing.Linear.None, true);

	coin.push(createcoin);
}



 function collisionHandler(ship, Object) {

   
   Object.kill();
}


var GameState = {


	 preload: function() {
	game.load.image('ship_img' ,'Assets/ship.png'); //from: https://opengameart.org/content/space-shooter-ship-and-items
	game.load.image('asteroid_img' ,'Assets/asteroid.png');//from: https://opengameart.org/content/asteroid-generator-and-a-set-of-generated-asteroids
	game.load.image('coin_img' ,'Assets/coin.png');// from: https://opengameart.org/content/spinning-coin

		 
	 game.load.audio('coin_sound', 'assets/coin.wav');//from: https://opengameart.org/content/10-8bit-coin-sounds
	 game.load.audio('explosion_sound', 'assets/explosion.wav');	//from: https://opengameart.org/content/explosion-0 
		 
	score = 0;
},


	 create: function() {

	asteroid = game.add.group();// from: https://phaser.io/examples/v2/groups/add-a-sprite-to-group
		 
	//from: http://www.html5gamedevs.com/topic/21724-spawning-enemies-at-random-period/ 
	alast_spawn_time = game.time.time;
	clast_spawn_time = game.time.time;
		 	 
	scaleRatio = window.devicePixelRatio;
		 	 
	ship.sprite = game.add.sprite(game.world.width /2, game.world.height -200, 'ship_img');
	ship.sprite.scale.setTo(scaleRatio, scaleRatio); //from: https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
    ship.sprite.anchor.set(0.5);
	game.physics.arcade.enable([ship.sprite]);
	ship.sprite.body.collideWorldBounds = true;
	ship.sprite.body.drag.set(20);
    ship.sprite.body.mass = .5;
	
	coinsound = game.add.audio('coin_sound');
	explosionsound = game.add.audio('explosion_sound');
		
    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    text = game.add.text(0, 0, "<<< Swipe Left and Right to move >>>", style);
	text.setTextBounds(100, game.world.height -100, 800, 100);
	//from: https://phaser.io/examples/v2/text/center-text	
	
		
    displayscore = game.add.text(0, 0, "score: " + score, style);
	displayscore.setTextBounds(100, 0, 800, 100);
		
    displaylives = game.add.text(0, 0, "lives: " + lives, style);
	displaylives.setTextBounds(100, 0, 0, 100);

},

	 update: function () {
		max =game.world.width - 50;
		random = Math.random() * (+max - +min) + +min;
		
		var current_time = game.time.time;
		
		if(game.rnd.integerInRange(1, spawnrate) == 1)//hard 40 //50 normal //easy 70
			{
				 spawnasteroid();
			}
		
		 max =game.world.width - 50;
		 random = Math.random() * (+max - +min) + +min;
		
		var current_time = game.time.time;
  		if(current_time - clast_spawn_time > time_til_spawn)
		{
    		time_til_spawn = Math.random()*4000 + 2000;
			clast_spawn_time = current_time;
    		spawncoin();
  		}	
		
		

	
		
		if(game.physics.arcade.collide(ship.sprite, asteroid) == true)
		{
	   		game.physics.arcade.overlap(ship.sprite, asteroid, collisionHandler, null, this)
			console.log("hit");
			explosionsound.play();
			lives--;

		}
		
		if(game.physics.arcade.collide(ship.sprite, coin) == true)
		{
	   		game.physics.arcade.overlap(ship.sprite, coin, collisionHandler, null, this)
			console.log("coin");
			coinsound.play();
			score += 5;

		}
		
		if (lives < 0)
			{
				game.state.start('dead');
			}
		
		displayscore.setText("score: " + score);
		displaylives.setText("lives: " + lives);
		
		 ship.sprite.position.x = game.input.x; //from: http://www.html5gamedevs.com/topic/1681-get-mouse-position/



},


 


};