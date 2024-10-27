import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/HomeScreen.style';

/**
 * HomeScreen component displaying the main welcome screen with navigation options.
 * @returns {JSX.Element} - Rendered HomeScreen component.
 */
const HomeScreen = () => {
  const navigation = useNavigation();

  /**
   * Renders a navigation button with specified text and navigation target.
   * @param {string} text - Text to display on the button.
   * @param {string} targetScreen - Name of the screen to navigate to.
   * @returns {JSX.Element} - Rendered navigation button.
   */
  const renderNavButton = (text, targetScreen) => (
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => navigation.navigate(targetScreen)}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo and Welcome Section */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>Welcome to Progression</Text>
      <Text style={styles.subText}>
        Stay on top of your progress and reach your fitness goals with your own personal training hub!
      </Text>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {renderNavButton('Training', 'Training')}
        {renderNavButton('Analytics', 'Analytics')}
        {renderNavButton('Profile', 'Profile')}
      </View>

      <Text style={styles.quote}>
        "The only bad workout is the one you didn't do. Keep pushing forward!"
      </Text>
    </ScrollView>
  );
};

export default HomeScreen;