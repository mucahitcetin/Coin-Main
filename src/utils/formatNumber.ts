const formatNumber = (number: string): string => {
  let parsedNumber = parseFloat(number).toString();

  if (parsedNumber.includes(".")) {
    parsedNumber = parsedNumber
      .replace(/(\.\d*?[1-9])0+$/g, "$1")
      .replace(/\.0+$/, "");
  }

  return parsedNumber;
};

export default formatNumber;
