var name = require('../../node_modules/node-named/lib')
var nameserver = name.createServer()
var ipserver = '127.0.0.1'

nameserver.listen(4444, ipserver, function(){
  console.log('Nameserver started (' + ipserver + ':4444)')
})

nameserver.on('query', function(query){
  var domain = query.name()
  var record = new nameserver.ARecord(ipserver)
  query.addAnswer(domain, record)
  query.respond()
})

nameserver.on('clientError', function(error) {
  console.log("clientError: %s", error);
});

nameserver.on('uncaughtException', function(error) {
  console.log("exception: %s", error.message());
});