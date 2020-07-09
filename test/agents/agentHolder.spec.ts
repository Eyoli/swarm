import Agent from "../../src/core/model/agent/agent";
import AgentHolder from "../../src/core/model/agent/agent-holder";
import * as Assert from "assert";

class DummyAgent extends Agent {
    constructor() {
        super(null, null, null);
    }

    react(world: any, info: any): void {
        throw new Error("Method not implemented.");
    }
    interact(): void {
        throw new Error("Method not implemented.");
    }
}

describe('An agent holder...', () => {

    it('should attribute an identifier to an added agent', () => {
        // arrange
        const agent = new DummyAgent();
        const agentHolder = new AgentHolder(10);

        // act
        agentHolder.add(agent);

        // assert
        Assert.strictEqual(agent.getId(), "0");
    });

    it('should attribute a unique identifier', () => {
        // arrange
        const agent1 = new DummyAgent();
        const agent2 = new DummyAgent();
        const agentHolder = new AgentHolder(10);

        // act
        agentHolder.add(agent1);
        agentHolder.add(agent2);

        // assert
        Assert.notStrictEqual(agent1.getId(), agent2.getId());
    });
});