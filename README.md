# Simple UDP Server
## This was a utility for one of my previous positions
## figured I'd host it incase I need it again.

Simple UDP server to test UDP port forwarding on SCP Routers

## Getting started

To use the client, you'll have to specify both a port number and an IPv4 Address.
```
node client.js -i 127.0.0.1 -p 50
```

To use the server, only a port number is needed as the server will bind to all host interfaces.
```
node app.js -p 50
```

The client must be run after the server has been initialized, and within a short 8000ms timeout.
Current functionality is limited to one payload and one reply per run.
