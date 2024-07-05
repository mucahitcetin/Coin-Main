import React, { useEffect, useState } from "react";
import { getAssets } from "../services/binanceApi";
import AssetRow from "./AssetRow";
import { Asset } from "../types";
import Pagination from "./Pagination";

const AssetTable: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;
  const currentPageData = assets.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(assets.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAssets();
      setAssets(data);
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto p-4 md:p-8 min-h-screen  md:grid md:place-items-center container mx-auto">
      <table className="min-w-full ">
        <thead className=" rounded-md ">
          <tr>
            <th className="py-3 text-left text-xs font-semibold text-gray-400 tracking-wider w-1/2">
              Crypto
            </th>
            <th className="ps-4 md:ps-8 py-3 text-right text-xs font-semibold text-gray-400  tracking-wider">
              Price
            </th>
            <th className="ps-4 md:ps-8 py-3 text-right text-xs font-semibold text-gray-400 whitespace-nowrap tracking-wider ">
              Market Value
            </th>
            <th className="ps-4 md:ps-8 py-3 text-right text-xs font-semibold text-gray-400 whitespace-nowrap tracking-wider ">
              24h Change
            </th>
            <th className="py-3 min-w-[100px]"></th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((asset) => (
            <AssetRow key={asset.symbol} asset={asset} />
          ))}
        </tbody>
      </table>

      <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
    </div>
  );
};

export default AssetTable;
