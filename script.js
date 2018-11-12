/*
	This doesnt work properly. Gotta be an issue
	counting live neighbors because the rules look
	good.
	
	will fix later

*/

var board;
var tileSize;
var boardSize = 50; // adjustable
var canvas;
var ctx;
var generation = 0;
var speed = 1000;	// adjustable (ms)
var scenario = 1;	// adjustable - todo: implement some scenarios from wikipedia page

function init() {
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
		for (var row = 0; row < boardSize; row++) {
			for (var col = 0; col < boardSize; col++) {
				board[row][col] = Math.round(Math.random());
			}
		}
	} else if (scenario == 2) { // 10 cell row
		for (var row = 25; row < 36; row++) {
			board[row][25] = 1;
		}
	}
	
	render();
	step();
	//setInterval(step, speed);
}
var backup;

// called every generation 
function step() {
	backup = board.slice();

	for (var col = 0; col < boardSize; col++) {
		for (var row = 0; row < boardSize; row++) {

			var liveNeighbors = 0;
			var tileState = board[col][row];

			// Count live neighbors, skipping undefined tiles
			for (var i = -1; i < 2; i++) {
				if (i == 0) continue;

				// This is SO CLOSE to working. Does not work for the first 50 tiles or the last
				// 50 tiles. (Top row and bottom row)

				console.log("Calculating for: board[" + row + "][" + col + "]");
				
				liveNeighbors += board[row][col+i];
				liveNeighbors += board[row+i][col];
				liveNeighbors += board[row+i][col+i];
				liveNeighbors += board[row+i][col-i];
			}
			
			
			
			console.log("board[" + row + "][" + col + "]:	" + liveNeighbors);	
			
			/* implementing game rules */
			
			if (tileState == 1 && liveNeighbors < 2) {
				backup[col][row] = 0;
			} else if (tileState == 1 && (liveNeighbors == 2 || liveNeighbors == 3)) {
				backup[col][row] = 1;
			} else if (tileState == 1 && liveNeighbors >= 4) {
				backup[col][row] = 0;
			} else if (tileState == 0 && liveNeighbors == 3) {
				backup[col][row] = 1;
			} 
		}
	}
	board = backup.slice();
	//render();
	generation++;
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
