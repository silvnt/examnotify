var PORT = 1234;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var message = new Buffer('consultarExame get');

var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, (err) => {

});

client.on('listening', () => {
  const address = client.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

client.on('message', function (message, info) {
  console.log(info.address + ':' + info.port +' - ' + message);
});

