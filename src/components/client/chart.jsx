"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "react-charts";

const CustomChart = ({ isIncrease, data, error }) => {
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowChart(true);
    }, 1000);
  }, []);

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum?.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum?.secondary,
      },
    ],
    []
  );

  if (Array.isArray(data) && !data.length) {
    return (
      <div className="w-full h-[30rem] bg-gray-50 rounded-md flex justify-center items-center">
        <p>Market is closed for now wait for some time</p>
      </div>
    );
  }

  if (!Array.isArray(data) || error) {
    return (
      <div className="w-full h-[30rem] bg-gray-50 rounded-md flex justify-center items-center">
        <p>Chart failed</p>
      </div>
    );
  }

  const defaultColors = isIncrease ? ["green"] : ["red"];

  return (
    <div className="w-full h-52 lg:h-[30rem] bg-gray-50 overflow-hidden rounded-md flex justify-center items-center">
      <p className={showChart ? "hidden" : "block"}>Loading...</p>
      <div
        className={`w-full h-full flex justify-center items-center ${
          isIncrease ? "bg-green-100" : "bg-red-100"
        } ${!showChart ? "hidden" : "block"}`}
      >
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            defaultColors: defaultColors,
          }}
        />
      </div>
    </div>
  );
};

export default CustomChart;
