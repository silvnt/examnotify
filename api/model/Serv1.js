var PORT = 1234;
var HOST = '127.0.0.1'

// registro do server
const dgram = require('dgram')
const registro = new Buffer('consultarExame set')
const serv1 = dgram.createSocket('udp4')
serv1.send(registro, 0, registro.length, PORT, HOST, (err) => {
 serv1.close()
});

net = require('net');

var server = net.createServer();
//depois tirar o predefinido
server.listen(1234, '127.0.0.1');


//pegar ip do banco de dados
var datagrama = require('dgram');
var mensagem = new Buffer('database get');

var servidor1 = dgram.createSocket('udp4');
servidor1.send(message, 0, message.length, PORT, HOST, (err) => {
  
});

servidor1.on('message', function (message, info) {
  
  console.log('>>' + message + '<<')
  console.log(info.address + ':' + info.port +' - ' + message);
});

servidor1.on('listening', () => {
  const address = servidor1.address();
  console.log(`server listening ${address.address}:${address.port}`);
});
//fim do pegar ip do banco de dados

