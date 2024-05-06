'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

import Chart from '@/components/client/chart';
import { env_variables } from '@/config';

const Detail = () => {
  // const [companySymbol, exchange] = params.symbol.split('.') || [];
  const baseUrl = env_variables.base_api_url;
  const [ratioData, setRatioData] = useState({});
  const [company, setCompany] = useState('');
  const [ratios, setRatios] = useState([]);

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
  const params = useParams();
  useEffect(() => {
    const [companySymbol, exchange] = params.symbol.split('.') || [];
    setCompany(companySymbol);
    const fetchData = async () => {
      const ratio = await axios.get(`${baseUrl}/ratio?symbol=${params.symbol}`);
      const ratioData = ratio.data.data;
      setRatioData(ratioData);
      setRatios(Object.keys(ratioData));
    };

    fetchData();
  }, []);

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
  // ]

  return (
    <div className='w-full px-6 py-10'>
      <p className='mb-4 text-2xl font-bold'>{company}</p>
      {/* <div className="flex gap-4"> */}
      {/*  <Chart data={chartData} /> */}
      <div className='flex flex-wrap gap-2'>
        {ratios.map((ratio, index) => {
          const years = Object.keys(ratioData[ratio]);
          return (
            <div key={index} className='bg-gray-200 p-4 rounded w-full'>
              <p className='font-bold pb-4 text-center'>{ratio}</p>
              <div className='flex justify-evenly text-center gap-2'>
                {years.map((year, index) => {
                  return (
                    <div key={index}>
                      <p className='mb-4'>{new Date(year).getFullYear()}</p>
                      <p>{ratioData[ratio][year]}</p>
                    </div>
                  );
                })}
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
