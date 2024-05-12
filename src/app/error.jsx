"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-[calc(100vh-5.5rem)] md:h-[calc(100vh-4rem)] bg-gray-100 flex flex-col justify-center items-center space-y-4">
      <h1 className="text-xl font-bold">
        Something went wrong! 500 server error
      </h1>
      <Link className="bg-black py-2 px-4 rounded-md text-white" href="/">Go To Home</Link>
    </div>
  );
}
