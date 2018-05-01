let ip = require('ip')
let dgram = require('dgram')
let net = require('net')
let os = require('os')

let idExame = process.argv[2]

if (!idExame){
  console.log('node client.js id_exame')
  return -1
}

const HOST = ip.address()
const DNSHOST = '192.168.15.13'

let message = new Buffer('consultarExame get')

// pegar endereco de server em nameserver
let client = dgram.createSocket('udp4')
client.send(message, 0, message.length, 1234, DNSHOST, (err) => {
  if (err) {
    console.log('trollou consulta de endereco em nameserver')
  }
})

// quando receber endereco
client.on('message', (message, info) => {
  let address = message.toString().split(" ")

  // consultar em server
  let tcpClient = new net.Socket()
  tcpClient.connect(address[1], address[0], message, () => {
    tcpClient.write(idExame)

    // ao receber resposta de server
    tcpClient.on('data', (data) => {
      console.log('Status do Seu Exame: ' + data)
      tcpClient.destroy()
      client.close()
    })
  })
})