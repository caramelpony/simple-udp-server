//Require Node Base module
var udp = require('dgram');

//Create IPv4 UDP socket
var server = udp.createSocket('udp4');

//Handle any errors
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

var recAddr;
var recPort;

//Collect array of arguments
var arguments = process.argv;

if (arguments.length <= 2){
    console.log('\x1b[36m%s\x1b[0m', 'Not enough arguments!\nAcceptable arguments:');
    return console.log("\x1b[0m\x1b[31m-p\x1b[0m\x1b[36m | IPv4 server port\x1b[0m");
} else {
    if(arguments.indexOf('-p') == -1){
        return console.log('\x1b[36m%s\x1b[0m', 'Please specify a Port number with the -p argument.');
    }else{
        var portArgIndex = arguments.indexOf('-p');
        var portNumIndex = portArgIndex + 1;
        var portNum = arguments[portNumIndex];
        if (portNum ==null){
            return console.log('\x1b[36m%s\x1b[0m', 'Please specify a port number!');
        }else{
            //Handle recieved messages
            server.on('message',function(msg,info){
                console.log('\x1b[32m%s\x1b[0m', 'Data received from the client: ' + msg.toString());
                console.log('\x1b[32mReceived %d bytes from %s:%d\x1b[0m\n',msg.length, info.address, info.port);
                //Replying
                recAddr = info.address;
                recPort = info.port;
                server.send(msg,recPort,recAddr,function(error){
                    if(error){
                        client.close();
                    }else{
                        console.log('\x1b[32m%s\x1b[0m', 'Payload sent to client at '+ recAddr + ' on port ' + recPort + '!');
                    }
                });
            });
        }
    }
}
//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening on port: ' + port);
  console.log('Server IPv4 Addr: ' + ipaddr);
  console.log('Server IP stack: ' + family);
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Socket is closed !');
});

server.bind(portNum);

setTimeout(function(){
server.close();
},8000);