import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { db, auth } from "../firebase";
import * as firebase from "firebase";

const CreateModal = ({ visible, closeVisibility }) => {
  const [task, settask] = useState("");
  const [disabled, setDisabled] = useState(false);

  const create = async (task) => {
    if (task) {
      setDisabled(true);
      await db
        .collection(auth.currentUser.email)
        .add({
          task: task,
          timestamp: new Date().toISOString(),
          isDone: false,
        })
        .then(() => {
          closeVisibility(), setDisabled(false);
          settask("");
        })
        .catch((error) => {
          Alert.alert(error), setDisabled(false);
          settask("");
        });
    } else {
      closeVisibility();
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        style={{
          backgroundColor: "green",
        }}
        onRequestClose={closeVisibility}
      >
        <View style={styles.modal}>
          <Text style={styles.title}>Create</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter task"
            value={task}
            onChangeText={(e) => settask(e)}
            placeholderTextColor="gray"
          />

          <TouchableOpacity
            style={styles.buttonCantainer}
            disabled={disabled}
            onPress={() => create(task)}
          >
            <Text style={styles.title}>
              {disabled ? "add task...." : "Done"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={closeVisibility}>
          <View style={styles.modelbg} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default CreateModal;

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    elevation: 1,
    width: "90%",
    borderRadius: 25,
    zIndex: 1000,
    backgroundColor: "#ffffff",
    alignSelf: "center",
    marginTop: "50%",
    padding: 20,
  },

  title: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 29,
    color: "#00cca3",
    alignSelf: "center",
    marginVertical: 10,
  },
  buttonCantainer: {
    bottom: 0,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#00cca3",
    borderRadius: 15,
  },
  textInput: {
    paddingVertical: 15,
    fontSize: 20,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: "#00cca3",
    borderRadius: 15,
    padding: 15,
  },
  modelbg: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
});
