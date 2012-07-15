var map = function() {
	var ba = this.hits /this.ab;
	if (ba < .250) {
		key = '< .250';
	}
	if (ba > .250 && ba < .300) {
		key = '.250 -> .300';
	}
	if (ba > .300) {
		key = '> .300';
	}
	emit(key, { count : 1});
};

var reduce = function(key, values) {
	var sum = 0;
	values.forEach(function(doc) {
	  sum += doc.count;
	});
  	return sum;
};

ba = db.runCommand( {
    mapreduce: 'Player',
    map: map,
    reduce: reduce,
    query: {"ab": {$gt: 250}},
    out: 'battingAverages',
    verbose: true
} );

db[ba.result].find();
