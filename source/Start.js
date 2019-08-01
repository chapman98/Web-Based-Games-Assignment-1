//states example from: http://perplexingtech.weebly.com/game-dev-blog/using-states-in-phaserjs-javascript-game-developement

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'gamediv' );

	

game.state.add('menu', MainState);
game.state.add('game', GameState);
game.state.add('dead', deadstate);


game.state.start('menu');