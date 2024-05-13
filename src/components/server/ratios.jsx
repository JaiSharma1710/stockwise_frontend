import React from "react";

const Ratios = ({ ratioData, ratioError }) => {
  try {
    if (ratioError) {
      throw new Error("error fetching ratio");
    }

    const ratios = Object.keys(ratioData);
    const data = {};

    ratios.forEach((ratio) => {
      const value = ratioData[ratio];
      Object.keys(value).forEach((year) => {
        const ratioYear = new Date(year).getFullYear();
        if (data[ratioYear]) {
          data[ratioYear].push(value[year]);
        } else {
          data[ratioYear] = [value[year]];
        }
      });
    });

    return (
      <div className="flex justify-between rounded-md overflow-hidden">
        <div
          id="ratios"
          className="bg-gray-50 w-1/4 flex flex-col text-sm lg:text-base divide-y-2"
        >
          <p className="font-bold border-black border-b-2 p-2 lg:p-4">Ratio</p>
          {ratios.map((ratio, index) => (
            <p
              className="w-full p-2 lg:p-4 text-xs lg:text-base whitespace-nowrap truncate"
              key={index}
            >
              {ratio}
            </p>
          ))}
        </div>

        {Object.keys(data)
          .reverse()
          .map((year, index) => {
            const dataForYear = data[year];
            return (
              <div
                id={year}
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                } w-1/4 flex-col text-sm lg:text-base divide-y-2 text-center ${
                  index === 3 ? "hidden lg:flex" : "flex"
                }`}
              >
                <p className="font-bold border-black border-b-2 p-2 lg:p-4">
                  {year}
                </p>
                {dataForYear.map((ratio, index) => (
                  <p
                    className="w-full text-xs lg:text-base p-2 lg:p-4"
                    key={index}
                  >
                    {ratio || "-"}
                  </p>
                ))}
              </div>
            );
          })}
      </div>
    );
  } catch (error) {
    console.log(error.message);
    return (
      <div className="w-full bg-red-100 text-red-700 font-bold text-center py-4 rounded-md">
        error fetching ratio data
      </div>
    );
  }
};

export default Ratios;
