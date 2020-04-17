import {Rectangle} from '../shape/polygone';

export default class GridEngine {
	constructor(nx, ny) {
		this.nx = nx;
		this.ny = ny;
		this.grid = [];
		
		for(let i = 0; i < nx; i++) {
			this.grid[i] = [];
			for(let j = 0; j < ny; j++) {
				this.grid[i][j] = true;
			}
		}
	}
	
	reset() {
		for(let i = 0; i < nx; i++) {
			for(let j = 0; j < ny; j++) {
				this.grid[i][j] = false;
			}
		}
	}
	
	updateGrid({nx1, nx2, ny1, ny2}, shape) {
		for(let i = nx1; i < nx2; i++) {
			for(let j = ny1; j < ny2; j++) {
				this.grid[i][j] = false;
			}
		}
	}
	
	run(world) {
		for(let i = 0; i < world.agents.length; i++) {
			const shape = world.agents[i].getShape();
			const rect = shape.boundary();
			const start = rect.downLeft();
			const end = rect.topRight();
			this.updateGrid({
				nx1: start.x * this.nx / world.width,
				nx2: end.x * this.nx / world.width,
				ny1: start.y * this.ny / world.length,
				ny2: end.y * this.ny / world.length
			}, shape);
		}
	}
}