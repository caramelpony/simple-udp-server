//Require Node Base Module
var udp = require('dgram');

//Create a variable to instansiate a UDP IPv4 Socket
var client = udp.createSocket('udp4');

//Collect array of arguments
var arguments = process.argv;

//Create a payload to send to server
var data = Buffer.from('test payload');

//Verifying valid IP address
function ValidateIPaddress(ipaddress) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
      return (true);  
    }
    return (false);  
} 

//Create a handler for recieved messages
client.on('message',function(msg,info){
    console.log('\x1b[36mData received from the server: x1b[0m' + msg.toString());
    console.log('\x1b[36mReceived %d bytes from %s:%d\n\x1b[0m',msg.length, info.address, info.port);
});

//Verify that required arguments are presented
if (arguments.length <= 2){
    console.log('\x1b[36m%s\x1b[0m', 'Not enough arguments!\nAcceptable arguments:');
    console.log("\x1b[31m-i\x1b[0m\x1b[36m | IPv4 server address\n\x1b[0m\x1b[31m-p\x1b[0m\x1b[36m | IPv4 server port\x1b[0m");
} else {
    if(arguments.indexOf('-i') == -1){
        return console.log('\x1b[36m%s\x1b[0m', 'Please specify an IPv4 address with the -i argument.');
    }else{
        if(arguments.indexOf('-p') == -1){
            return console.log('\x1b[36m%s\x1b[0m', 'Please specify a Port number with the -p argument.');
        }else{
            var ipArgIndex = arguments.indexOf('-i');
            var ipAddrIndex = ipArgIndex + 1;
            var ipAddr = arguments[ipAddrIndex];
            var portArgIndex = arguments.indexOf('-p');
            var portNumIndex = portArgIndex + 1;
            var portNum = arguments[portNumIndex];
            if (ipAddr == null){
                return console.log('\x1b[36m%s\x1b[0m', 'Please specify an IPv4 address!');
            }else{
                if (portNum ==null){
                    return console.log('\x1b[36m%s\x1b[0m', 'Please specify a port number!');
                }else{
                    if(ValidateIPaddress(ipAddr)){
                        client.send(data,portNum,ipAddr,function(error){
                            if(error){
                                client.close();
                            }else{
                                console.log('\x1b[32m%s\x1b[0m', 'Payload sent to server at '+ ipAddr + ' on port ' + portNum + '!');
                            }
                        });
                    } else {
                        return console.log('\x1b[36m%s\x1b[0m', 'Please enter a valid IPv4 address!');
                    }
                }
            }
        }
    }
}