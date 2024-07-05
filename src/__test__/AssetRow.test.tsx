import { render } from "@testing-library/react";
import AssetRow from "../components/AssetRow";
import { Asset } from "../types";

jest.mock("../utils/formatNumber", () => (num: number) => `formatted-${num}`);
jest.mock("../components/SparklineChart", () => () => (
  <div data-testid="sparkline-chart" />
));

describe("AssetRow", () => {
  const asset: Asset = {
    symbol: "Bitcoin",
    lastPrice: "45000",
    priceChange: "21.00000000",
    priceChangePercent: "5",
    weightedAvgPrice: "4014.88854297",
    prevClosePrice: "4023.00000000",
    lastQty: "5.00000000",
    bidPrice: "4020.00000000",
    bidQty: "100.00000000",
    askPrice: "4029.00000000",
    askQty: "10.00000000",
    openPrice: "4008.00000000",
    highPrice: "4043.00000000",
    lowPrice: "3980.00000000",
    volume: "272383.00000000",
    quoteVolume: "1093587386.00000000",
    openTime: 1720092372246,
    closeTime: 1720178772246,
    firstId: 95729,
    lastId: 101155,
    count: 5427,
  };

  test("renders the asset name", () => {
    const { getByText } = render(<AssetRow asset={asset} />);
    expect(getByText("Bitcoin")).toBeInTheDocument();
  });

  test("renders the formatted price", () => {
    const { getByText } = render(<AssetRow asset={asset} />);
    expect(getByText("formatted-45000")).toBeInTheDocument();
  });

  test("renders the change percentage with positive class", () => {
    const { getByText } = render(<AssetRow asset={asset} />);
    const changeElement = getByText("5%");
    expect(changeElement).toBeInTheDocument();
    expect(changeElement).toHaveClass("text-green-500");
  });

  test("renders the change percentage with negative class", () => {
    const negativeAsset = { ...asset, priceChangePercent: "-5" };
    const { getByText } = render(<AssetRow asset={negativeAsset} />);
    const changeElement = getByText("-5%");
    expect(changeElement).toBeInTheDocument();
    expect(changeElement).toHaveClass("text-red-500");
  });

  test("renders the SparklineChart with correct data", () => {
    const { getByTestId } = render(<AssetRow asset={asset} />);
    expect(getByTestId("sparkline-chart")).toBeInTheDocument();
  });
});
