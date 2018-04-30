// dns table
var table = []

// udp4 server
const PORT = 1234
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  var message = msg.toString()

  if(message.includes('set')){
    table.push(
      {
        name : message.slice(0, message.length-4),
        ip : rinfo.address,
        port : rinfo.port,
        type : 'A',
      }
    )

    console.log(table)

  }else if(message.includes('get')){

    var res = table.filter(function(reg){
      return reg.name == message.slice(0, message.length-4)
    })

    var n = Math.floor((Math.random() * res.length));
    var choosed = res[n]

    console.log(choosed)
    var msg = choosed.ip + ' ' + choosed.port
    server.send(msg, 0, msg.length, rinfo.port,rinfo.address);
    

  }else if(message.includes('rmv')){

  }
  
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(PORT);