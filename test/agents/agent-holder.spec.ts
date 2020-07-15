import AgentHolder from "../../src/core/model/agent/agent-holder";
import * as Assert from "assert";
import FakeAgent from "./fake-agent";

describe('An agent holder should...', () => {

    it('attribute an identifier to an added agent', () => {
        // arrange
        const agent = new FakeAgent();
        const agentHolder = new AgentHolder(10);

        // act
        const agentWrapper = agentHolder.add(agent);

        // assert
        Assert.strictEqual(agentHolder.get().length, 1);
        Assert.strictEqual(agentWrapper.getId(), "0");
    });

    it('attribute a unique identifier', () => {
        // arrange
        const agent1 = new FakeAgent();
        const agent2 = new FakeAgent();
        const agentHolder = new AgentHolder(10);

        // act
        const agentWrapper1 = agentHolder.add(agent1);
        const agentWrapper2 = agentHolder.add(agent2);

        // assert
        Assert.strictEqual(agentHolder.get().length, 2);
        Assert.notStrictEqual(agentWrapper1.getId(), agentWrapper2.getId());
    });

    it('release identifier upon agent destruction', () => {
        // arrange
        const agent1 = new FakeAgent();
        const agent2 = new FakeAgent();
        const agent3 = new FakeAgent();
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

    it('stop attributing identifiers when maximum size is reached', () => {
        // arrange
        const agent1 = new FakeAgent();
        const agent2 = new FakeAgent();
        const agentHolder = new AgentHolder(1);

        // act
        const agentWrapper1 = agentHolder.add(agent1);
        const agentWrapper2 = agentHolder.add(agent2);

        Assert.strictEqual(agentWrapper1.getId(), "0");
        Assert.strictEqual(agentWrapper2, null);
    });
});