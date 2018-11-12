var board;
var tileSize;
var boardSize = 50; // 50x50
var canvas;
var ctx;
var generation = 0;
var speed = 1000;	// milliseconds
var scenario = 0;	// todo: implement some scenarios from wikipedia page

function init() {
	console.log("hello");
	board = new Array(boardSize);
	//[row][column]
	for (var i = 0; i < boardSize; i++) {
		board[i] = new Array(boardSize);
	}

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	tileSize = ctx.canvas.width / boardSize;
	
	
	if (scenario == 0) {	// random
		for (var row = 0; row < boardSize; row++) {
			for (var col = 0; col < boardSize; col++) {
				board[row][col] = Math.round(Math.random());
			}
		}
	}
	render();
	
}

// called every generation 
function step() {
	// iterate through the game board. 0=dead, 1=alive
	for (var row = 0; row < boardSize; row++) {
		for (var col = 0; col < boardSize; col++) {
			// implement rules of sim
		}
	}
}
// [row][col]
function render() {
	if (canvas.getContext) {
		for (var row = 0; row < boardSize; row++) {
			for (var col = 0; col < boardSize; col++) {
				if (board[row][col] == 0) {
					ctx.fillStyle = 'orange';
				} else if (board[row][col] == 1) {
					ctx.fillStyle = 'green';
				} else {
					ctx.fillStyle = 'black';
				}
				ctx.fillRect(row*tileSize, col*tileSize, tileSize, tileSize);
			}
		}
	}
}
