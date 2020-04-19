import Interface from '../interface';
import EngineInterface from './engine-interface';

export default class GridEngine {
	constructor(width, length, nx, ny) {
		Interface.checkImplements(this, EngineInterface);
		
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
	
	updateGrid(shape) {
		const rect = shape.boundary();
		
		const nx1 = Math.floor((shape.center.x + rect.topLeft().x) * this.nx / this.width);
		const nx2 = Math.floor((shape.center.x + rect.downRight().x) * this.nx / this.width);
		const ny1 = Math.floor((shape.center.y + rect.topLeft().y) * this.ny / this.length);
		const ny2 = Math.floor((shape.center.y + rect.downRight().y) * this.ny / this.length);
		
		for(let i = nx1; i < nx2; i++) {
			for(let j = ny1; j < ny2; j++) {
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
}