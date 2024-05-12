"use client";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { usePathname } from "next/navigation";

import Header from "@/components/server/header";
import { NextUIProvider } from "@nextui-org/react";
import Error from "./error";

export function Providers({ children }) {
  const pathname = usePathname();
  return (
    <ErrorBoundary fallback={<Error />}>
      <NextUIProvider>
        <main>
          <Header isHomePage={pathname === "/"} />
          {children}
        </main>
      </NextUIProvider>
    </ErrorBoundary>
  );
}
