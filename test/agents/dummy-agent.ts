import AgentInterface from "../../src/core/model/agent/agent-interface";

export default class DummyAgent implements AgentInterface {
    destroyed: boolean;

    constructor() {
        this.destroyed = false;
    }
    act(world: any): void {
        throw new Error("Method not implemented.");
    }
    getShape() {
        throw new Error("Method not implemented.");
    }
    getPhysics() {
        throw new Error("Method not implemented.");
    }
    destroy(): void {
        this.destroyed = true;
    }
    isDestroyed(): boolean {
        return this.destroyed;
    }
    react(world: any, info: any): void {
        throw new Error("Method not implemented.");
    }
    interact(): void {
        throw new Error("Method not implemented.");
    }
}