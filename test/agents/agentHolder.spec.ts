import AgentHolder from "../../src/core/model/agent/agent-holder";
import * as Assert from "assert";
import DummyAgent from "./dummy-agent";

describe('An agent holder...', () => {

    it('should attribute an identifier to an added agent', () => {
        // arrange
        const agent = new DummyAgent();
        const agentHolder = new AgentHolder(10);

        // act
        const agentWrapper = agentHolder.add(agent);

        // assert
        Assert.strictEqual(agentHolder.get().length, 1);
        Assert.strictEqual(agentWrapper.getId(), "0");
    });

    it('should attribute a unique identifier', () => {
        // arrange
        const agent1 = new DummyAgent();
        const agent2 = new DummyAgent();
        const agentHolder = new AgentHolder(10);

        // act
        const agentWrapper1 = agentHolder.add(agent1);
        const agentWrapper2 = agentHolder.add(agent2);

        // assert
        Assert.strictEqual(agentHolder.get().length, 2);
        Assert.notStrictEqual(agentWrapper1.getId(), agentWrapper2.getId());
    });

    it('should release identifier upon agent destruction', () => {
        // arrange
        const agent1 = new DummyAgent();
        const agent2 = new DummyAgent();
        const agent3 = new DummyAgent();
        const agentHolder = new AgentHolder(10);

        // act
        agentHolder.add(agent1);
        agentHolder.add(agent2);
        agent1.destroy();
        agentHolder.clear();
        const agentWrapper3 = agentHolder.add(agent3);

        // assert
        Assert.strictEqual(agentWrapper3.getId(), "0");
    });

    it('should stop attributing identifiers when maximum size is reached', () => {
        // arrange
        const agent1 = new DummyAgent();
        const agent2 = new DummyAgent();
        const agentHolder = new AgentHolder(1);

        // act
        const agentWrapper1 = agentHolder.add(agent1);
        const agentWrapper2 = agentHolder.add(agent2);

        Assert.strictEqual(agentWrapper1.getId(), "0");
        Assert.strictEqual(agentWrapper2, null);
    });
});