
// create a socket instance if it doesn't exist'
// eslint-disable-next-line no-unused-vars
function createSocket () {
    if(createSocket.prototype.socket) return createSocket.prototype.socket;
    return new Promise((resolve, reject) => {
        createSocket.prototype.subscriptions = new Set();
        try {
            createSocket.prototype.socket = new WebSocket(`wss://ws.finnhub.io?token=${import.meta.env.VITE_FINNHUB_SECRET}`);
            createSocket.prototype.socket.addEventListener('open', () => {
                resolve(createSocket.prototype.socket);                
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
}


export const subscribeToSymbol = async (symbol, cb) => {
    const socketInstance = await createSocket();
    const subscriptions = createSocket.prototype.subscriptions
    if(subscriptions.has(symbol)) {
        return new Error('Already subscribed to this symbol');
    }
    while(socketInstance.readyState !== 1) await new Promise(res => setTimeout(res, 1000));
    console.log("Subscribing to symbol: ", symbol);
    socketInstance.send(JSON.stringify({'type':'subscribe', 'symbol': symbol}))
    socketInstance.addEventListener('message', cb);
    subscriptions.add(symbol);
}

export const unsubscribeFromSymbol = async (symbol) => {
    const socketInstance = await createSocket();
    const subscriptions = createSocket.prototype.subscriptions
    if(!subscriptions.has(symbol)) {
        return new Error('The symbol is not subscribed');
    }
    console.log("Unsubscribing from symbol: ", symbol);
    socketInstance.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
    subscriptions.delete(symbol);
}