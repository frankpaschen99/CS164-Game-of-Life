var board;
var tileSize;
var boardSize = 50; // adjustable
var canvas;
var ctx;
var generation = 0;
var speed = 50;	// adjustable (ms)
var scenario = 2;	// adjustable - todo: implement some scenarios from wikipedia page

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
		for (var row = 1; row < boardSize-1; row++) {
			for (var col = 1; col < boardSize-1; col++) {
				board[row][col] = Math.round(Math.random());
			}
		}
	} else if (scenario == 2) { // 10 cell row
		for (var row = 25; row < 35; row++) {
			board[row][25] = 1;
		}
	}
	
	render();
	setInterval(step, speed);
}
var backup;

function step() {
	
	/****
		Final issue: original board seems to be getting updated instead of the temp backup board.
	****/
	backup = board.slice();

	// Start at 1 and end at boardSize-1 to avoid undefined border problems
	for (var col = 1; col < boardSize-1; col++) {
		for (var row = 1; row < boardSize-1; row++) {

			var liveNeighbors = 0;
			var tileState = board[row][col];

			/* Count live neighbors */
			for (var i = -1; i < 2; i++) {
				if (i == 0) continue;

				liveNeighbors += board[row][col+i];
				liveNeighbors += board[row+i][col];
				liveNeighbors += board[row+i][col+i];
				liveNeighbors += board[row+i][col-i];
			}

			/* Implement game rules from wikipedia */
			if (tileState == 1 && liveNeighbors < 2)
				backup[row][col] = 0;
			else if (tileState == 1 && (liveNeighbors == 2 || liveNeighbors == 3) )
				backup[row][col] = 1;
			else if (tileState == 1 && liveNeighbors > 3)
				backup[row][col] = 0;
			else if (tileState == 0 && liveNeighbors == 3)
				backup[row][col] = 1;
		}
	}
	board = backup.slice();
	render();
	generation++;
}

function render() {
	if (canvas.getContext) {
		for (var row = 1; row < boardSize-1; row++) {
			for (var col = 1; col < boardSize-1; col++) {
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
