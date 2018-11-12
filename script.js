// TODO 11/12/18:
/*
	fix undefined error when trying to find neighbors
	of border tiles
*/

var board;
var tileSize;
var boardSize = 50; // adjustable
var canvas;
var ctx;
var generation = 0;
var speed = 1000;	// adjustable (ms)
var scenario = 2;	// adjustable - todo: implement some scenarios from wikipedia page

function init() {
	console.log("hello");
	board = new Array(boardSize);

	for (var i = 0; i < boardSize; i++) {
		board[i] = new Array(boardSize);
		for (var j = 0; j < boardSize; j++) {
			board[i][j] = 0;
		}
	}
	
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	tileSize = ctx.canvas.width / boardSize;
	
	
	if (scenario == 1) {	// random
		for (var row = 25; row < 30; row++) {
			for (var col = 25; col < 30; col++) {
				board[row][col] = Math.round(Math.random());
			}
		}
	} else if (scenario == 2) { // 10 cell row
		for (var col = 25; col < 36; col++) {
			board[col][col] = 1;
		}
	}
	setInterval(step, speed);
}
var backup;

// called every generation 
function step() {
	backup = board.slice();	// copy by value lol
	// iterate through the game board. 0=dead, 1=alive
	for (var col = 0; col < boardSize; col++) {
		for (var row = 0; row < boardSize; row++) {
			// implement rules of sim
			var liveNeighbors = 0;	// count live # of neighbors
			var tileState = board[col][row];

			// okay this is hacky but it works
			for (var i = -1; i < 2; i++) {
				for (var j = 1; j > -2; j--) {
					if (board[col+i] === undefined || board[col+i][row-j] === undefined) {
						continue;
					}
					liveNeighbors += (board[col+i][row-j]) ;
				}
			}
			if (board[col][row] == 1) liveNeighbors -= 1;	// ridiculous
			
			
			/* implementing game rules */
			
			if (tileState == 1 && liveNeighbors < 2) {
				backup[col][row] = 0;
			} else if (tileState == 1 && (liveNeighbors == 2 || liveNeighbors == 3)) {
			
			} else if (tileState == 1 && liveNeighbors > 3) {
				backup[col][row] = 0;
			} else if (tileState == 0 && liveNeighbors == 3) {
				backup[col][row] = 1;
			} 
		}
	}
	board = backup.slice();
	render();
}
// [col][row]
function render() {
	if (canvas.getContext) {
		for (var row = 0; row < boardSize; row++) {
			for (var col = 0; col < boardSize; col++) {
				if (board[col][row] == 0) {
					ctx.fillStyle = 'orange';
				} else if (board[col][row] == 1) {
					ctx.fillStyle = 'green';
				} else {
					ctx.fillStyle = 'black';
				}
				ctx.fillRect(row*tileSize, col*tileSize, tileSize, tileSize);
			}
		}
	}
}
