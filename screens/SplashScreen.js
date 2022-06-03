import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
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
