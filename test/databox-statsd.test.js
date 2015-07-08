var path = require('path'),
    assert = require('assert'),
    util = require('util');

var databox_statsd = require(path.join('../databox-statsd', 'databox-statsd.js'));

describe('Databox Statsd', function () {

    describe('init', function () {

        it('should be true if everything is fine', function () {
            var events = {
                on: function (event, callback) {
                    assert.equal(event, 'flush');
                }
            };

            assert.equal(databox_statsd.init(-1, {
                databox: {
                    push_token: "token"
                }
            }, events, {}), true);
        });
    });
});