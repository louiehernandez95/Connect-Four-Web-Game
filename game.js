//class game
var Game = function(){};

//creates a game with the players and passed functions
Game.prototype.create = function (p1, p2, sendMove, sendWin) {
	this.CURR_PLAYER = p1;
	this.WAIT_PLAYER = p2;
	this.sendMove = sendMove;
	this.sendWin = sendWin;
	this.columns = [0,0,0,0,0,0,0]; //stores number of coins in each collumn
	this.PLAY_BOARD = [];
	for (var i = 0; i < 7; i += 1) {
		this.PLAY_BOARD[i] = [];
		for (var j = 0; j < 6; j += 1) {
			this.PLAY_BOARD[i][j] = 0;
		}
	}
};
// Places new chip in board, switch players and sends move to opponent's board
Game.prototype.onMove = function(column) {
	this.PLAY_BOARD[column][this.columns[column]] = this.CURR_PLAYER;
	this.columns[column] += 1;
	var temp = this.CURR_PLAYER;
	this.CURR_PLAYER = this.WAIT_PLAYER;
	this.WAIT_PLAYER = temp;
	if (!this.checkWin()) {
		this.sendMove(column);
	}
};
// Returns false if game is not over, othervise returns player1, player2 or 0 if tie
Game.prototype.checkWin = function() {
	var empty = false;
	for(var column = 0; column < 7; column += 1) {
		for(var row = 0; row < 6; row += 1) {
			if(this.PLAY_BOARD[column][row] == 0) {
				empty = true;
				continue;
			}
			else if(this.checkElement(column, row)) {
				this.sendWin(this.PLAY_BOARD[column][row]);
				return;
			}
		}
	}
	if(!empty) {
		this.sendWin(0); // no one won, tie
	}
};
//looks for nonzero elements around element
Game.prototype.checkElement = function(column, row) {
	var player = this.PLAY_BOARD[column][row];
	for(var i = column - 1; i <= column + 1; i += 1) {
		for(var j = row - 1; j <= row + 1; j += 1) {
			if(i < 0 || j < 0 || i > 6 || j > 5 || (i == column && j == row)) continue;
			if(this.PLAY_BOARD[i][j] == player) {
				if(this.checkInDirection(column, row, i - column, j - row)) {
					return true;
				}
			}
		}
	}
};
//looks for four in direction first-second nonzero element
Game.prototype.checkInDirection = function(column, row, left, up) {
	var player = this.PLAY_BOARD[column][row];
	for(var i = 0; i <= 3; i += 1) {
		var x = column + left * i;
		var y = row + up * i;
		if(x < 0 || y < 0 || x > 6 || y > 5) return false;
		if(this.PLAY_BOARD[x][y] == player) continue;
		else { return false; }
	}
	return true;
};

module.exports = Game;
