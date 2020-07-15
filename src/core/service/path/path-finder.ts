export interface Graph<N> {
	getNeighbours(node: N): Iterable<N>;
	getNodeKey(node: N) : string;
	costBetween(node: N, neighbour: N): number;
	distanceBetween(node1: N, node2: N): number;
}

export interface PositionGraph<P, N> extends Graph<N> {
	getClosestNode(position: P): N;
}

export class ShortestPath<N> {
	path: N[];
	cost: number;

	constructor(path: N[], cost: number) {
		this.path = path;
		this.cost = cost;
	}
}

class NodeState<N> {
	tested: boolean;
	cost: number;
	previous: N | null;

	constructor() {
		this.tested = false;
		this.cost = Infinity;
		this.previous = null;
	}
}

export class PathFinder<N> {
	constructor() {
	}

	private getNodeState(key: N, nodesState: Map<N,NodeState<N>>) {
		let state = nodesState.get(key);
		if(!state) {
			state = new NodeState();
			nodesState.set(key, state);
		}
		return state;
	}

	getShortestPathFromPosition<P>(positionGraph: PositionGraph<P, N>, start: P, end: P) {
		const startNode = positionGraph.getClosestNode(start);
		const endNode = positionGraph.getClosestNode(end);
		return this.getShortestPath(positionGraph, startNode, endNode);
	}

	getShortestPath(provider: Graph<N>, startNode: N, endNode: N): ShortestPath<N> {
		const endNodeKey = provider.getNodeKey(endNode);	
		const nodesState = new Map<N,NodeState<N>>();
		
		let currentNode = startNode;
		this.getNodeState(currentNode, nodesState).cost = 0;
		const candidates: N[] = [];
		
		while(currentNode 
			&& provider.getNodeKey(currentNode) !== endNodeKey) {
			//console.log('node: ', currentNode);
			
			const currentNodeState = this.getNodeState(currentNode, nodesState);
			currentNodeState.tested = true;
			const cost = currentNodeState.cost;
			
			const neighbours = provider.getNeighbours(currentNode);
			//console.log('neighbours: ', neighbours);
			
			for(let neighbour of neighbours) {
				const state = this.getNodeState(neighbour, nodesState);
				const costToNode = provider.costBetween(currentNode, neighbour);
				if(!state.tested) {
					if(state.cost === Infinity) {
						candidates.push(neighbour);
					}
					if(state.cost > cost + costToNode) {
						state.cost = cost + costToNode;
						state.previous = currentNode;
					}
				}
			}
			
			//console.log('candidates: ', candidates);
			
			let nextEstimatedCost = Infinity;
			let nextIndex: number = 0;

			candidates.forEach((candidate, i) => {
				const state = this.getNodeState(candidate, nodesState);
				const estimatedCost = state.cost + provider.distanceBetween(candidate, endNode);
				if(nextEstimatedCost > estimatedCost) {
					nextEstimatedCost = estimatedCost;
					nextIndex = i;
				}
			});
			
			const candidate = candidates.splice(nextIndex, 1);
			currentNode = candidate[0];
		}
		
		if(currentNode) {
			const totalCost = this.getNodeState(currentNode, nodesState).cost;
			const shortestPath = [];
			shortestPath.push(currentNode);

			let state = this.getNodeState(currentNode, nodesState);
			while(state.previous) {
				shortestPath.unshift(state.previous);
				state = this.getNodeState(state.previous, nodesState);
			}

			return new ShortestPath(shortestPath, totalCost);
		}
		
		return new ShortestPath([], Infinity);
	}
}