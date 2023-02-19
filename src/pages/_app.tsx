import MainNavbar from "@/components/MainNavbar";
import { auth, firestore } from "@/firebase";
import User from "@/types/User";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import { SSRProvider } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
});

type UserContextType = User | null;
export const UserContext = createContext<UserContextType>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<UserContextType>(null);

  const userDocRef = firestore.collection("users").doc(user?.uid);

  useEffect(() => {
    console.log("test")
    userDocRef.get().then((doc) => {
      if (doc.exists) {
        setUserData(doc.data() as User); // set state variable to the loaded document's data
      } else {
        console.log("No such document!");
      }
    });
  });

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
            <UserContext.Provider value={userData}>
              <MainNavbar></MainNavbar>
              <Component {...pageProps} />
              <Analytics />
            </UserContext.Provider>
          </>
        </NextUIProvider>
      </NextThemesProvider>
    </SSRProvider>
  );
}
