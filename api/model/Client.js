import { ENGINE_METHOD_DIGESTS } from 'constants';

var PORT = 1234; //porta
var HOST = '127.0.0.1'; //ip

var EMD = require('')
var dgram = require('dgram');
var message = new Buffer('Testando!');
var test = helper.test;
var dig = require('./dig');
var ipServer = "";

var client = dgram.createSocket('udp4');

//test('answer query: example.com (A)', function (t) {
    dig('example.com', 'A', options, function (err, results) {
           // t.ifError(err);
            //ipServer = t.deepEqual(results.answers, [{
                  //  name: 'example.com.',
                  //  ttl: 5, type: 'A',
                   // target: '127.0.0.1'}]);

            client.send(message, 0, message.length, PORT, ipServer.target, function(err, bytes) {
                if (err) throw err;
                    console.log('UDP enviado a: ' + ipServer.target +':'+ PORT);
                    client.close();
                    t.end(); 
                    });       
    });
//});


/*   esperar a resposta do servidor
client.on('listening', function () {
    var address = client.address();
    console.log('cliente esperando resposta em: ' + address.address + ":" + address.port);
});
*/
