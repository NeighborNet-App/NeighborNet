import MainNavbar from "@/components/MainNavbar";
import { auth, firestore } from "@/firebase";
import User from "@/types/User";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import { SSRProvider } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";

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

  const userDocRef = firestore
    .collection("users")
    .doc(auth.currentUser?.uid);


  // const test = userDocRef
  //     .get()
  //     .then((userDoc) => {
  //       const userData = userDoc.data() as User;
  //       setUserData(userData);
  //     })
  //     .catch((error) => {
  //       console.error("Error getting document:", error);
  //     });
  

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
