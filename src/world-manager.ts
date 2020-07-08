export interface WorldManager {
    handleClientMouseRightClick(event: any): void;
    handleSelection(event: any): void;
    togglePause(state: boolean): void;
    getInfo(): any;
    getState(): any;
    advance(): void;
}