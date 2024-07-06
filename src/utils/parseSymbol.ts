const parseSymbol = (symbol: string) => {
  const match = symbol.match(/^([A-Z]+)(USDT|USD|TRY)$/);
  return match
    ? { coin: match[1], currency: match[2] }
    : { coin: symbol, currency: "" };
};

export default parseSymbol;
