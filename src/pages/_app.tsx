import type { AppProps } from "next/app";
import { Analytics } from '@vercel/analytics/react';
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SSRProvider } from "react-bootstrap";
import MainNavbar from "@/components/MainNavbar";

const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <>
            <MainNavbar></MainNavbar>
            <Component {...pageProps} />
            <Analytics />
          </>
        </NextUIProvider>
      </NextThemesProvider>
    </SSRProvider>
  );
}
