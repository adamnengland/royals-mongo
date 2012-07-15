var map = function() {
	emit( { }, { hr: this.hr} );
};

var reduce = function(key, values) {
	var sum = 0;
	values.forEach(function(doc) {
    	sum += doc.hr;
  	});
	return sum;
};


homeRuns = db.runCommand( {
     mapreduce: 'Player',
     map: map,
     reduce: reduce,
     out: 'totalHomers',
     verbose: true
} );

db[homeRuns.result].find();
