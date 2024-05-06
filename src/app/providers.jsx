"use client";

import Header from "@/components/server/header";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <main>
        <Header />
        {children}
      </main>
    </NextUIProvider>
  );
}
