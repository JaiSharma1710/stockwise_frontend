import axios from "axios";

import { env_variables } from "@/config";

import Ratios from "@/components/server/ratios";
import RenderChart from "@/helpers/chartHelper";

const Detail = async ({ params }) => {
  const [companySymbol, exchange] = params.symbol.split(".") || [];
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

  const chartError = intradayResponse.status !== "fulfilled";
  const chartData = intradayResponse.value?.data?.data;

  const ratioError = ratiosResponse.status !== "fulfilled";
  const ratioData = ratiosResponse.value?.data?.data;

  const companyError = companyResponse.status !== "fulfilled";
  const companyData = companyResponse.value;

  return (
    <div className="w-full px-6 py-10">
      <p className="mb-4 text-2xl font-bold">{companySymbol}</p>
      <div className="space-y-6">
        <RenderChart chartData={chartData} chartError={chartError} />
        <Ratios />
      </div>
    </div>
  );
};

export default Detail;
