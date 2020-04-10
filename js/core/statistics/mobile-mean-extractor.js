const StatisticExtractor = require('./statistic-extractor');

class MobileMeanExtractor extends StatisticExtractor {
	constructor(source, extractorFn, maxValuesNb) {
		super(source, extractorFn);
		
		this.maxValuesNb = maxValuesNb;
		this.lastValues = [];
	}
	
	processNewValue(newValue) {
		var n = this.lastValues.length;
		
		this.lastValues.push(newValue);

		if(n > 0) {
			if(n > this.maxValuesNb) {
				var oldestValue = this.lastValues.shift();
				return this.statistic + (newValue - oldestValue) / n;
			}
			return (this.statistic * n + newValue) / (n + 1);
		}
		
		return newValue;
	}
}

module.exports = MobileMeanExtractor;