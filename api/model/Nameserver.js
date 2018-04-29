// dns table
const q = require('../../node_modules/quarry-dns')

const quarry = new q({
  persistence: 'memory'
});

if(quarry){
  quarry.listen(function(){
    console.log('dns table is now listening!')
  })
}

// udp4 server
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  var message = msg.toString()

  if(message.includes('set')){
    quarry.persistence.create_record(message.slice(0, message.length-3), { address: rinfo.address, type: "A", ttl: 60 }, function(err){
      if(err)
          throw err;
    });

  }else if(message.includes('get')){
    quarry.persistence.get_configuration(function(err, configuration){
      if(err)
          throw err;
  
      var record = configuration.records[message.slice(0, message.length-3)];
      console.log(record)
      
      // como dou parse em record pra enviar somente o ip da mensagem?
      //server.send(JSON.parse(record), 0, record.length, rinfo.port, rinfo.address);
    });
  }
  
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(1234);