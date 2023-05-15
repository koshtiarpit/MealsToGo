import { Lato_400Regular, useFonts as useLato } from "@expo-google-fonts/lato";
import {
  Oswald_400Regular,
  useFonts as useOswald,
} from "@expo-google-fonts/oswald";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Navigation } from "./src/infrastructure/navigation";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { initializeApp } from "firebase/app";
import { theme } from "./src/infrastructure/theme";

const firebaseConfig = {
  apiKey: "AIzaSyDAR03RODjpmIEnI9zAE6u_sgWxOxJDfuE",
  authDomain: "mealstogo-a9ffb.firebaseapp.com",
  projectId: "mealstogo-a9ffb",
  storageBucket: "mealstogo-a9ffb.appspot.com",
  messagingSenderId: "837869120444",
  appId: "1:837869120444:web:8e0622c692ed1f714b99b9",
};
initializeApp(firebaseConfig);

export default function App() {
  let [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  let [latoLoaded] = useLato({
    Lato_400Regular,
  });
  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
