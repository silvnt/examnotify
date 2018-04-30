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
    quarry.persistence.create_record(message.slice(0, message.length-4), { address: rinfo.address, type: "A", ttl: 60 }, function(err){
      if(err)
          throw err;
    });

  }else if(message.includes('get')){
    quarry.persistence.get_configuration(function(err, configuration){
      if(err)
          throw err;

      console.log(configuration.records[message.slice(0, message.length-4)])

      var record = configuration.records[message.slice(0, message.length-4)]
      
      //console.log(record);
      //console.log("desgraça:" + record.address[0])
     // console.log(rinfo)
      //console.log(rinfo.port,rinfo.address,record.address[0])
      //console.log(record.address[0])
      var a = record.address[0].toString()

      server.send(a, 0, record.address[0].length, rinfo.port,rinfo.address);
    });
  }else if(message.includes('rmv')){
    quarry.persistence.delete_record(message.slice(0, message.length-4), function(err){
      if(err)
          throw err;
    });
  }
  
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(1234);