class StateResponse {
    agents?: any[];
    width?: number;
    length?: number;

    constructor() {

    }
}

export default interface WorldManager {
    togglePause(state: boolean): void;
    getInfo(): any;
    getState(): StateResponse;
    advance(): void;
}