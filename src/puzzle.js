//Puzzle.js

const Tile = require('./tile');

const initializeBoard = (boardArray) => {
	let puzzle = [];

	boardArray.forEach((value, pos) => {
		puzzle.push(new Tile(value, pos));
	});

	return puzzle;
};

const printTiles = (tileArray) => {
	let result = [];
	
	tileArray.forEach((tile) => {
		result.push(tile.getValue());
	});
	
	return result;
};

class Puzzle {
	constructor(board){
		this.board = initializeBoard(board);
	}

	getBoard(){
		return this.board;
	}
	printBoard(){
		return printTiles(this.getBoard());
	}

	getTile(position){
		return this.getBoard()[position];
	}

	getRow(rowIndex){
		let row = [],
			startingPosition = rowIndex*9;

		for(let i=startingPosition; i<startingPosition+9; i++){
			row.push(this.getTile(i));
		}

		return row;
	}
	printRow(rowIndex){
		return printTiles(this.getRow(rowIndex));
	}

	getColumn(columnIndex){
		let column = [];

		for(let i=columnIndex; i<81; i+=9){
			column.push(this.getTile(i));
		}

		return column;
	}
	printColumn(columnIndex){
		return printTiles(this.getColumn(columnIndex));
	}

	getSquare(squareIndex){
		let square = [];

		for(let i=0; i<3; i++){
			let startingPosition = ((squareIndex - (squareIndex % 3) + i) * 9) + (squareIndex % 3 * 3);

			for(let j=0; j<3; j++){
				square.push(this.getTile(startingPosition+j));
			}
		}

		return square;
	}
	printSquare(squareIndex){
		return printTiles(this.getSquare(squareIndex));
	}

	getTilePossibleValues(position){
		let possibleValues = [1,2,3,4,5,6,7,8,9];

		if(this.getTile(position).hasValue()) {
			possibleValues = [];
		} else {
			const rowValues = this.printRow(position % 9),
				columnValues = this.printColumn(position % 9),
				squareValues = this.printSquare();

			possibleValues = possibleValues.filter((value) => {
				return !rowValues.includes(value) && !columnValues.includes(value);
			});
		}

		return possibleValues;
	}
}

module.exports = Puzzle;