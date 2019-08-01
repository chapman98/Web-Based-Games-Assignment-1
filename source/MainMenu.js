var MainState = {
	
	preload: function(){
		game.load.image('easy_img' ,'Assets/easy.png');
		game.load.image('normal_img' ,'Assets/normal.png');
		game.load.image('hard_img' ,'Assets/hard.png');
	},

	create: function() {
		highscore = 0;//gives highscore a starting number for the session
		
		
		var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
		var menutitle= game.add.text(0, 0, "Deep Space Escape", style);
		menutitle.setTextBounds(100, 0, 800, 100);
		
	
		var easy= game.add.sprite(game.width / 3, 200, 'easy_img');
		 easy.inputEnabled = true;
		easy.events.onInputUp.add(function () {
			spawnrate = 70;
			lives = 3;
			game.state.start('game');
		});
		
		var normal = game.add.sprite(game.width / 3, 300, 'normal_img');
		 normal.inputEnabled = true;
		normal.events.onInputUp.add(function () {
			spawnrate = 50;
			lives = 2;
			game.state.start('game');
		});
		
		var hard= game.add.sprite(game.width / 3, 400, 'hard_img');
		 hard.inputEnabled = true;
		hard.events.onInputUp.add(function () {
			spawnrate = 40;
			lives = 1;
			game.state.start('game');
		});
		
		
	},
	

	
};