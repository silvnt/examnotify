var PORT = 1234; //porta
var HOST = '127.0.0.1'; //ip

const dgram = require('dgram');
const registro = Buffer.from({name:'consultarExame', type: 'set'});
const serv1 = dgram.createSocket('udp4');
serv1.send(registro, 1234, 'HOST', (err) => {
 serv1.close();
});
