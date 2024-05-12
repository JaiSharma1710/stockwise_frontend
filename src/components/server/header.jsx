import Link from "next/link";
import React from "react";

import SearchInput from "../client/searchInput";

const Header = ({isHomePage}) => {
  return (
    <div className="border-b-2 h-16 flex justify-between items-center px-3 lg:px-8">
      <Link href="/" className="font-bold text-xl">
        StockWise
      </Link>
      {!isHomePage && <SearchInput className={"bg-white mx-2 w-48 rounded p-2 border md:mx-0 hover:cursor-text md:w-[35rem]"}/>}
      <div className="space-x-4 hidden lg:flex">
        <Link className="hover:bg-gray-200 hover:rounded-md p-2" href="/top-companies">Top Companies</Link>
        <Link className="hover:bg-gray-200 hover:rounded-md p-2" href="/sectors">Sectors</Link>
        <Link className="hover:bg-gray-200 hover:rounded-md p-2" href="market-overview">Market Overview</Link>
      </div>
    </div>
  );
};

export default Header;
