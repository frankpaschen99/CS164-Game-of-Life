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
var scenario = 0;	// adjustable - todo: implement some scenarios from wikipedia page

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
	step();
	
}
var backup;

// called every generation 
function step() {
	backup = board.slice();	// copy by value lol
	// iterate through the game board. 0=dead, 1=alive
	for (var col = 10; col < boardSize; col++) {
		for (var row = 10; row < boardSize; row++) {
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
			if (board[col][row] == 1) liveNeighbors -= 1;
			console.log("board[" + col + "][" + row + "]:	" + liveNeighbors);		
		}
	}
}
// [col][row]
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
