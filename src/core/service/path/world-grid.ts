import { Graph } from "./graph";
import Position2D from "../../model/physics/position2d";
import Node2D from "./node2d";
import World from "../../model/world";

function distanceN2(node1: Node2D, node2: Node2D) {
	let dx = (node2.nx - node1.nx);
	let dy = (node2.ny - node1.ny);
	return Math.sqrt(dx * dx + dy * dy);
}

export default class WorldGrid implements Graph<Node2D> {
	world: World;
	width: number;
	length: number;
	nx: number;
	ny: number;
	dx: number;
	dy: number;
	grid: boolean[][];

	constructor(world: World, width: number, length: number, nx: number, ny: number) {
		
		this.world = world;
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
	
	getClosestNode(p: Position2D) {
		return new Node2D(
			Math.max(0, Math.min(this.nx-1, Math.floor(p.x * this.nx / this.width))),
			Math.max(0, Math.min(this.ny-1, Math.floor(p.y * this.ny / this.length)))
		);
	}
	
	getPosition(node: Node2D) {
		return new Position2D(
			(this.dx / 2) + node.nx * this.dx,
			(this.dy / 2) + node.ny * this.dy
		);
	}
	
	getNodeKey(node: Node2D) {
		return node.nx + '/' + node.ny;
	}
	
	update() {
		this.reset();
		
		this.world.agents().forEach(agent => {
			this.updatePart(agent.getShape());
		}, this);
	}
	
	updatePart(shape: any) {
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
	
	getNeighbours(node: Node2D) {
		const neighbours = [];
		const nxPlus1 = node.nx + 1;
		const nxMinus1 = node.nx - 1;
		const nyPlus1 = node.ny + 1;
		const nyMinus1 = node.ny - 1;
		
		if(nyPlus1 < this.ny && !this.grid[node.nx][nyPlus1]
			&& nxPlus1 < this.nx && !this.grid[nxPlus1][nyPlus1]) {
			neighbours.push(new Node2D(nxPlus1, nyPlus1));
		}
			
		if(nyPlus1 < this.ny && !this.grid[node.nx][nyPlus1]
			&& nxMinus1 >= 0 && !this.grid[nxMinus1][nyPlus1]) {
			neighbours.push(new Node2D(nxMinus1, nyPlus1));
		}
		
		if(nyMinus1 >= 0 && !this.grid[node.nx][nyMinus1]
			&& nxPlus1 < this.nx && !this.grid[nxPlus1][nyMinus1]) {
			neighbours.push(new Node2D(nxPlus1, nyMinus1));
		}
		
		if(nyMinus1 >= 0 && !this.grid[node.nx][nyMinus1]
			&& nxMinus1 >= 0 && !this.grid[nxMinus1][nyMinus1]) {
			neighbours.push(new Node2D(nxMinus1, nyMinus1));
		}
		
		if(nxPlus1 < this.nx && !this.grid[nxPlus1][node.ny]) {
			neighbours.push(new Node2D(nxPlus1, node.ny));
		}
		
		if(nxMinus1 >= 0 && !this.grid[nxMinus1][node.ny]) {
			neighbours.push(new Node2D(nxMinus1, node.ny));
		}
		
		if(nyPlus1 < this.ny && !this.grid[node.nx][nyPlus1]) {
			neighbours.push(new Node2D(node.nx, nyPlus1));
		}
		
		if(nyMinus1 >= 0 && !this.grid[node.nx][nyMinus1]) {
			neighbours.push(new Node2D(node.nx, nyMinus1));
		}

		return neighbours;
	}
	
	costBetween(node1: Node2D, node2: Node2D) {
		return distanceN2(node1, node2);
	}
	
	distanceBetween(node1: Node2D, node2: Node2D) {
		return 0.5 * distanceN2(node1, node2);
	}
}