import World from "../world";
import AgentInterface from "../agent/agent-interface";

export default interface Behavior {
    apply(agent: AgentInterface, world: World): void;
    isInvalid(): boolean;
}