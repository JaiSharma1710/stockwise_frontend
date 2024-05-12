"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "react-charts";

const CustomChart = ({ data, error }) => {
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

  if (!Array.isArray(data) || error) {
    return (
      <div className="w-full h-[30rem] bg-gray-100 rounded-md flex justify-center items-center">
        <p>Chart failed</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[30rem] bg-gray-100 rounded-md flex justify-center items-center">
      <p className={showChart ? 'hidden' : 'block'}>Loading...</p>
      <Chart
        className={!showChart ? 'hidden' : 'block'}
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          defaultColors: ["red"],
        }}
      />
    </div>
  );
};

export default CustomChart;
