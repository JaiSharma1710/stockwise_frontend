import SearchInput from "@/components/client/searchInput";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[calc(100vh-5.5rem)] md:h-[calc(100vh-4rem)] bg-gray-100 flex justify-center space-y-16 flex-col py-10 px-2 md:flex-row md:items-center md:justify-between md:px-8">
      <div>
        <h1 className="font-extrabold text-6xl mb-2 text-center md:text-left md:text-7xl">
          StockWise
        </h1>
        <p className="text-sm text-center md:text-left">
          Morden stock analyzer for morden age investors
        </p>
        <SearchInput/>
      </div>
      <Image
        src="/home.png"
        alt="homepage-carry-catcher"
        width={612}
        height={408}
        className=" md:w-[40rem] md:h-auto"
      />
    </div>
  );
}
