import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Button
} from "react-native";
import { db, db2 } from "../firebase/firebase";

const MedicationItem = ({ iconColor, medicationName, dosage }) => {
  // Determine icon based on the color/type
  const getIconName = (color) => {
    switch(color) {
      case 'red':
        return 'triangle'; // Update to actual icon name if using Ionicons
      case 'yellow':
        return 'ellipse'; // Update to actual icon name if using Ionicons
      case 'green':
        return 'star'; // This one should be available
      default:
        return 'alert-circle'; // Default icon
    }
  };

  return (
    <View style={styles.medicationItem}>
      <Ionicons name={getIconName(iconColor)} size={30} color={iconColor} />
      <View style={styles.medInfo}>
        <Text style={styles.medName}>{medicationName}</Text>
        <Text>{dosage}</Text>
      </View>
      <Ionicons name="checkmark-circle" size={30} color="green" />
    </View>
  );
};

const HomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="ios-medical" size={28} color="red" />
        <Text style={styles.title}>Medimate</Text>
        <Ionicons name="ios-settings" size={28} color="black" />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Morning</Text>
          <MedicationItem
            iconColor="red"
            medicationName="Furosemide"
            dosage="1 Tablet"
          />
          <MedicationItem
            iconColor="yellow"
            medicationName="Acebutolol"
            dosage="2 Tablets"
          />
          <MedicationItem
            iconColor="green"
            medicationName="Captopril"
            dosage="1 Tablet"
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>After lunch</Text>
          <MedicationItem
            iconColor="green"
            medicationName="Captopril"
            dosage="1 Tablet"
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>After Dinner</Text>
          <MedicationItem
            iconColor="yellow"
            medicationName="Acebutolol"
            dosage="2 Tablets"
          />
          <MedicationItem
            iconColor="red"
            medicationName="Furosemide"
            dosage="1 Tablet"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  // return (
  //   <ImageBackground
  //     source={require("../assets/background.png")}
  //     resizeMode="cover"
  //     style={{ width: "100%", height: "100%" }}
  //   >
  //     <SafeAreaView
  //       style={
  //         isPanic || isFall
  //           ? { backgroundColor: "#ffa45c", flex: 1 }
  //           : { flex: 1 }
  //       }
  //     >
  //       <KeyboardAvoidingView style={styles.container}>
  //         <View style={styles.welcomecontainer}>
  //           <View style={styles.welcomecontainerContent}>
  //             <View
  //               style={{
  //                 display: "flex",
  //                 flexDirection: "column",
  //                 marginTop: 20,
  //                 justifyContent: "center",
  //                 flex: 1,
  //                 alignItems: "center",
  //               }}
  //             >
  //               <Image
  //                 source={
  //                   !isPanic && !isFall
  //                     ? require("../assets/logo-white.png")
  //                     : require("../assets/logo.png")
  //                 }
  //                 style={!isPanic && !isFall ? styles.whiteLogo : styles.logo}
  //               />
  //               <Text style={[styles.welcometext]}>{getWelcomeText()}</Text>
  //               <View
  //                 style={[
  //                   styles.batteryPercentContainer,
  //                   MPUMsg === "on"
  //                     ? styles.batteryPercentContainerOn
  //                     : styles.batteryPercentContainerOff,
  //                 ]}
  //               >
  //                 <Text style={styles.batteryPercent}>
  //                   Device Status: {MPUMsg.toLocaleUpperCase()}{" "}
  //                 </Text>
  //               </View>
  //             </View>

  //             <TouchableOpacity
  //               style={styles.settingBtn}
  //               onPress={() => navigation.openDrawer()}
  //             >
  //               <Feather name="menu" size={24} color="grey" />
  //             </TouchableOpacity>
  //           </View>
  //         </View>

  //         <View style={styles.mainContainer}>
  //           <View style={[styles.weatherContainer, styles.shadowProp]}>
  //             <View style={styles.weatherTextContainer}>
  //               <View style={styles.mainWeather}>
  //                 <Text
  //                   style={{
  //                     fontSize: "45",
  //                     fontWeight: "bold",
  //                     letterSpacing: -2,
  //                     color: "#43356B",
  //                   }}
  //                 >
  //                   {Math.round(forecast.main.temp)}˚C
  //                 </Text>
  //               </View>
  //               <View style={styles.miscWeatherText}>
  //                 <Text
  //                   style={{
  //                     fontSize: "20",
  //                     fontWeight: "bold",
  //                   }}
  //                 >
  //                   {current.main}
  //                 </Text>
  //                 <Text>
  //                   Feels like {Math.round(forecast.main.feels_like)}˚C
  //                 </Text>
  //               </View>
  //             </View>
  //             <View style={styles.weatherIcon}>
  //               <Image
  //                 style={styles.largeIcon}
  //                 source={{
  //                   uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
  //                 }}
  //               />
  //             </View>
  //           </View>
  //           <View
  //             style={{
  //               display: "flex",
  //               flexDirection: "row",
  //               justifyContent: "space-between",
  //               flex: 1,
  //               padding: 20,
  //             }}
  //           >
  //             <View style={[styles.emergencyContainer, { marginRight: 10 }]}>
  //               <Image
  //                 source={
  //                   isPanic
  //                     ? require("../assets/panic-red.png")
  //                     : require("../assets/panic-green.png")
  //                 }
  //                 style={styles.emergencyIcon}
  //               />
  //               <Text style={styles.btnHeader}>Panic</Text>
  //               <Text
  //                 style={[
  //                   styles.activityIndicator,
  //                   isPanic ? styles.activated : styles.notActivated,
  //                 ]}
  //               >
  //                 {isPanic ? "ACTIVATED" : "NOT ACTIVATED"}
  //               </Text>
  //               <Text style={{ textAlign: "center", fontStyle: "italic" }}>
  //                 Last activated:{"\n"}
  //                 {lastPanicDate ? lastPanicDate : "No last date recorded"}
  //               </Text>
  //             </View>
  //             <View style={[styles.emergencyContainer, { marginLeft: 10 }]}>
  //               <Image
  //                 source={
  //                   isFall
  //                     ? require("../assets/fall-red.png")
  //                     : require("../assets/fall-green.png")
  //                 }
  //                 style={styles.emergencyIcon}
  //               />
  //               <Text style={styles.btnHeader}>Fall</Text>
  //               <Text
  //                 style={[
  //                   styles.activityIndicator,
  //                   isFall ? styles.activated : styles.notActivated,
  //                 ]}
  //               >
  //                 {isFall ? "USER HAS FALLEN" : "NO FALL"}
  //               </Text>
  //               <Text style={{ textAlign: "center", fontStyle: "italic" }}>
  //                 Last fall:{"\n"}
  //                 {lastFallDate ? lastFallDate : "No last date recorded"}
  //               </Text>
  //             </View>
  //           </View>
  //         </View>
  //       </KeyboardAvoidingView>
  //     </SafeAreaView>
  //   </ImageBackground>
  // );
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
  title: {
    fontSize: 24,
    color: '#000'
  },
  scrollView: {
    marginHorizontal: 10,
  },
  section: {
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 10,
    borderRadius: 10
  },
  sectionTitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  medInfo: {
    flex: 1,
    paddingHorizontal: 10
  },
  medName: {
    fontSize: 18,
    color: '#000'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc'
  }
});

export default HomeScreen;
