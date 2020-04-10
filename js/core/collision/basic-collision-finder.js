const CollisionFinder = require('./collision-finder');

/**
	Basic collision engine : we test every collision possible in a set of shapes
*/
class BasicCollisionFinder extends CollisionFinder {
	constructor(collisionResolver) {
		super();
		
		this.collisionResolver = collisionResolver;
	}

	search(shapes) {
		var collidingIndexes = [];
		
		for(var i = 0; i < shapes.length; i++) {
			for(var j = i + 1; j < shapes.length; j++) {
				if(this.collisionResolver.resolve(shapes[i], shapes[j])) {
					collidingIndexes.push({
						i1: i,
						i2: j
					});
				}
			}
		}
		this.lastComputations = shapes.length * (shapes.length - 1) / 2;
		
		return collidingIndexes;
	}
}

module.exports = BasicCollisionFinder;