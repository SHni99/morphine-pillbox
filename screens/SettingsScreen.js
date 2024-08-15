import { AntDesign, Feather } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../firebase/firebase";
const { width } = Dimensions.get("screen");

const Settings = ({ navigation }) => {

  // const cfmNameChange = (newName) => {
  //   const sendDB = () => {
  //     setDoc(doc(db, "users", user.uid), {
  //       fName: newFirstName,
  //       lName: newLastName,
  //     }).catch((e) => console.log(e));
  //   };
  //   Alert.alert("Confirm", "Are you sure you want to change your name?", [
  //     { text: "No" },
  //     { text: "Yes", onPress: () => sendDB() },
  //   ]);
  // };

  // useEffect(() => {
  //   const fetchUserData = () => {
  //     const usersDocRef = doc(db, "users", getAuth().currentUser.uid);
  //     onSnapshot(usersDocRef, (doc) => {
  //       setFirstName(doc.data().fName);
  //       setLastName(doc.data().lName);
  //       setEmail(doc.data().email);
  //       setPhoneNum(doc.data().phoneNum);
  //     });
  //   };
  //   fetchUserData();
  // }, []);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="ios-medical" size={28} color="red" />
          <Text style={styles.headerTitle}>Medimate</Text>
          <Ionicons name="ios-settings" size={28} color="black" />
        </View>
        <View style={styles.menuItem}>
          <FontAwesome5 name="cogs" size={20} color="gray" />
          <Text style={styles.menuText}> General</Text>
        </View>
        <View style={styles.menuItem}>
          <FontAwesome5 name="key" size={20} color="gray" />
          <Text style={styles.menuText}> Password</Text>
        </View>
        <View style={styles.menuItem}>
          <FontAwesome5 name="bell" size={20} color="gray" />
          <Text style={styles.menuText}> Notification</Text>
        </View>
        <View style={styles.menuItem}>
          <FontAwesome5 name="question-circle" size={20} color="gray" />
          <Text style={styles.menuText}> FAQ</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={20} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbfbfa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#000'
  },
  menuItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  menuText: {
    fontSize: 16,
    color: 'black',
  },
  logoutButton: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#ec407a',
    marginHorizontal: 20,
    marginTop: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  }
});

export default Settings;