import Interface from '../interface';

export const PathFinderClient = new Interface('PathFinderClient', 'getClosestNode', 'getNeighbours', 'getNodeKey', 'costBetween', 'distanceBetween');

function getNodeState(key, nodesState) {
	if(!nodesState[key]) {
		nodesState[key] = {
			tested: false,
			cost: null
		}
	}
	
	return nodesState[key];
}

export class PathFinder {
	constructor() {
	}
	
	getShortestPath(client, start, end) {
		const startNode = client.getClosestNode(start);
		const endNode = client.getClosestNode(end);
				
		const nodesState = [];
		
		let currentNode = startNode;
		let cost = 0;
		const candidates = [];
		
		while(currentNode 
			&& client.getNodeKey(currentNode) !== client.getNodeKey(endNode)) {
			//console.log('node: ', currentNode);
			
			getNodeState(client.getNodeKey(currentNode), nodesState).tested = true;
			
			const neightbours = client.getNeighbours(currentNode);
			//console.log('neightbours: ', neightbours);
			
			neightbours.forEach((neighbour, i) => {
				const state = getNodeState(client.getNodeKey(neighbour), nodesState);
				const costToNode = client.costBetween(currentNode, neighbour);
				if(!state.tested) {
					if(!state.cost) {
						candidates.push(neighbour);
					}
					if(!state.cost || state.cost > cost + costToNode) {
						state.cost = cost + costToNode;
						state.previous = currentNode;
					}
				}
			});
			
			//console.log('candidates: ', candidates);
			
			const next = {
				estimatedCost: null,
				index: null
			};
			candidates.forEach((candidate, i) => {
				const state = getNodeState(client.getNodeKey(candidate), nodesState);
				const estimatedCost = state.cost + client.distanceBetween(candidate, endNode);
				if(!next.estimatedCost || next.estimatedCost > estimatedCost) {
					next.estimatedCost = estimatedCost;
					next.index = i;
				}
			});
			
			const candidate = candidates.splice(next.index, 1);
			currentNode = candidate[0];
			cost = cost + 1;
		}
		
		const shortestPath = [];
		if(currentNode) {
			shortestPath.push(currentNode);
			let state = getNodeState(client.getNodeKey(currentNode), nodesState);
			while(state.previous) {
				shortestPath.push(state.previous);
				state = getNodeState(client.getNodeKey(state.previous), nodesState);
			}
		}
		
		return shortestPath;
	}
}