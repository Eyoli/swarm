import {PathFinder} from './path/path-finder';

export default class GridService {
	constructor(worldGrid) {
		this.worldGrid = worldGrid;
		this.pathFinder = new PathFinder();
	}
	
	getShortestPath(world, start, end) {
		this.worldGrid.update(world);
		return this.pathFinder.getShortestPath(this.worldGrid, start, end);
	}
	
	getGrid(world) {
		return this.worldGrid.update(world);
	}
}