import React from "react";
import axios from "axios";

import Chart from "@/components/client/chart";
import { env_variables } from "@/config";

const Detail = async ({ params }) => {
  const [companySymbol, exchange] = params.symbol.split(".") || [];
  const baseUrl = env_variables.base_api_url;

  // const intraDayPromise = axios.get(
  //   `${baseUrl}/quote/intraday?symbol=${companySymbol}`
  // );

  // const companyDataPromise = axios.get(
  //   `${baseUrl}/quote/current?symbol=${companySymbol}`
  // );

  // const companyRatiosPromise = axios.get(
  //   `${baseUrl}/ratio?symbol=${params.symbol}`
  // );

  // const [intradayData, ratio] = await Promise.all([
  //   intraDayPromise,
  //   companyRatiosPromise,
  // ]);

 const ratio = await axios.get(
    `${baseUrl}/ratio?symbol=${params.symbol}`
  );

  // const presentTime = [];

  // const priceChartData = intradayData.data.data.grapthData
  //   .map((ele) => {
  //     const date = new Date(ele?.[0]);
  //     const minute = date.getUTCMinutes();
  //     const hour = date.getUTCHours();
  //     if (presentTime.includes(`${hour}:${minute}`)) {
  //       return false;
  //     } else {
  //       presentTime.push(`${hour}:${minute}`);
  //     }
  //     return {
  //       secondary: ele?.[1],
  //       primary: new Date(ele?.[0]),
  //     };
  //   })
  //   .filter(Boolean);

  // const chartData = [
  //   {
  //     label: intradayData.data.data.name,
  //     data: priceChartData,
  //   },
  // ];

  const ratioData = ratio.data.data;
  const keys = Object.keys(ratioData);

  return (
    <div className="w-full px-6 py-10">
      <p className="mb-4 text-2xl font-bold">{companySymbol}</p>
      {/* <div className="flex gap-4"> */}
      {/*  <Chart data={chartData} /> */}
        <div className="flex flex-wrap w-1/2 gap-2">
          {keys.map((ratio, index) => {
            return (
              <div key={index} className="bg-gray-200 p-4 rounded w-[30%]">
                <p className="font-bold pb-4 text-center">{ratio}</p>
                <div className="flex justify-evenly text-center gap-2">
                  <div>
                    <p className="mb-4">2024</p>
                    <p>{ratioData[ratio]["2024-03-31T00:00:00+00:00"]}</p>
                  </div>
                  <div>
                    <p className="mb-4">2023</p>
                    <p>{ratioData[ratio]["2023-03-31T00:00:00+00:00"]}</p>
                  </div>
                  <div>
                    <p className="mb-4">2022</p>
                    <p>{ratioData[ratio]["2022-03-31T00:00:00+00:00"]}</p>
                  </div>
                  <div>
                    <p className="mb-4">2021</p>
                    <p>{ratioData[ratio]["2021-03-31T00:00:00+00:00"]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      {/* </div> */}
    </div>
  );
};

export default Detail;
