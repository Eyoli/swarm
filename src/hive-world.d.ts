import WorldManager from "./world-manager";

declare class HiveWorld implements WorldManager {
    constructor(width: integer, length: integer);
    handleClientMouseRightClick(event: any): void;
    handleSelection(event: any): void;
    togglePause(state: boolean);
    getInfo(): any;
    getState(): any;
    advance(): void;
}

export default HiveWorld;