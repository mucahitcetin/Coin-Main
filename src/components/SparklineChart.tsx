import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

interface SparklineChartProps {
  data: number[];
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data }) => {
  console.log(data);
  return (
    <Sparklines data={data} limit={24}>
      <SparklinesLine
        color={data[data.length - 1] > data[0] ? "green" : "red"}
      />
    </Sparklines>
  );
};

export default SparklineChart;
