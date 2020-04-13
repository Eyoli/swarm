export default class CollisionFinder {
	constructor() {
		if (this.constructor === CollisionFinder) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.lastComputations = 0;
	}
	
	search(shapes) {
		throw new Error('You must implement this function');
	}
	
	getLastComputations() {
		return this.lastComputations;
	}
}
