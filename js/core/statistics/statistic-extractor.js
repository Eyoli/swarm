class StatisticExtractor {
	constructor(source, extractorFn) {
		this.extractorFn = extractorFn;
		this.source = source;
		this.statistic = null;
	}
	
	update() {
		var newValue = this.extractorFn(this.source);
		this.statistic = this.processNewValue(newValue);
		return this.statistic;
	}
	
	processNewValue(newValue) {
		return newValue;
	}
}

module.exports = StatisticExtractor;