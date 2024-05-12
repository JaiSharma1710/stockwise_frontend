import CustomChart from "@/components/client/chart";

const updateChartData = (chartData) => {
  if (!chartData || !Array.isArray(chartData.grapthData)) {
    return;
  }
  const presentTime = [];
  const priceChartData = chartData.grapthData
    .map((ele) => {
      const date = new Date(ele?.[0]);
      const minute = date.getUTCMinutes();
      const hour = date.getUTCHours();
      if (presentTime.includes(`${hour}:${minute}`)) {
        return false;
      } else {
        presentTime.push(`${hour}:${minute}`);
      }
      return {
        secondary: ele?.[1],
        primary: new Date(ele?.[0]),
      };
    })
    .filter(Boolean);

  return [
    {
      label: chartData.name,
      data: priceChartData,
    },
  ];
};

const RenderChart = ({ chartData, chartError }) => {
  if (chartError || !chartData) {
    return <CustomChart data={undefined} error={true} />;
  }

  return <CustomChart data={updateChartData(chartData)} error={false} />;
};

export default RenderChart;
