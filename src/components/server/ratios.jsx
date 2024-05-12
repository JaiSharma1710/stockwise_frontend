import React from 'react'

const Ratios = () => {
  return (
    <div>Ratios</div>
  )
}

export default Ratios

{/* <div className="flex flex-wrap gap-2">
          {ratios.map((ratio, index) => {
            const years = Object.keys(ratioData[ratio]);
            return (
              <div key={index} className="bg-gray-200 p-4 rounded w-full">
                <p className="font-bold pb-4 text-center">{ratio}</p>
                <div className="flex justify-evenly text-center gap-2">
                  {years.map((year, index) => {
                    return (
                      <div key={index}>
                        <p className="mb-4">{new Date(year).getFullYear()}</p>
                        <p>{ratioData[ratio][year]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div> */}