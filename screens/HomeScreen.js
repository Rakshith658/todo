import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import CreateModal from "../components/Createmodal";
import moment from "moment";
import { CheckBox } from "react-native-elements";

const HomeScreen = ({ navigation }) => {
  const [visible, setvisible] = useState(false);
  const [data, setdata] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Home",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="logout"
            iconName="logout"
            onPress={() =>
              Alert.alert("", "Are you sure you want to logout?", [
                {
                  text: "yes",
                  onPress: () =>
                    auth
                      .signOut()
                      .then(navigation.replace("Login"))
                      .catch((e) =>
                        Alert.alert("Waring", "Unable to logOut,Retry")
                      ),
                },
                { text: "No", onPress: () => console.log("No Pressed") },
              ])
            }
          />
        </HeaderButtons>
      ),
    });
  });
  useEffect(() => {
    db.collection(auth.currentUser.email)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setdata(snapshot.docs.map((d) => ({ id: d.id, data: d.data() })));
      });
  }, []);
  const deleteItem = (item) => {
    db.collection(auth.currentUser.email).doc(item.id).delete();
  };
  const upDateTask = (item) => {
    db.collection(auth.currentUser.email)
      .doc(item.id)
      .update({ isDone: !item.data.isDone })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <StatusBar backgroundColor="#00cca3" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <View style={{ justifyContent: "center" }}>
              <Text
                style={[
                  styles.task,
                  { color: item.data.isDone ? "gray" : "black" },
                ]}
                numberOfLines={1}
              >
                {item.data.task}
              </Text>
              <Text style={styles.time}>
                {moment(item.data.timestamp).fromNow(true) + " ago"}
              </Text>
            </View>
            <View>
              <CheckBox
                size={20}
                checked={item.data.isDone}
                onPress={() => upDateTask(item)}
                style={{ margin: 0, backgroundColor: "red" }}
                checkedColor="#00cca3"
              />
              <MaterialIcons
                name="delete-outline"
                size={20}
                color="red"
                style={{ alignSelf: "center" }}
                onPress={() => deleteItem(item)}
              />
            </View>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Entypo
          name="plus"
          size={24}
          color="#ffffff"
          onPress={() => setvisible(true)}
        />
      </View>
      <CreateModal
        visible={visible}
        closeVisibility={() => setvisible(false)}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  taskContainer: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 5,
    elevation: 1,
    borderRadius: 1,
  },
  task: {
    fontWeight: "800",
    fontSize: 18,
    lineHeight: 20,
    marginBottom: 5,
  },
  time: {
    color: "gray",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 35,
    right: 35,
    backgroundColor: "#00cca3",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
});
