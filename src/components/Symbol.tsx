import React from "react";

interface SymbolProps {
  currency: string;
}

const Symbol: React.FC<SymbolProps> = ({ currency }) => {
  return (
    <span className="text-gray-400 text-xs font-[500] ps-1 font-mono">
      {currency}
    </span>
  );
};

export default Symbol;
