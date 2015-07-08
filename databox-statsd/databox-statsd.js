var util = require('util'),
    Databox = require('databox'),
    moment = require('moment');

var debug, l, databox;

var flush_stats = function databox_flush(ts, metrics) {
    var dbDate = moment(new Date(ts*1000)).format("YYYY-MM-DD H:mm:ss");
    console.log("--- flush_stats --- --- ---");
    console.log(metrics);
};

var databox_init = function(startup_time, config, events, logger) {
    debug = config.debug;
    l = logger;
    databox = new Databox((config.databox || {}));

    events.on('flush', flush_stats);

    return true;
};

module.exports.init = databox_init;
