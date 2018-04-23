var PORT = 1234; //porta
var HOST = '127.0.0.1'; //ip

var dgram = require('dgram');
var message = new Buffer('Testando!');

var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP enviado a: ' + HOST +':'+ PORT);
    client.close();
});

/*   esperar a resposta do servidor
client.on('listening', function () {
    var address = client.address();
    console.log('cliente esperando resposta em: ' + address.address + ":" + address.port);
});
*/
