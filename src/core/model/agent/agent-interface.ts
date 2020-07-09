export default interface AgentInterface {
    act(world: any): void;
    react(world: any, info: any): void;
    interact(): any;
    getShape(): any;
    getPhysics(): any;
    getId(): string | undefined;
    setId(id: string): void;
    destroy(): void;
    isDestroyed(): boolean;
}