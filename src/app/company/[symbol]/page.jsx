import axios from 'axios';

import { env_variables } from '@/config';

import Ratios from '@/components/server/ratios';
import RenderChart, { updateChartData } from '@/helpers/chartHelper';
import CustomChart from '@/components/client/chart';
import CompanyInfo from '@/components/server/companyInfo';

const Detail = async ({ params }) => {
  const [companySymbol, exchange] = params.symbol.split('.') || [];
  const baseUrl = env_variables.base_api_url;

  const intraDayPromise = axios.get(
    `${baseUrl}/quote/intraday?symbol=${companySymbol}`
  );

  const companyDataPromise = axios.get(
    `${baseUrl}/quote/current?symbol=${companySymbol}`
  );

  const companyRatiosPromise = axios.get(
    `${baseUrl}/ratio?symbol=${params.symbol}`
  );

  const [intradayResponse, ratiosResponse, companyResponse] =
    await Promise.allSettled([
      intraDayPromise,
      companyRatiosPromise,
      companyDataPromise,
    ]);

  const chartError = intradayResponse.status !== 'fulfilled';
  const chartData = intradayResponse.value?.data?.data;

  const ratioError = ratiosResponse.status !== 'fulfilled';
  const ratioData = ratiosResponse.value?.data?.data;

  const companyError = companyResponse.status !== 'fulfilled';
  const companyData = companyResponse.value?.data?.data;

  let isIncrease;

  if (!companyError) {
    isIncrease = companyData.change > 0;
  }

  let performer = '';

  if (ratioData.Growth) {
    if (ratioData.Growth > 0) {
      performer = 'Consider';
    } else {
      performer = 'Reject';
    }
  }

  return (
    <div className='w-full p-3 lg:px-6 lg:py-10'>
      <div className='space-y-6'>
        <CompanyInfo data={companyData} error={companyError} />
        <CustomChart
          isIncrease={isIncrease}
          data={updateChartData(chartData)}
          error={chartError}
        />
        <Ratios ratioData={ratioData.companyData} ratioError={ratioError} />
        <div className='flex justify-center items-center gap-4'>
          <h1 className='font-bold text-2xl'>Growth:</h1>
          <p className='font-bold text-2xl'>
            {ratioData.Growth ? `${ratioData.Growth.toFixed(2)}%` : 'NA'}
          </p>
        </div>
        <div className='flex justify-center items-center gap-4'>
          <h1 className='font-bold text-2xl'>Recommendation:</h1>
          <p className='font-bold text-2xl'>{performer}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
