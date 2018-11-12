var board;
var tileSize = 20;
var boardSize = 50; // 50x50
var canvas;

function init() {
	console.log("hello");
	board = new Array(boardSize);
	
	for (var i = 0; i < 50; i++) {
		board[i] = new Array(boardSize);
	}
	
	
	
	canvas = document.getElementById('canvas');
	render();
}


function render() {
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');

		for (var i = 0; i < boardSize; i++) {
			for (var j = 0; j < boardSize; j++) {
				ctx.fillRect(i*tileSize, j*tileSize, tileSize, tileSize);

			}
		}
	}
	
	
}
