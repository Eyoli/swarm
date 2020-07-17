import {PathFinder} from './path/path-finder';
import WorldGrid from './path/world-grid';
import Position2D from '../model/physics/position2d';
import Node2D from './path/node2d';

export default class GridService {
	worldGrid: WorldGrid;
	pathFinder: PathFinder<Node2D>;

	constructor(worldGrid: WorldGrid) {
		this.worldGrid = worldGrid;
		this.pathFinder = new PathFinder<Node2D>();
	}
	
	getShortestPath(start: Position2D, end: Position2D) {
		this.worldGrid.update();
		const shortestPath = this.pathFinder
			.getShortestPathFromPosition(this.worldGrid, this.worldGrid.getClosestNode, start, end).path
			.map(node => this.worldGrid.getPosition(node));
		
		if(shortestPath.length > 0) {
			// Skip the first/last nodes which are not really useful
			//shortestPath.pop();
			//shortestPath.shift();
			
			// Add the real end to the path
			shortestPath.push(end);
		}
		
		return shortestPath;
	}
	
	getGrid() {
		return this.worldGrid;
	}
}