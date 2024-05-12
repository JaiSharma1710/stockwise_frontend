import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

const CompanyInfo = ({ data, error }) => {
  if (error || !data) {
    return (
      <div className="w-full bg-red-100 text-red-700 font-bold text-center py-4 rounded-md">
        error fetching company data
      </div>
    );
  }

  const {
    companyName,
    industry,
    percentageChange,
    change,
    lastPrice,
    lastUpdateTime,
  } = data;

  const isIncrease = change > 0;

  const Arrow = isIncrease ? (
    <FaArrowCircleUp className="text-green-600" />
  ) : (
    <FaArrowCircleDown className="text-red-600" />
  );

  return (
    <div>
      <h1 className="font-bold text-xl lg:text-4xl">{companyName}</h1>
      <p className="text-sm text-gray-400 mb-4">{industry}</p>
      <div className="flex items-center space-x-3">
        <h2 className="font-bold text-2xl">₹{lastPrice}</h2>
        <p
          className={`flex gap-2 items-center ${
            isIncrease ? "text-green-600" : "text-red-600"
          }`}
        >
          {Arrow} {change} ({percentageChange}%)
        </p>
      </div>
      <p className="text-xs text-gray-400">{lastUpdateTime}</p>
    </div>
  );
};

export default CompanyInfo;
