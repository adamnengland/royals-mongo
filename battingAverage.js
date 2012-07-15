var map = function() {
	var ba = this.hits /this.ab;
	if (ba < .250) {
		key = '< .250'
	}
	if (ba > .250 && ba < .300) {
		key = '.250 -> .300';
	}
	if (ba > .300) {
		key = '> .300';
	}
	emit(key, 1);
};

var reduce = function(key, values) {
	values.forEach(function(doc) {
		if (doc.battingAverage < .250) {
			avgs['< .250'] += 1;
		}
		if (doc.battingAverage > .250 && doc.battingAverage < .300) {
			avgs['.250 -> .300'] += 1;
		}
		if (doc.battingAverage > .300) {
			avgs['> .300'] += 1;
		}
  	});
	return avgs;
};

ba = db.runCommand( {
     mapreduce: 'Player',
     map: map,
     reduce: reduce,
     out: 'totalHomers',
     verbose: true
} );

db[ba.result].find();
