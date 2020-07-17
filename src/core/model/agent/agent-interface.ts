import Shape from "../shape/shape";

export default interface AgentInterface {
    act(world: any): void;
    react(world: any, info: any): void;
    interact(): any;
    getShape(): Shape;
    getPhysics(): any;
    destroy(): void;
    isDestroyed(): boolean;
}