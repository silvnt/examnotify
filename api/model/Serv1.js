var PORT = 1234;
var HOST = '127.0.0.1'

// registro do server
const dgram = require('dgram')
const registro = new Buffer('consultarExame set')
const serv1 = dgram.createSocket('udp4')

serv1.send(registro, 0, registro.length, PORT, HOST, (err) => {
    
});

net = require('net');

var server = net.createServer(function(cliente) {

    
        
    //pegar ip do banco de dados
var datagrama = require('dgram');
var message = new Buffer('database get');


serv1.send(message, 0, message.length, PORT, HOST, (err) => {
  
});

var conexao = require('net');

var serv = new conexao.Socket();

serv1.on('message', function (message, info) {

  console.log('>canceratico>' + message + '<desgraçado<')
  console.log(info.address + ':' + info.port +' - ' + message);
    serv.connect(8765, message, function() {
        console.log('Connected');
        cliente.on('data', function(data) {
        console.log(data)
        serv.write(data);
            serv.on('data', function(data) {
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
})



//depois tirar o predefinido
server.listen(4321, '127.0.0.1');




