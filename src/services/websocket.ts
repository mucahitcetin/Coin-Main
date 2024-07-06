const BASE_WS_URL = "wss://stream.binance.com:9443/ws";

export const subscribeToTicker = (
  symbol: string,
  callback: (data: any) => void
) => {
  const ws = new WebSocket(`${BASE_WS_URL}/${symbol.toLowerCase()}@ticker`);

  ws.onopen = () => {
    console.log("WebSocket connection established");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    callback(data);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return () => ws.close();
};
