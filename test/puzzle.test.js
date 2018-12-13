// Puzzle.test.js

const Puzzle = require('../src/puzzle');
const Tile = require('../src/tile');

const u = undefined,
	defaultCompleteTestBoard = [
		1,2,3, 4,5,6, 7,8,9,
		4,5,6, 7,8,9, 1,2,3,
		7,8,9, 1,2,3, 4,5,6,

		2,3,4, 5,6,7, 8,9,1,
		5,6,7, 8,9,1, 2,3,4,
		8,9,1, 2,3,4, 5,6,7,

		3,4,5, 6,7,8, 9,1,2,
		6,7,8, 9,1,2, 3,4,5,
		9,1,2, 3,4,5, 6,7,8
	],
	defaultIncompleteTestBoard = [
		u,2,3, 4,5,6, 7,8,u,
		4,u,6, u,8,9, 1,u,3,
		7,8,u, 1,2,3, u,5,6,

		3,4,u, 6,7,8, u,1,2,
		6,u,8, 9,1,2, 3,u,5,
		u,1,2, 3,4,5, 6,7,u,

		2,3,4, u,6,u, 8,9,1,
		5,6,7, 8,u,1, 2,3,4,
		8,9,1, u,3,u, 5,6,7
	];

describe('Puzzle class', () => {

	describe('constructor', () => {
		
		test('can be constructed as a full board with a single array', () => {
			expect(new Puzzle(defaultCompleteTestBoard).printBoard()).toEqual(defaultCompleteTestBoard);
		});

		test('can be constructed as an incomplete board', () => {
			expect(new Puzzle(defaultIncompleteTestBoard).printBoard()).toEqual(defaultIncompleteTestBoard);
		});

		test('is constructed as an array of Tiles', () => {
			expect(new Puzzle(defaultCompleteTestBoard).getBoard()[0]).toEqual(new Tile(1,0));
		});
	});

	describe('get Tile functionality', () => {

		test('returns the proper Tile object - with value', () => {
			const testPuzzle = new Puzzle(defaultCompleteTestBoard),
				testTile = new Tile(1,0);

			expect(testPuzzle.getTile(0)).toEqual(testTile);
		});

		test('returns the proper Tile object - no value', () => {
			const testPuzzle = new Puzzle(defaultIncompleteTestBoard),
				testTile = new Tile(u,0);

			expect(testPuzzle.getTile(0)).toEqual(testTile);
		});
	});

	describe('row functionality', () => {

		test('retrieves a row of tiles - 0', () => {
			const testPuzzle = new Puzzle(defaultCompleteTestBoard),
				row = [1,2,3,4,5,6,7,8,9];

			expect(testPuzzle.printRow(0)).toEqual(row);
		});

		test('retrieves a row of tiles - 2', () => {
			const testPuzzle = new Puzzle(defaultCompleteTestBoard),
				row = [7,8,9,1,2,3,4,5,6];

			expect(testPuzzle.printRow(2)).toEqual(row);
		});
	});

	describe('column functionality', () => {

		test('retrieves a column of tiles - 0', () => {
			const testPuzzle = new Puzzle(defaultCompleteTestBoard),
				column = [1,4,7,2,5,8,3,6,9];

			expect(testPuzzle.printColumn(0)).toEqual(column);
		});

		test('retrieves a column of tiles - 8', () => {
			const testPuzzle = new Puzzle(defaultCompleteTestBoard),
				column = [9,3,6,1,4,7,2,5,8];

			expect(testPuzzle.printColumn(8)).toEqual(column);
		});
	});

	describe('square functionality', () => {

		test('retrieves a square of tiles as an array - 0', () => {
			const testPuzzle = new Puzzle(defaultCompleteTestBoard),
				square = [1,2,3,4,5,6,7,8,9];

			expect(testPuzzle.printSquare(0)).toEqual(square);
		});

		test('retrieves a square of tiles as an array - 1', () => {
			const testPuzzle = new Puzzle(defaultIncompleteTestBoard),
				square = [4,5,6,u,8,9,1,2,3];

			expect(testPuzzle.printSquare(1)).toEqual(square);
		});

		test('retrieves a square of tiles as an array - 7', () => {
			const testPuzzle = new Puzzle(defaultIncompleteTestBoard),
				square = [u,6,u,8,u,1,u,3,u];

			expect(testPuzzle.printSquare(7)).toEqual(square);
		});

		test('retrieves a square of tiles as an array - 5', () => {
			const testPuzzle = new Puzzle(defaultIncompleteTestBoard),
				square = [u,1,2,3,u,5,6,7,u];

			expect(testPuzzle.printSquare(5)).toEqual(square);
		});
	});

	describe('getTilePossibleValues functionality', () => {

		test('if a tile has a value, there are no other possible values', () => {
			const testPuzzle = new Puzzle(defaultCompleteTestBoard);

			expect(testPuzzle.getTilePossibleValues(0)).toEqual([]);
		});

		test('the values in a tile\'s row are not in the possible values', () => {
			const testPuzzle = new Puzzle(defaultIncompleteTestBoard),
				rowValues = [2,3,4,5,6,7,8];

			rowValues.forEach((value) => {
				expect(testPuzzle.getTilePossibleValues(0)).not.toContain(value);
			});
		});

		test('the values in a tile\'s column are not in the possible values', () => {
			const testPuzzle = new Puzzle(defaultIncompleteTestBoard),
				columnValues = [4,7,1,6,9,3,8];

			columnValues.forEach((value) => {
				expect(testPuzzle.getTilePossibleValues(57)).not.toContain(value);
			});
		});

		test('the values in a tile\'s square are not in the possible values', () => {
			const testPuzzle = new Puzzle(defaultIncompleteTestBoard),
				columnValues = [2,3,4,6,7,8];

			columnValues.forEach((value) => {
				expect(testPuzzle.getTilePossibleValues(10)).not.toContain(value);
			});
		});
	});
});