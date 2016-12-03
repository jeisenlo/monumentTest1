'use strict';
const events = require('monument').events
    , parser = require('monument').parser
    , mongodb = require('mongodb')
    , MONGODB_URI = 'mongodb://' + process.env.MONGODB_USER_DEV + ':' + process.env.MONGODB_PASS_DEV + '@' + process.env.MONGODB_URL_DEV + '/monument'
    , util = require('util')
    , TEAMS_COLLECTION = 'teams';

let db;

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// Make connection to database
mongodb.MongoClient.connect(MONGODB_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");
});

events.on('route:/api/v1/team:get', (connection) => {

    events.once('data:set:team', (team, db) => {
        if (typeof team === 'undefined') {
            events.emit('error:404', connection);
            return;
        }
    });

    events.emit('data:get:team');

    //connection.res.send('route /api/v1/team now responding to get requests.');
});

events.on('route:/api/v1/team:post', (connection) => {
   //parse out the request body
    parser(connection, function (err, body) {
        console.log('err', err);
        console.log('body', body);

        var newTeam = err;
        newTeam.createDate = new Date();

        db.collection(TEAMS_COLLECTION).insertOne(newTeam, function(err, doc) {

            console.log('doc', doc);

            if (err) {
                handleError(connection.res, err.message, "Failed to create new contact.");
            } else {
                connection.res.send(doc);
            }
        });

        //connection.res.send('route /api/v1/team now responding to post requests');
    });
    //connection.res.send('route /api/v1/team now responding to post requests');
});

events.on('route:/api/v1/team/:teamid:get', (connection) => {

    console.log('connection.params: ', connection.params);
    // TODO: Validate teamid 

    db.collection(TEAMS_COLLECTION).findOne({ _id: new mongodb.ObjectID(connection.params.teamid) }, function(err, doc) {
        if (err) {
          handleError(connection.res, err.message, "Failed to get contact");
        } else {
          //res.status(200).json(doc);
          connection.res.send(doc);
        }
    });
    //connection.res.send('route /api/v1/team/:teamid now responding to get requests');
});


events.on('route:/api/v1/team/:teamid:put', (connection) => {
    connection.res.send('route /api/v1/team/:teamid now responding to put requests');
});

events.on('route:/api/v1/team/:teamid:delete', (connection) => {
    connection.res.send('route /api/v1/team/:teamid now responding to delete requests');
});

events.on('route:/api/v1/team/:teamid/rider:get', (connection) => {
    connection.res.send('route /api/v1/team/:teamid/rider now responding to get requests');
});

events.on('route:/api/v1/team/:teamid/rider:post', (connection) => {
    connection.res.send('route /api/v1/team/:teamid/rider now responding to post requests');
});

events.on('route:/api/v1/team/:teamid/rider/:riderid:get', (connection) => {
    connection.res.send('route /api/v1/team/:teamid/rider/:riderid now responding to get requests');
});

events.on('route:/api/v1/team/:teamid/rider/:riderid:put', (connection) => {
    connection.res.send('route /api/v1/team/:teamid/rider/:riderid now responding to put requests');
});

events.on('route:/api/v1/team/:teamid/rider/:riderid:delete', (connection) => {
    connection.res.send('route /api/v1/team/:teamid/rider/:riderid now responding to delete requests');
});