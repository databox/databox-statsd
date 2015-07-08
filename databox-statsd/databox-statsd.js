var util = require('util'),
    Databox = require('databox');

var d = new Databox({
    push_token: 'token'
});

d.push({
    key: 'js.test.me',
    value: 123
}, function(result){
    console.log(result);
});


util.log("hey hey,...");

exports.init = function databox_init(startup_time, config, events) {

    return true;
};
