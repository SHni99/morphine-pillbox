import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";

const IntroScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

  useEffect(() => {
    // Start the fade-in animation
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true
      }
    ).start();

    // Set a timer to navigate after the fade-in animation
    const timer = setTimeout(() => {
      navigation.navigate('login'); 
    }, 5000); 

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
    <Image
      source={require('../assets/medimate.png')}
      style={styles.logo}
        />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 18,
    color: '#666'
  },
  logo: {
    width: 120, 
    height: 120, 
    resizeMode: 'contain',
    marginBottom: 20, 
  },
});

export default IntroScreen;
