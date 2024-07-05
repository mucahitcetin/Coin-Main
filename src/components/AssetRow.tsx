import React, { useEffect, useState } from "react";
import { subscribeToTicker } from "../services/websocket";
import SparklineChart from "./SparklineChart";
import millify from "millify";
import formatNumber from "../utils/formatNumber";
import { Asset } from "../types";

interface AssetRowProps {
  asset: Asset;
}
const Symbol = () => {
  return <span className="text-gray-400 text-xs font-[500] ps-1">USDT</span>;
};

const AssetRow: React.FC<AssetRowProps> = ({ asset }) => {
  const [price, setPrice] = useState(asset.lastPrice);
  const [marketValue, setMarketValue] = useState(asset.lastPrice);
  const [change, setChange] = useState(asset.priceChangePercent);
  const [priceClass, setPriceClass] = useState("");
  const [sparklineData, setSparklineData] = useState<number[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToTicker(
      asset.symbol.toLowerCase(),
      (data) => {
        console.log(data);
        setPriceClass(data.p > price ? "text-green-500" : "text-red-500");
        setPrice(data.p);
        setMarketValue(data.q);
        setChange(data.P);
        setSparklineData((prevData) => [...prevData, data.p].slice(-24));
        setTimeout(() => setPriceClass(""), 1000);
      }
    );
    return () => unsubscribe();
  }, [asset.symbol, price]);

  return (
    <tr>
      <td className="py-4">
        <span className="font-semibold">{asset.symbol}</span>
        <span className="text-gray-400 font-medium max-sm:hidden ps-1">
          / USDT
        </span>
      </td>
      <td className={`ps-5 py-2 text-right ${priceClass}`}>
        {formatNumber(price)}
        <Symbol />
      </td>
      <td className="py-2 text-right">
        {millify(+marketValue)}
        <Symbol />
      </td>
      <td
        className={`py-2 ${
          +change > 0 ? "text-green-500" : "text-red-500"
        } text-right`}
      >
        {parseFloat(Number(change).toFixed(2))}%
      </td>
      <td className="ps-4 py-2">
        <SparklineChart data={sparklineData} />
      </td>
    </tr>
  );
};

export default AssetRow;
