import Interface from '../../interface';
import CollisionResolver from './collision-resolver';

export default class BinarySearchTree {
	constructor() {
		this.predicates = [];
		this.data = {};
	}
	
	addPredicate(predicate) {
		this.predicates.push(predicate);
	}
	
	put(o) {
		var mask = this.getMask(o);
		this.data[mask] = this.data[mask] || [];
		this.data[mask].push(o);
	}
	
	putAll(list) {
		for(var i = 0; i < list.length; i++) {
			this.put(list[i]);
		}
	}
	
	clear() {
		this.data = {};
	}
	
	siblings(o) {
		return this.data[this.getMask(o)];
	}
	
	getMask(o) {
		var mask = 0;
		for(var i = 0; i < this.predicates.length; i++) {
			mask |= this.predicates[i](o) << i;
		}
		return mask;
	}
}
