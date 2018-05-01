let ip = require('ip')
let dgram = require('dgram')
let net = require('net')

const PORT = 8765
const HOST = ip.address()

const DNSHOST = '192.168.15.13'

// database table
let database = [
  { id: '1', status: 'pronto' },
  { id: '2', status: 'em andamento' },
  { id: '3', status: 'não pronto' },
  { id: '4', status: 'pronto' },
  { id: '5', status: 'em andamento' },
  { id: '6', status: 'não pronto' },
]

// registro do database em nameserver
let message = new Buffer('database set')
let db = dgram.createSocket('udp4')
db.bind(PORT, HOST)
db.send(message, 0, message.length, 1234, DNSHOST, (err) => {
  if (err) {
    console.log('trollou registro de endereco em nameserver')
  }
  db.close()
})

// tcp server
let server = net.createServer((serverclient) => {

  serverclient.on('data', async (data) => {
    dado = data.toString()

    let flag = false

    await database.map((item, index) => {
      if (item.id === dado) {
        serverclient.write(item.status)
        console.log('dado encontrado... enviado para ' + serverclient.remoteAddress)
        serverclient.destroy()
        flag = true
      }
    })

    if (flag === false){
      serverclient.write('nao encontrado')
      console.log('dado nao encontrado... enviada resposta para ' + serverclient.remoteAddress)
      serverclient.destroy()
    }
  })
})

server.on('listening', () => {
  const address = server.address()
  console.log(`server listening ${address.address}:${address.port}`)
})

server.on('close', () => {
  message = new Buffer('rmv')
  db = dgram.createSocket('udp4')
  db.bind(PORT, HOST)
  db.send(message, 0, message.length, 1234, DNSHOST, (err) => {
      if (err) {
          console.log('trollou ao remover endereco em nameserver')
      }

      db.close()
      console.log('Dataserver finalizado com sucesso.')
  })
})

process.on('SIGINT', () => {
  server.close()
})

server.listen(PORT, HOST)
