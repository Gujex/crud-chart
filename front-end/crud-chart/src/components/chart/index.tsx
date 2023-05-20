import React from "react";
import { Pie } from "@ant-design/plots";

const DemoPie = ({ data }: any) => {
  const config = {
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",

    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  // @ts-ignore
  return <Pie {...config} />;
};

export default DemoPie;
