import * as Assert from "assert";
import {PathFinder, Graph} from "../../src/core/service/path/path-finder";

class FakeNode {
    key: string;

    constructor(key: string) {
        this.key = key;
    }
}

class FakeGraph implements Graph<FakeNode> {
    private structure: Map<FakeNode, Map<FakeNode, number>>;

    constructor() {
        this.structure = new Map();
    }

    addNode(node: FakeNode) {
        this.structure.set(node, new Map());
        return this;
    }

    addVertex(from: FakeNode, to: FakeNode, cost: number) {
        this.structure.get(from).set(to, cost);
        return this;
    }

    getNeighbours(node: FakeNode): FakeNode[] {
        return Array.from(this.structure.get(node).keys());
    }
    getNodeKey(node: FakeNode): string {
        return node.key;
    }
    costBetween(node: FakeNode, neighbour: FakeNode): number {
        return this.structure.get(node).get(neighbour);
    }
    distanceBetween(node1: FakeNode, node2: FakeNode): number {
        return 1;
    }
}

describe('A path finder should guess correctly the shortest path from one node to another', () => {

    const pathFinder = new PathFinder<FakeNode>();

    it('straight path', () => {
        // arrange
        const node1 = new FakeNode("1");
        const node2 = new FakeNode("2");
        const node3 = new FakeNode("3");
        const fakeGraph = new FakeGraph()
            .addNode(node1)
            .addNode(node2)
            .addNode(node3)
            .addVertex(node1, node2, 1)
            .addVertex(node2, node3, 1)

        // act
        const shortestPath = pathFinder.getShortestPath(fakeGraph, node1, node3);

        // assert
        Assert.strictEqual(shortestPath.path.length, 3);
        Assert.strictEqual(shortestPath.cost, 2);
        Assert.strictEqual(shortestPath.path[0], node1);
        Assert.strictEqual(shortestPath.path[1], node2);
        Assert.strictEqual(shortestPath.path[2], node3);
    });

    it('branched path', () => {
        // arrange
        const node1 = new FakeNode("1");
        const node2 = new FakeNode("2");
        const node3 = new FakeNode("3");
        const fakeGraph = new FakeGraph()
            .addNode(node1)
            .addNode(node2)
            .addNode(node3)
            .addVertex(node1, node2, 1)
            .addVertex(node2, node3, 1)
            .addVertex(node1, node3, 1)

        // act
        const shortestPath = pathFinder.getShortestPath(fakeGraph, node1, node3);

        // assert
        Assert.strictEqual(shortestPath.path.length, 2);
        Assert.strictEqual(shortestPath.cost, 1);
        Assert.strictEqual(shortestPath.path[0], node1);
        Assert.strictEqual(shortestPath.path[1], node3);
    });
});