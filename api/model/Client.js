
var HOST = '127.0.0.1';

var dgram = require('dgram');
var message = new Buffer('consultarExame get');
var net = require('net');
var idExame = '2';


var tcpClient = new net.Socket();

var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, 1234, HOST, (err) => {
  console.log('mensagem enviada ao Nameserver!!')
});

client.on('message', function (message, info) {

    var address = message.toString().split(" ");

    tcpClient.connect(address[1], address[0], message, function() {
      console.log('Conectado!!');
      tcpClient.write(idExame);
        tcpClient.on('data', function(data) {
          console.log('Status do Seu Exame: ' + data);
          //client.destroy();
        });
    });
});