var PORT = 1234;
var HOST = '127.0.0.1'

// registro do database
const dgram = require('dgram')
const registro = new Buffer('database set')
const db = dgram.createSocket('udp4')
db.send(registro, 0, registro.length, PORT, HOST, (err) => {
 db.close()
});

