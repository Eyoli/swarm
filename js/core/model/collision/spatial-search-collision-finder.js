import CollisionFinder from './collision-finder';
import BasicCollisionFinder from './basic-collision-finder';
import BinarySearchTree from './binary-search-tree';

export default class SpatialSearchCollisionFinder extends CollisionFinder {
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
