var PORT = 1234; //porta
var HOST = '127.0.0.1'; //ip

var dgram = require('dgram');
var message = new Buffer('SERV1!');
var test = helper.test;
var dig = require('./dig');


test('answer query: example.com (A)', function (t) {
    dig('example.com', 'A', options, function (err, results) {
            t.ifError(err);
            t.deepEqual(results.answers, [{
                    name: 'example.com.',
                    ttl: 5, type: 'A',
                    target: '127.0.0.1'
            }]);
            t.end();
    });
});