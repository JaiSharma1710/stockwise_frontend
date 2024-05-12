"use client";

import Header from "@/components/server/header";
import { NextUIProvider } from "@nextui-org/react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";

export function Providers({ children }) {
  return (
    <ErrorBoundary fallback={<Error />}>
      <NextUIProvider>
        <main>
          <Header />
          {children}
        </main>
      </NextUIProvider>
    </ErrorBoundary>
  );
}
