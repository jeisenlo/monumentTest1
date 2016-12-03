
'use strict';

const events = require('monument').events;

events.on('data:get:team', (id) => {
    const hasId = typeof id !== 'undefined';

    db.collection(TEAMS_COLLECTION).find({}).toArray(function(err, docs) {
    	if (err) {
          handleError(connection.res, err.message, "Failed to get teams.");
        } else {
          connection.res.send(docs);
        }
    });

    if (!fetchingStore['data.team']) {
        if (hasId) {
            events.emit('data:set:team:${id}', families[id]);
        } else {
            events.emit('data:set:team', families.empty);
        }
    }
});