var util = require('util'),
    Databox = require('databox'),
    moment = require('moment');

var debug, l, databox;

var flush_stats = function databox_flush(ts, metrics) {
    var dbDate = moment(new Date(ts * 1000)).format('YYYY-MM-DD H:mm:ss');
    payload = [];

    /* Counters */
    payload.push.apply(payload, Object.keys(metrics.counters || {})
            .filter(function (k) {
                return !k.match(/^statsd\./);
            })
            .map(function (k) {
                return {
                    key: k,
                    value: metrics.counters[k],
                    date: dbDate
                };
            })
    );

    /* Timers */
    payload.push.apply(payload,
        Object.keys(metrics.timers || {}).map(function (k) {
            return metrics.timers[k].map(function (v) {
                return {
                    key: k,
                    value: v,
                    date: dbDate
                };
            });
        }).reduce(function (a, b) {
            return a.concat(b);
        }, []));

    /* Timers meta-data */
    payload.push.apply(payload,
        Object.keys(metrics.timer_data || {}).map(function (k) {
            return Object.keys(metrics.timer_data[k]).map(function (i) {
                return {
                    key: [k, i].join('.'),
                    value: metrics.timer_data[k][i],
                    date: dbDate
                };
            });
        }).reduce(function (a, b) {
            return a.concat(b);
        }, []));

    if (payload.length > 0) {
        util.log("Pushing to Databox");

        if(debug) {
          console.log(payload);
        }

        databox.insertAll(payload, function (result) {
          util.log("Databox result", result);
        });
    }
};

var databox_init = function (startup_time, config, events, logger) {
    debug = config.debug;
    l = logger;
    databox = new Databox((config.databox || {}));
    events.on('flush', flush_stats);

    return true;
};

module.exports.databox_flush_stats = flush_stats;
module.exports.init = databox_init;
