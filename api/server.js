let ip = require('ip')
let net = require('net')
let dgram = require('dgram')

const PORT = 4321
const HOST = ip.address()

let message

// server register
message = new Buffer('consultarExame set')
let serv1 = dgram.createSocket('udp4')
serv1.bind(PORT, HOST)

serv1.send(message, 0, message.length, 1234, '192.168.15.13', (err) => {
    if (err) {
        console.log('trollou no registro em nameserver')
    }
    serv1.close()
})

// tcp server
let server = net.createServer((cliente) => {

    // pegar endereco de dataserver em nameserver (udp4)
    serv1 = dgram.createSocket('udp4')
    serv1.bind(PORT, HOST)

    message = new Buffer('database get')
    serv1.send(message, 0, message.length, 1234, '192.168.15.13', (err) => {
        if (err) {
            console.log('trollou ao requisitar endereco de dataserver em nameserver')
        }
    })

    
    // ao receber endereco de dataserver
    serv1.on('message', (message, info) => {

        let address = message.toString().split(" ")
        serv1.close()
        
        let serv = new net.Socket()

        // acessar banco de dados
        serv.connect(address[1], address[0], () => {
            cliente.on('data', (data) => {
                serv.write(data)

                // repassar mensagem do bd para o cliente
                serv.on('data', (data) => {
                    cliente.write(data)
                    serv.destroy()
                    cliente.destroy()
                    console.log('Cliente atendido com sucesso')
                })
            })
        })

    })
})

server.on('listening', () => {
    const address = server.address()
    console.log(`server listening ${address.address}:${address.port}`)
})

server.on('close', () => {
    serv1 = dgram.createSocket('udp4')
    serv1.bind(PORT, HOST)

    message = new Buffer('rmv')
    serv1.send(message, 0, message.length, 1234, '192.168.15.13', (err) => {
        if (err) {
            console.log('trollou ao remover endereco em nameserver')
        }

        serv1.close()
        console.log('Server finalizado com sucesso.')
    })
})

process.on('SIGINT', () => {
    server.close()
})

server.listen(PORT, HOST)