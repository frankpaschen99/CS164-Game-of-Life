	  /*||||*\
	 //  By  \\
	//  Frank \\
   //  Paschen \\
   \*||||||||||*/

var board;
var tileSize = 10;
var boardSize = 50; // adjustable
var canvas;
var ctx;
var generation = 1;
var speed = 150;	// adjustable (ms)
var scenario = 1;	// adjustable - todo: implement some scenarios from wikipedia page
var interval;
var slider = document.getElementById("slider");
var running = false;
var halted = false;

function init() {
	// prevent messyness switching from large board to small
	if (ctx) {
		ctx.clearRect(0,0,canvas.width,canvas.height);
	}

	boardSize = document.getElementById("size").value;
	scenario = document.getElementById("scenario").value;
	document.getElementById("speed").innerHTML = speed;
	
	generation = 1;
	
	/* Input checking */
	if (boardSize > 100 || boardSize < 10) {
		alert("Boardsize must be between 10 and 100!");
		return;
	} else if (boardSize % 5 != 0) {
		alert("Boardsize must be divisible by 5!");
		return;
	}
	if (speed < 1) {
		alert("Interval Duration must be > 1ms!");
		return;
	}
	
	// Initialize the game board to the size specified above
	board = new Array(boardSize);
	for (var i = 0; i < boardSize; i++) {
		board[i] = new Array(boardSize);
		for (var j = 0; j < boardSize; j++) {
			// Set all cells to 0 (dead) to start
			board[i][j] = 0;
		}
	}
	
	// HTML canvas for drawing
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	// Scale the tile size with the board size specified
	tileSize = ctx.canvas.width / boardSize;

	// some presets the user can choose from
	if (scenario == 1) {	// random
		for (var row = 1; row < boardSize-1; row++) {
			for (var col = 1; col < boardSize-1; col++) {
				board[row][col] = Math.round(Math.random());
			}
		}
	} else if (scenario == 2) { // 10 cell row
		if (boardSize < 30) {
			alert("Board Size must be >= 30 to run scenario 2!");
			return;
		}
		for (var row = Math.floor(boardSize/2); row < Math.floor(boardSize/2)+10; row++) {
			board[row][Math.floor(boardSize/2)] = 1;
		}
	} else if (scenario == 3) {	// user defined board
		allowUserDefined();
		halted = true;
	}
	if (!halted) {
		running = true;
		// call render first so we can see the first frame
		render();
		// set the interval based on users input
		updateSpeed();
	}
}
/* Update interval when slider */
function updateSpeed() {
	speed = 601-document.getElementById("slider").value;
	clearInterval(interval);
	interval = setInterval(step, speed);
	document.getElementById("speed").innerHTML = speed + " ms";
}
function step() {
	// backup board to modify before updating the display board
	var backup = new Array(boardSize);
	for (var i = 0; i < boardSize; i++) {
		backup[i] = new Array(boardSize);
		for (var j = 0; j < boardSize; j++) {
			backup[i][j] = board[i][j];
		}
	}

	// Iterate through the board 
	// Start at 1 and end at boardSize-1 to avoid undefined border problems
	for (var col = 1; col < boardSize-1; col++) {
		for (var row = 1; row < boardSize-1; row++) {

			var liveNeighbors = 0;
			var tileState = board[row][col];	// state of the cell, 0 or 1

			/* Count live neighbors */
			for (var i = -1; i < 2; i++) {
				if (i == 0) continue;

				liveNeighbors += board[row][col+i];
				liveNeighbors += board[row+i][col];
				liveNeighbors += board[row+i][col+i];
				liveNeighbors += board[row+i][col-i];
			}

			/* Implement game rules from wikipedia */
			if (tileState == 1 && liveNeighbors < 2 || liveNeighbors > 3)
				backup[row][col] = 0;
			else if (tileState == 1 && (liveNeighbors == 2 || liveNeighbors == 3) )
				backup[row][col] = 1;
			else if (tileState == 0 && liveNeighbors == 3)
				backup[row][col] = 1;
			else
				backup[row][col] = tileState;
		}
	}
	// Set display board to the backup we modified above
	board = backup;
	// call render to display the new board
	render();
	// increment generation to display to user
	generation++;
	document.getElementById("gen").innerHTML = "Generation: " + generation;
}
function allowUserDefined() {
	// Show user instructions + a button to start sim
	document.getElementById("userDefined").style.visibility='visible';
	render();
}
function userDefinedStart() {
	// user told us they are done adding cells, start sim
	document.getElementById("userDefButton").innerHTML = "";
	halted = false;
	updateSpeed();
}
function setCellAlive(e) {
	var x = e.offsetX;	// mouse x
    var y = e.offsetY;	// mouse y
	// set cell alive at (x,y) in tile coordinates
	board[Math.floor((x/tileSize))][(Math.floor(y/tileSize))] = 1;
	render();	// show user their change
}

function render() {
	if (canvas.getContext) {
		// iterate through the game board
		for (var row = 1; row < boardSize-1; row++) {
			for (var col = 1; col < boardSize-1; col++) {
				// create a grid of rectangles, colored to match states
				if (board[row][col] == 0) {
					ctx.fillStyle = 'orange';
				} else if (board[row][col] == 1) {
					ctx.fillStyle = 'green';
				} else {
					ctx.fillStyle = 'black';
				}
				// draw rectangle at x coordinate * tileSize, y coordinate * tileSize
				ctx.fillRect(row*tileSize, col*tileSize, tileSize, tileSize);
			}
		}
	}
}
