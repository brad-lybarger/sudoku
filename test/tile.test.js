// tile.test.js

const Tile = require('../src/tile');

describe('tile class', () => {

	describe('constructor', () => {
		test('can be constructed with an empty value', () => {
			expect(new Tile().getValue()).toBe();
		});
		test('can be constructed with a null value', () => {
			expect(new Tile(null).getValue()).toBe(null);
		});
		test('can be constructed with an undefined value', () => {
			expect(new Tile(undefined).getValue()).toBe();
		});

		test('can be constructed with a known value', () => {
			expect(new Tile(2).getValue()).toBe(2);
		});

		test('cannot be constructed with an out of bounds value: 0', () => {
			expect(() => {
				new Tile(0,0);
			}).toThrow('invalid tile value');
		});

		test('cannot be constructed with an out of bounds value: 10', () => {
			expect(() => {
				new Tile(10,0);
			}).toThrow('invalid tile value');
		});

		test('is constructed with a position', () => {
			expect(new Tile(3,0).getPosition()).toBe(0);
		});
	});

	describe('possible values functionality', () => {
		test('can be set with a single value', () => {
			let testTile = new Tile();
			testTile.setPossibleValues(3);

			expect(testTile.getPossibleValues()).toEqual([3]);
		});

		test('can be set with a multiple values', () => {
			let testTile = new Tile();
			testTile.setPossibleValues([1,2,3]);

			expect(testTile.getPossibleValues()).toEqual([1,2,3]);
		});

		test('if a tile has a given value, then it has no possible values', () => {
			let testTile = new Tile(5);

			expect(testTile.getPossibleValues()).toEqual([]);
		});

		test('if a tile is assigned a value, then it has no possible values', () => {
			let testTile = new Tile();
			testTile.setPossibleValues([1,3,6]);
			testTile.setValue(6);

			expect(testTile.getPossibleValues()).toEqual([]);
		});
	});

	describe('value functionality', () => {
		test('a given value cannot be overwritten', () => {
			let testTile = new Tile(1);
			testTile.setValue(2);

			expect(testTile.getValue()).toBe(1);
		});

		test('an unknown value can be set', () => {
			let testTile = new Tile();
			testTile.setValue(9);

			expect(testTile.getValue()).toBe(9);
		});

		test('an unknown value can be overwritten', () => {
			let testTile = new Tile();
			testTile.setValue(9);
			testTile.setValue(4);

			expect(testTile.getValue()).toBe(4);
		});

		test('an empty tile does not have a value', () => {
			const testTile = new Tile();

			expect(testTile.hasValue()).toBe(false);
		});

		test('a given tile does have a value', () => {
			const testTile = new Tile(5);

			expect(testTile.hasValue()).toBe(true);
		});

		test('a set tile does have a value', () => {
			const testTile = new Tile();
			testTile.setValue(8);

			expect(testTile.hasValue()).toBe(true);
		});
	});

	describe('Position-related functionality', () => {
		test('getPosition returns the position', () => {
			const testTile = new Tile(5,61);

			expect(testTile.getPosition()).toBe(61);
		});

		test('getRow returns the appropriate row - 0, first in row', () => {
			const testTile = new Tile(2, 9);

			expect(testTile.getRow()).toBe(1);
		});

		test('getRow returns the appropriate row - 4, middle of row', () => {
			const testTile = new Tile(2, 41);

			expect(testTile.getRow()).toBe(4);
		});

		test('getRow returns the appropriate row - 7, last of row', () => {
			const testTile = new Tile(2, 71);

			expect(testTile.getRow()).toBe(7);
		});

		test('getColumn returns the appropriate column - 0, first in column', () => {
			const testTile = new Tile(2, 9);

			expect(testTile.getColumn()).toBe(0);
		});

		test('getColumn returns the appropriate column - 5, middle of column', () => {
			const testTile = new Tile(2, 41);

			expect(testTile.getColumn()).toBe(5);
		});

		test('getColumn returns the appropriate column - 8, last of column', () => {
			const testTile = new Tile(2, 71);

			expect(testTile.getColumn()).toBe(8);
		});

		test('getSquare returns the appropriate square - 0, first square, first tile', () => {
			const testTile = new Tile(2, 0);

			expect(testTile.getSquare()).toBe(0);
		});

		test('getSquare returns the appropriate square - 0, first square, middle tile', () => {
			const testTile = new Tile(2, 10);

			expect(testTile.getSquare()).toBe(0);
		});

		test('getSquare returns the appropriate square - 0, first square, last tile', () => {
			const testTile = new Tile(2, 20);

			expect(testTile.getSquare()).toBe(0);
		});

		test('getSquare returns the appropriate square - 4, middle square', () => {
			const testTile = new Tile(2, 41);

			expect(testTile.getSquare()).toBe(4);
		});

		test('getSquare returns the appropriate square - 8, last square', () => {
			const testTile = new Tile(2, 71);

			expect(testTile.getSquare()).toBe(8);
		});
	});
});
