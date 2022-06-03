import React, { useState, useLayoutEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Input, Image } from "react-native-elements";
import { KeyboardAvoidingView, Button, StatusBar } from "react-native";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [disabled, setdisabled] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "back to login",
    });
  }, [navigation]);

  const Register = () => {
    if (email && password && name) {
      setdisabled(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          authUser.user.updateProfile({
            displayName: name,
          });
        })
        .then(() => {
          navigation.goBack();
          setdisabled(false);
        })
        .catch((error) => {
          console.log(error);
          setdisabled(false);
        });
    } else {
      Alert.alert("Invail Credentails", "Enter name ,e-mail , password");
    }
  };

  return (
    <KeyboardAvoidingView button="padding" style={styles.container}>
      <StatusBar backgroundColor="#00cca3" />
      <Image
        source={require("../assets/icon.jpeg")}
        style={{ width: 200, height: 200, marginBottom: 10 }}
      />
      <Text style={{ marginBottom: 25, fontSize: 25 }}>Create Account</Text>
      <View style={styles.inputcontainer}>
        <Input
          placeholder="Full Name"
          autoFocus={true}
          type="text"
          value={name}
          onChangeText={(text) => setname(text)}
        />
        <Input
          placeholder="Email"
          // autoFocus={true}
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
        />
        <Text style={{ color: "gray", fontSize: 12, top: -21, right: -12 }}>
          {password && password.length < 6
            ? "password minmum 6 charactor"
            : null}
        </Text>
      </View>
      <View style={styles.button}>
        <Button
          onPress={Register}
          title="Register"
          color="#00cca3"
          disabled={disabled}
        />
      </View>
      <View style={styles.button}>
        <Button
          onPress={() => navigation.navigate("Login")}
          title="Login"
          color="#00cca3"
          disabled={disabled}
        />
      </View>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignContent:'center',
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
