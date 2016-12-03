/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert
    , events = require('monument').events
    , fakeConnection = require('../test_stubs/connectionStub');

require('./api/v1/team');

describe('/api/v1/team route file tests', () => {
    beforeEach(() => {
        fakeConnection.reset();
    });

    it('should respond to route:/api/v1/team:get', () => {
        events.emit('route:/api/v1/team:get', fakeConnection);

        assert.strictEqual(fakeConnection.out().response, 'route /api/v1/team now responding to get requests');
    });

    it('should respond to route:/api/v1/team:post', () => {
        events.emit('route:/api/v1/team:post', fakeConnection);

        assert.strictEqual(fakeConnection.out().response, 'route /api/v1/team now responding to post requests');
    });
});