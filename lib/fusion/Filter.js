/** @license MIT License (c) copyright 2010-2015 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

var Pipe = require('../sink/Pipe');

module.exports = Filter;

function Filter(p, source) {
	this.p = p;
	this.source = source;
}

Filter.prototype.run = function(sink, scheduler) {
	return this.source.run(new FilterSink(this.p, sink), scheduler);
};

function FilterSink(p, sink) {
	this.p = p;
	this.sink = sink;
}

FilterSink.prototype.end   = Pipe.prototype.end;
FilterSink.prototype.error = Pipe.prototype.error;

FilterSink.prototype.event = function(t, x) {
	var p = this.p;
	p(x) && this.sink.event(t, x);
};
