var PORT = 4321;
var ip = require('ip');
var HOST = ip.address();

console.log('Meu ip é ' + HOST)

// registro do server
const dgram = require('dgram')
const registro = new Buffer('consultarExame set')
const serv1 = dgram.createSocket('udp4')

serv1.bind(PORT, HOST)

serv1.send(registro, 0, registro.length, 1234, '10.1.2.61', (err) => {
    if (err) {
        console.log('trollou')
    }
});

net = require('net');

var server = net.createServer(function (cliente) {

    address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);


    //pegar ip do banco de dados
    var datagrama = require('dgram');
    var message = new Buffer('database get');


    serv1.send(message, 0, message.length, 1234, '10.1.2.61', (err) => {

    });

    var conexao = require('net');

    var serv = new conexao.Socket();

    serv1.on('message', function (message, info) {

        console.log('>>' + message + '<<')
        console.log(info.address + ':' + info.port + ' - ' + message);

        var address = message.toString().split(" ");

        serv.connect(address[1], address[0], function () {
            console.log('Connected');
            cliente.on('data', function (data) {
                console.log(data)
                serv.write(data);
                serv.on('data', function (data) {
                    console.log('Received: ' + data);
                    cliente.write(data);
                    cliente.destroy();
                    serv.destroy(); // kill client after server's response
                });
            });
        });


        serv1.on('listening', () => {
            address = servidor1.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });

        //fim do pegar ip do banco de dados

        //agora vou criar uma conexao tcp com o banco pra enviar o q o cliente me passou

        //porta do db e ip dele

    });
});



//depois tirar o predefinido
server.listen(PORT, HOST);