var ip = require('ip');
var HOST = ip.address();

console.log('Meu ip é ' + HOST)

var dgram = require('dgram');
var message = new Buffer('consultarExame get');
var net = require('net');
var idExame = '2';




var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, 1234, '10.1.2.61', (err) => {
  console.log('mensagem enviada ao Nameserver!!')
});

var tcpClient = new net.Socket();

client.on('message', function (message, info) {

  var address = message.toString().split(" ");
  console.log('mensagem do nameserver: ' + address)
  tcpClient.connect(address[1], address[0], message, function () {
    console.log('Conectado!!');
    tcpClient.write(idExame);
    tcpClient.on('data', function (data) {
      console.log('Status do Seu Exame: ' + data);
      //client.destroy();
    });
  });
});