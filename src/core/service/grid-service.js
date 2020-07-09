import {PathFinder} from './path/path-finder';

export default class GridService {
	constructor(worldGrid) {
		this.worldGrid = worldGrid;
		this.pathFinder = new PathFinder();
	}
	
	getShortestPath(world, start, end) {
		this.worldGrid.update(world);
		const shortestPath = this.pathFinder.getShortestPath(this.worldGrid, start, end)
			.map(node => this.worldGrid.getPosition(node));;
		
		if(shortestPath.length > 0) {
			// Skip the first/last nodes which are not really useful
			//shortestPath.pop();
			//shortestPath.shift();
			
			// Add the real end to the path
			shortestPath.push(end);
		}
		
		return shortestPath;
	}
	
	getGrid(world) {
		return this.worldGrid;
	}
}