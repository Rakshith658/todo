import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { auth } from "../firebase";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Image
        source={require("../assets/icon.jpeg")}
        style={{ width: 200, height: 200, marginBottom: 10 }}
      />
      <ActivityIndicator />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
