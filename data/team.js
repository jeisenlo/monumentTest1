
'use strict';

const events = require('monument').events;

events.on('data:get:team', (id) => {
    const hasId = typeof id !== 'undefined';

    if (hasId) {

    	db.collection(TEAMS_COLLECTION).findOne({ _id: new mongodb.ObjectID(id) }, function(err, doc) {
	        if (err) {
	          handleError(connection.res, err.message, "Failed to get team.");
	        } else {
	          events.emit('data:set:team', doc);
	          //connection.res.send(doc);
	        }
	    });

    } else {

	    db.collection(TEAMS_COLLECTION).find({}).toArray(function(err, docs) {
	    	if (err) {
	          handleError(connection.res, err.message, "Failed to get teams.");
	        } else {
			    events.emit('data:set:team', docs);
	          	//connection.res.send(docs);
	        }
	    });

	}

});