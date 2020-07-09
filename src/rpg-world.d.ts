import WorldManager from "./world-manager";

declare class RPGWorld implements WorldManager {
    constructor(width: integer, length: integer);
    handleClientMouseRightClick(event: any): void;
    handleSelection(event: any): void;
    togglePause(state: boolean);
    getInfo(): any;
    getState(): any;
    advance(): void;
}

export default RPGWorld;