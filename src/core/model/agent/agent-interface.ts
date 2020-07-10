export default interface AgentInterface {
    act(world: any): void;
    react(world: any, info: any): void;
    interact(): any;
    getShape(): any;
    getPhysics(): any;
    destroy(): void;
    isDestroyed(): boolean;
}