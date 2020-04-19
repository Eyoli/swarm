import Interface from '../interface';
import EngineInterface from './engine-interface';
import {PathFinderClient} from './path-finder';

export default class GridEngine {
	constructor(width, length, nx, ny) {
		Interface.checkImplements(this, EngineInterface, PathFinderClient);
		
		this.width = width;
		this.length = length;
		this.nx = nx;
		this.ny = ny;
		this.dx = this.width / this.nx;
		this.dy = this.length / this.ny;
		this.grid = [];
		
		for(let i = 0; i < nx; i++) {
			this.grid[i] = [];
			for(let j = 0; j < ny; j++) {
				this.grid[i][j] = false;
			}
		}
	}
	
	reset() {
		for(let i = 0; i < this.nx; i++) {
			for(let j = 0; j < this.ny; j++) {
				this.grid[i][j] = false;
			}
		}
	}
	
	getClosestNode({x, y}) {
		return {
			nx: Math.floor(x * this.nx / this.width),
			ny: Math.floor(y * this.ny / this.length)
		};
	}
	
	getNodeKey(node) {
		return node.nx + '/' + node.ny;
	}
	
	updateGrid(shape) {
		const rect = shape.boundary();
		const start = this.getClosestNode({
			x: shape.center.x + rect.topLeft().x,
			y: shape.center.y + rect.topLeft().y
		});
		const end = this.getClosestNode({
			x: shape.center.x + rect.downRight().x,
			y: shape.center.y + rect.downRight().y
		});
		
		for(let i = start.nx; i < end.nx; i++) {
			for(let j = start.ny; j < end.ny; j++) {
				this.grid[i][j] = shape.contains({
					x: (this.dx / 2) + i * this.dx, 
					y: (this.dy / 2) + j * this.dy
				});
			}
		}
	}
	
	run(world) {
		this.reset();
		
		for(let i = 0; i < world.agents.length; i++) {
			const shape = world.agents[i].getShape();
			this.updateGrid(shape);
		}
	}
	
	getNeighbours(node) {
		const neighbours = [];
		const nxPlus1 = node.nx + 1;
		const nxMinus1 = node.nx - 1;
		const nyPlus1 = node.ny + 1;
		const nyMinus1 = node.ny - 1;
		
		if(nxPlus1 < this.nx && !this.grid[nxPlus1][node.ny]) {
			neighbours.push({nx: nxPlus1, ny: node.ny});
		}
		
		if(nxMinus1 >= 0 && !this.grid[nxMinus1][node.ny]) {
			neighbours.push({nx: nxMinus1, ny: node.ny});
		}
		
		if(nyPlus1 < this.ny && !this.grid[node.nx][nyPlus1]) {
			neighbours.push({nx: node.nx, ny: nyPlus1});
		}
		
		if(nyMinus1 >= 0 && !this.grid[node.nx][nyMinus1]) {
			neighbours.push({nx: node.nx, ny: nyMinus1});
		}
		
		if(nyPlus1 < this.ny && !this.grid[node.nx][nyPlus1]
			&& nxPlus1 < this.nx && !this.grid[nxPlus1][nyPlus1]) {
			neighbours.push({nx: nxPlus1, ny: nyPlus1});
		}
			
		if(nyPlus1 < this.ny && !this.grid[node.nx][nyPlus1]
			&& nxMinus1 >= 0 && !this.grid[nxMinus1][nyPlus1]) {
			neighbours.push({nx: nxMinus1, ny: nyPlus1});
		}
		
		if(nyMinus1 >= 0 && !this.grid[node.nx][nyMinus1]
			&& nxPlus1 < this.nx && !this.grid[nxPlus1][nyMinus1]) {
			neighbours.push({nx: nxPlus1, ny: nyMinus1});
		}
		
		if(nyMinus1 >= 0 && !this.grid[node.nx][nyMinus1]
			&& nxMinus1 >= 0 && !this.grid[nxMinus1][nyMinus1]) {
			neighbours.push({nx: nxMinus1, ny: nyMinus1});
		}
		
		return neighbours;
	}
	
	costBetween(node1, node2) {
		//return this.distanceBetween(node1, node2);
		return 1;
	}
	
	distanceBetween(node1, node2) {
		let dx = (node2.nx - node1.nx);
		let dy = (node2.ny - node1.ny);
		return Math.sqrt(dx * dx + dy * dy);
	}
}