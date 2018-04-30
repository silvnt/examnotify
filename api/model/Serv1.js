var PORT = 4321;
var HOST = '127.0.0.1'

// registro do server
const dgram = require('dgram')
const registro = new Buffer('consultarExame set')
const serv1 = dgram.createSocket('udp4')
serv1.send(registro, 0, registro.length, 1234, HOST, (err) => {
    serv1.close()
});

net = require('net');

var server = net.createServer(function (cliente) {

    cliente.on('data', function (data) {
        console.log('passei aqui')

        //pegar ip do banco de dados
        var datagrama = require('dgram');
        var mensagem = new Buffer('database get');

        var nameserver = dgram.createSocket('udp4');
        nameserver.send(mensagem, 0, mensagem.length, 1234, HOST, (err) => {
            console.log('requisição db realizada.')
        });

        nameserver.on('message', (msg, rinfo) => {
            var address = msg.toString().split(" ");
            console.log(address)
            //fim do pegar ip do banco de dados

            //agora vou criar uma conexao tcp com o banco pra enviar o q o cliente me passou

            var conexao = require('net');

            var serv = new conexao.Socket();
            //porta do db e ip dele

            serv.connect(address[1], address[0], function () {
                console.log('Connected');
                nameserver.write(cliente.data);
            });

            serv.on('data', function (data) {
                console.log('Received: ' + data);
                server.send(data);
                cliente.destroy();
                serv.destroy(); // kill client after server's response
            });
        });
        
        nameserver.bind(PORT);

    });

})



//depois tirar o predefinido
server.listen(PORT, HOST);