import World from "../world";

export default interface EngineInterface {
    run(world: World): void;
}