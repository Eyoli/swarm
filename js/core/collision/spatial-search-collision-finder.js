const CollisionFinder = require('./collision-finder');
const BasicCollisionFinder = require('./basic-collision-finder');
const BinarySearchTree = require('./binary-search-tree');

class SpatialSearchCollisionFinder extends CollisionFinder {
	constructor(collisionResolver, xCut, yCut) {
		super();
		
		this.collisionFinder = new BasicCollisionFinder(collisionResolver);
		this.binarySearchTree = new BinarySearchTree();
		this.binarySearchTree.addPredicate(s => s.center.x < xCut);
		this.binarySearchTree.addPredicate(s => s.center.y < yCut);
	}
	
	search(shapes) {
		var collidingIndexes = [];
		this.lastComputations = 0;
		
		this.binarySearchTree.clear();
		this.binarySearchTree.putAll(shapes);
		
		for(var mask in this.binarySearchTree.data) {
			collidingIndexes.concat(this.collisionFinder.search(this.binarySearchTree.data[mask]));
			this.lastComputations += this.collisionFinder.getLastComputations();
		}
		
		return collidingIndexes;
	}
}

module.exports = SpatialSearchCollisionFinder;