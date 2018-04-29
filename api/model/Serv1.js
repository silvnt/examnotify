var PORT = 1234;
var HOST = '127.0.0.1'

// registro do server
const dgram = require('dgram')
const registro = new Buffer('consultarExame set')
const serv1 = dgram.createSocket('udp4')
serv1.send(registro, 0, registro.length, PORT, HOST, (err) => {
 serv1.close()
});

