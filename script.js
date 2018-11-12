var board;
var tileSize;
var boardSize = 50; // 50x50
var canvas;
var ctx;
var generation = 0;
var speed = 1000;	// milliseconds

function init() {
	console.log("hello");
	board = new Array(boardSize);
	
	for (var i = 0; i < boardSize; i++) {
		board[i] = new Array(boardSize);
	}

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	tileSize = ctx.canvas.width / boardSize;
	render();
}

// called every generation 
function step() {
	
}

function render() {
	if (canvas.getContext) {
		

		for (var i = 0; i < boardSize; i++) {
			for (var j = 0; j < boardSize; j++) {
				board[i][j] = Math.round(Math.random());
				
				if (board[i][j] == 0) {
					ctx.fillStyle = 'orange';
				} else if (board[i][j] == 1) {
					ctx.fillStyle = 'green';
				} else {
					ctx.fillStyle = 'black';
				}
				ctx.fillRect(i*tileSize, j*tileSize, tileSize, tileSize);
			}
		}
	}
	
	
}
