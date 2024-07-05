import axios from "axios";

const BASE_URL = "https://api.binance.com/api/v3";

export const getAssets = async () => {
  const response = await axios.get(`${BASE_URL}/ticker/24hr`);

  const sortedData = response.data.sort(
    (a: any, b: any) => b.quoteVolume - a.quoteVolume
  );

  return sortedData.slice(0, 50);
};
