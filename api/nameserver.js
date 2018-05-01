let ip = require('ip')
let dgram = require('dgram')

const PORT = 1234
const HOST = ip.address()

// dns table
let table = []

// udp4 server

let server = dgram.createSocket('udp4')

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`)
  server.close()
})

server.on('message', (msg, rinfo) => {
  let message = msg.toString()

  if (message.includes('set')) {
    table.push(
      {
        name: message.slice(0, message.length - 4),
        ip: rinfo.address,
        port: rinfo.port,
        type: 'A',
      }
    )

    console.log(rinfo.address + ':' + rinfo.port + ' registred')

  } else if (message.includes('get')) {

    let res = table.filter((reg) => {
      return reg.name == message.slice(0, message.length - 4)
    })

    let n = Math.floor((Math.random() * res.length))
    let choosed = res[n]

    let msg = choosed.ip + ' ' + choosed.port
    server.send(msg, 0, msg.length, rinfo.port, rinfo.address)

    console.log(choosed.ip + ':' + choosed.port + ' acessed by ' + rinfo.address + ':' + rinfo.port)

  } else if (message.includes('rmv')) {

    let index = table.findIndex((item) => {
      return item.ip === rinfo.address
    })

    table.splice(index, 1)
    
    console.log(rinfo.address + ':' + rinfo.port + ' removed')

  } else {
    console.log('operacao desconhecida -> ' + message + ' (de ' + rinfo.address + ')')
  }

})

server.on('listening', () => {
  const address = server.address()
  console.log(`server listening ${address.address}:${address.port}`)
})

server.bind(PORT, HOST)