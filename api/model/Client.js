var PORT = 1234;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var message = new Buffer('consultarExame get');
var net = require('net');
var idExame = '2';


var client = new net.Socket();
var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, (err) => {
  console.log('mensagem enviada ao Nameserver!!')
});

client.on('message', function (message, info) {
  
  console.log('>>' + message + '<<')
  console.log(info.address + ':' + info.port +' - ' + message);

    client.connect(4321, message, function() {
      console.log('Conectado!!');
      client.write(idExame);
        client.on('data', function(data) {
          console.log('Status do Seu Exame: ' + data);
          //client.destroy();
        });
    });
});

client.on('listening', () => {
  const address = client.address();
  console.log(`server listening ${address.address}:${address.port}`);
});


