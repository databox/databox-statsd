var path = require('path'),
    assert = require('assert'),
    util = require('util'),
    Databox = require('databox'),
    moment = require('moment');

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

    describe('flush_stats', function () {
        it('can push counter', function () {
            Databox.prototype.insertAll = function (kpis, cb) {
                assert.equal(kpis.length, 1);
            };

            var r = databox_statsd.databox_flush_stats(moment().unix(), {
                counters: {
                    'statsd.bad_lines_seen': 0,
                    'databox.statsd.counter': 10
                },
                timers: {}
            });
        });

        it('can push timers', function () {
            Databox.prototype.insertAll = function (kpis, cb) {
                assert.equal(kpis.length, 13);
            };

            var r = databox_statsd.databox_flush_stats(moment().unix(), {
                counters: {},
                timers: {
                    'upload.timer': [300, 400],
                    "a": [10]
                },
                timer_data: {
                    'upload.timer': {
                        sum_squares_90: 680000,
                        std: 94.28090415820634,
                        upper: 600,
                        lower: 400,
                        count: 30,
                        count_ps: 3,
                        sum: 1400,
                        sum_squares: 680000,
                        mean: 466.6666666666667,
                        median: 400
                    }
                }
            });
        });
    });
});
