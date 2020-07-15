import Interface from '../../core/interface';
import EngineInterface from '../../core/model/engine/engine-interface';
import World from '../../core/model/world';

export default class RoundWorldEngine implements EngineInterface {
	width: number;
	height: number;

	constructor(width: number, height: number) {		
		this.width = width;
		this.height = height;
	}
	
	run(world: World) {
		world.agents().forEach(agent => {
			var center = agent.getShape().center;
			if(center.x < 0) {
				center.x = this.width;
			} else if(center.x > this.width) {
				center.x = 0;
			} else if(center.y < 0) {
				center.y = this.height;
			} else if(center.y > this.height) {
				center.y = 0;
			}
		});
	}
}
