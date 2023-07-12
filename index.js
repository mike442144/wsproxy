const WebSocket = require('ws');
const logger = require('pino')();

const port = 9527;
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
    const client = new WebSocket('wss://gateway.discord.gg');

    client.on('open', () => {
        logger.info('Connected to Discord Gateway');
    });

    client.on('message', (message) => {
        logger.debug('Received from Discord:', message);
        
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    });

    client.on('error', err => {
        logger.error(err.message);
        
        if(ws.readyState===WebSocket.OPEN)
            ws.close(err.code, err.message);
    });

    client.on('close', (code, reason) => {
        logger.info(`Disconnected from Discord Gateway, code: ${code}, reason: ${reason}`);

        if(ws.readyState === WebSocket.OPEN){
            ws.close(code, reason);
        }
    });

    ws.on('message', (message) => {
        logger.debug(message);
        
        if (client.readyState === WebSocket.OPEN)
            client.send(message);
    });

    ws.on('close', (code, reason) => {
        logger.info(`Client disconnected, code: ${code}, reason: ${reason}`);
        
        if(client.readyState === WebSocket.OPEN)
            client.close(code, reason);
    });

    ws.on('error', error =>{
        logger.error(error.message);

        if(client.readyState === WebSocket.OPEN)
            client.close(error.code, error.message);
    })
});

wss.on('error', err => {
    logger.error(JSON.stringify(err));
});

logger.info(`WebSocket server is running on port ${port}`);
