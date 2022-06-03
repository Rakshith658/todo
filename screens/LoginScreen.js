import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import { Input, Image } from "react-native-elements";
import { KeyboardAvoidingView, Button } from "react-native";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloding, setisloding] = useState(true);
  const [disabled, setdisabled] = useState(false);
  useEffect(() => {
    setisloding(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      } else {
        setisloding(false);
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    if (email && password) {
      setdisabled(true);
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.replace("Home");
          setdisabled(false);
        })
        .catch((error) => {
          alert(error);
          setdisabled(false);
        });
    } else {
      Alert.alert("Invail Credentails", "Enter both e-mail and password");
    }
  };
  if (isloding) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2C6BED" />
        <Text style={{ marginTop: 20 }}>Loading....</Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView button="padding" style={styles.container}>
      <StatusBar backgroundColor="#00cca3" />
      <Image
        source={require("../assets/icon.jpeg")}
        style={{ width: 200, height: 200, marginBottom: 10 }}
      />
      <View style={styles.inputcontainer}>
        <Input
          placeholder="Email"
          autoFocus={true}
          type="email"
          value={email}
          onChangeText={(text) => setemail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => setpassword(password)}
          onSubmitEditing={signIn}
        />
        <Text style={{ color: "gray", fontSize: 12, top: -21, right: -12 }}>
          {password && password.length < 6
            ? "password minmum 6 charactor"
            : null}
        </Text>
      </View>
      <View style={styles.button}>
        <Button
          containerStyle={styles.button}
          onPress={signIn}
          title="Login"
          color="#00cca3"
          disabled={disabled}
        />
      </View>
      <View style={styles.button}>
        <Button
          onPress={() => navigation.navigate("Register")}
          containerStyle={styles.button}
          title="Register"
          color="#00cca3"
          disabled={disabled}
        />
      </View>

      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
  },
  inputcontainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
