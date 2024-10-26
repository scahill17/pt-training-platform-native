import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/HomeScreen.style';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo and Welcome Section */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>Welcome to Your Training Hub</Text>
      <Text style={styles.subText}>Stay on top of your progress and reach your fitness goals!</Text>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Training')}
        >
          <Text style={styles.buttonText}>Training</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Analytics')}
        >
          <Text style={styles.buttonText}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Motivational Quote */}
      <Text style={styles.motivationalQuote}>
        "The only bad workout is the one you didn't do. Keep pushing forward!"
      </Text>
    </ScrollView>
  );
};

export default HomeScreen;