var PORT = 8765;
var ip = require('ip');
var HOST = ip.address();

console.log('Meu ip é ' + HOST)

// registro do database
const dgram = require('dgram')
const registro = new Buffer('database set')
const db = dgram.createSocket('udp4')
db.bind(PORT, HOST)
db.send(registro, 0, registro.length, 1234, '10.1.2.61', (err) => {
  if (err) {
    console.log('trollou')
  }

  console.log('dataserver registrado!')
  db.close()
});



// dataserver
net = require('net')

var database = [
  { id: '1', status: 'pronto' },
  { id: '2', status: 'em andamento' },
  { id: '3', status: 'não pronto' },
  { id: '4', status: 'pronto' },
  { id: '5', status: 'em andamento' },
  { id: '6', status: 'não pronto' },
]

var server = net.createServer(function (serverclient) {

  address = serverclient.address();
  console.log(`server listening ${address.address}:${address.port}`);

  serverclient.on('data', function (data) {
    dado = data.toString()
    console.log(data)

    let flag = false

    database.map(function (item, index) {
      if (item.id === dado) {
        console.log('dado encontrado... a enviar')
        serverclient.write(item.status)
        serverclient.destroy()
        flag = true
      }
    })

    if (flag === false){
      serverclient.write('nao encontrado')
      serverclient.destroy()
    }
  })
})

server.listen(PORT, HOST);