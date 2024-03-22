import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css";
import { AuthContext, AuthContextProvider } from "../Context/authContext";
import { useAuth } from "../Context/authContext";
import { useRoute } from "@react-navigation/native";
import { MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    //check if user is authnticated or not

    //loading state, index.js
    if (typeof isAuthenticated == "undefined") return;

    //check user is in app group or not
    const inApp = segments[0] == "(app)";

    if (isAuthenticated && !inApp) {
      //redirect to Home
      router.replace("home");
    } else if (isAuthenticated == false) {
      // redirect to sign in
      router.replace("signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}
