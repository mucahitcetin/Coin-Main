// AssetRow.tsx

import React, { useEffect, useState } from "react";
import { subscribeToTicker } from "../services/websocket";
import SparklineChart from "./SparklineChart";
import millify from "millify";
import formatNumber from "../utils/formatNumber";
import { Asset } from "../types";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import parseSymbol from "../utils/parseSymbol";
import Symbol from "./Symbol";

interface AssetRowProps {
  asset: Asset;
}

const AssetRow: React.FC<AssetRowProps> = ({ asset }) => {
  const [price, setPrice] = useState(asset.lastPrice);
  const [marketValue, setMarketValue] = useState(asset.lastPrice);
  const [change, setChange] = useState(asset.priceChangePercent);
  const [priceClass, setPriceClass] = useState("");
  const [sparklineData, setSparklineData] = useState<number[]>([]);

  const { coin, currency } = parseSymbol(asset.symbol);

  useEffect(() => {
    const unsubscribe = subscribeToTicker(
      asset.symbol.toLowerCase(),
      (data) => {
        setPriceClass(data.p > price ? "text-green-500" : "text-red-500");
        setPrice(data.c);
        setMarketValue(data.q);
        setChange(data.P);
        setSparklineData((prevData) => [...prevData, data.c].slice(-24));
        setTimeout(() => setPriceClass(""), 1000);
      }
    );
    return () => unsubscribe();
  }, [asset.symbol, price]);

  const getColorClass = (change: number) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "text-gray-500";
  };

  const getArrowIcon = (change: number) => {
    if (change > 0) return <GoArrowUpRight className="inline mr-1" />;
    if (change < 0) return <GoArrowDownRight className="inline mr-1" />;
    return null;
  };

  return (
    <tr className="py-2 hover:bg-gray-200 transition-colors duration-300">
      <td className="py-4">
        <span className="font-semibold">{coin}</span>
        <Symbol currency={currency} />
      </td>
      <td className={`ps-5 py-2 text-right font-semibold ${priceClass}`}>
        {formatNumber(price)}
        <Symbol currency={currency} />
      </td>
      <td className="py-2 text-right font-semibold">
        {millify(+marketValue)}
        <Symbol currency={currency} />
      </td>
      <td className={`py-2 font-semibold ${getColorClass(+change)} text-right`}>
        {getArrowIcon(+change)}
        {Math.abs(parseFloat(Number(change).toFixed(2)))}%
      </td>
      <td className="ps-4 py-2">
        <SparklineChart data={sparklineData} />
      </td>
    </tr>
  );
};

export default AssetRow;
