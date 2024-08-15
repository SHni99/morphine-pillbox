//import "./mockLocation";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from 'react-native-calendars';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const GpsScreen = () => {

  const navigation = useNavigation();
  const navigateToSettings = () => {
    navigation.navigate('settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="ios-medical" size={28} color="red" />
        <Text style={styles.headerTitle}>Medimate</Text>
        <TouchableOpacity onPress={navigateToSettings}>
          <Ionicons name="ios-settings" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Morning</Text>
        {/* Placeholder for time slots */}
        <View style={styles.timeSlot}><Text>09:41</Text></View>
        <View style={styles.timeSlot}><Text>09:41</Text></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lunch</Text>
        {/* Placeholder for time slots */}
        <View style={styles.timeSlot}><Text>09:41</Text></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dinner</Text>
        {/* Placeholder for time slots */}
        <View style={styles.timeSlot}><Text>09:41</Text></View>
      </View>

      <Calendar
        // The style and marked dates props can be used to customize the calendar
        style={styles.calendar}
        // Example of marking a specific date
        markedDates={{
          '2024-07-04': {selected: true, marked: true, selectedColor: 'blue'},
        }}
      />

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeSlot: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    marginBottom: 20,
  }
});

export default GpsScreen;
