import axios from 'axios';

const fetchUrl = "https://finnhub.io/api/v1/";

export const getAllExchanges = async () => {
    try {
        const response = await axios.get(`${fetchUrl}forex/exchange?token=${import.meta.env.VITE_FINNHUB_API_KEY}`);
        return response.data; 
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

export const getAllSymbols = async (exchange) => {
    try {
        const response = await axios.get(`${fetchUrl}forex/symbol?exchange=${exchange}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`);
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}


export const scales = Object.freeze({
    "15M": {
        // We have to deduct an extra minute since the Api has no recent data
        date: () => Math.floor(new Date().getTime()/1000)-16*60,
        resolution: 1
    },
    "1H": {
        date: () =>  Math.floor(new Date().getTime()/1000)-61*60,
        resolution: 1
    },
    "1D": {
        date: () => Math.floor(new Date().getTime()/1000)-(24*60+1)*60,
        resolution: 15
    },
    "1W": {
        date: () => Math.floor(new Date().getTime()/1000)-(7*24*60+1)*60,
        resolution: 60
    },
    "1M": {
        date: () => Math.floor(new Date().getTime()/1000)-(30*7*24*60+1)*60,
        resolution: "D"
    },
    "1Y": {
        date: () => Math.floor(new Date().getTime()/1000)-(365*7*24*60+1)*60,
        resolution: "D"
    }
});


export const getRates = async (symbol, scale) => {
    // We have to deduct an extra minute since the Api has no recent data
    const currentUnixTimeStamp = Math.floor(new Date().getTime()/1000 - 60);
    try {
        const response = await axios.get(`${fetchUrl}forex/candle?symbol=${symbol}&resolution=${scales[scale].resolution}&from=${scales[scale].date()}&to=${currentUnixTimeStamp}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`);
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}
