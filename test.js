const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:9527');//, {headers:{Authorization:'MTA4MDAwOTI1NDYyODQ5OTQ3Ng.GAS6SR.Tbh9Y9jhzWb_qKKeBAicB8ZTdbr69DZuBYzL4g'}}

ws.on('error', console.error);

ws.on('open', function open() {
    console.log('websocket open');
  ws.send('hello world!');
});

ws.on('message', function message(data) {
    console.log('received: %s', data);
    ws.send('heiheihei');
});

ws.once('close', function (event){
    console.log(`going to close, code: ${event.code}, reason: ${event.reason}`);
});

// setTimeout(()=> {
//     ws.close();
// }, 30 * 1000);