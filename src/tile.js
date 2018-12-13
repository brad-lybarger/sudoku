// tile.js

const isTileValid = (value, position) => {
	if (typeof value === 'number' && (value < 1 || value > 9)) {
		throw new Error('invalid tile value: ' + value + ' at position: ' + position);
	} else {
		return true;
	}
};

class Tile {
	constructor(value, position){
		//this order matters
		this.position = position;
		this.setValue(value);
		this.isGiven = value != null;
		this.possibleValues = [];
	}

	hasValue(){
		return this.value != null;
	}
	getValue(){
		return this.value;
	}
	setValue(value){
		if (!this.isGiven && isTileValid(value, this.getPosition())) {
			this.value = value;
			this.setPossibleValues([]);	
		}
	}

	getPosition(){
		return this.position;
	}

	getPossibleValues(){
		return this.possibleValues;
	}
	setPossibleValues(values){
		values = Array.isArray(values) ? values : [values];
		this.possibleValues = values;
	}
}

module.exports = Tile;