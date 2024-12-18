import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchUserProfile, updateUserProfile, updateAthleteProfile } from "../api/api";
import styles from "../styles/ProfileScreen.Style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

/**
 * ProfileScreen component for displaying and updating user's profile information.
 * @returns {JSX.Element} - Rendered ProfileScreen component.
 */
function ProfileScreen() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    age: "",
    fitness_goals: "",
    medical_conditions: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  /**
   * Loads user profile data from AsyncStorage and API.
   */
  const loadUserProfile = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
        const data = await fetchUserProfile(storedUserId);
        if (data) {
          setProfileData({
            name: data[0].name,
            email: data[0].email,
            age: data[0].age ? String(data[0].age) : "", // Convert age to string for TextInput
            fitness_goals: data[0].fitness_goals || "",
            medical_conditions: data[0].medical_conditions || "",
          });
        } else {
          throw new Error("User profile data could not be retrieved");
        }
      } else {
        Alert.alert("Error", "User ID not found, please sign in again.");
        navigation.replace("Signin");
      }
    } catch (error) {
      console.error("Failed to load user profile:", error);
      Alert.alert("Error", "Failed to load profile. Please try again.");
      navigation.replace("Signin");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Updates user profile data in the database.
   */
  const handleUpdateProfile = async () => {
    try {
      // Update the user and athlete table
      await updateUserProfile(userId, { name: profileData.name, email: profileData.email });
      await updateAthleteProfile(userId, {
        age: profileData.age,
        fitness_goals: profileData.fitness_goals,
        medical_conditions: profileData.medical_conditions,
      });
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("UserId"); // Clear logged-in user data
      navigation.replace("Signin"); // Navigate back to the SignIn screen
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  /**
   * Renders a text input field for the profile form.
   * @param {string} label - Label for the input field.
   * @param {string} value - Current value of the input field.
   * @param {Function} onChange - Function to handle text changes.
   * @returns {JSX.Element} - Rendered text input field.
   */
  const renderTextInput = (label, value, onChange) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </View>
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {/* Logout Icon at the Top */}
        <TouchableOpacity style={styles.logoutIconTop} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color="#F2AE30" />
        </TouchableOpacity>

        <Text style={styles.title}>Profile</Text>

        {renderTextInput("Name", profileData.name, (text) => setProfileData({ ...profileData, name: text }))}
        {renderTextInput("Email", profileData.email, (text) => setProfileData({ ...profileData, email: text }))}
        {renderTextInput("Age", profileData.age, (text) => setProfileData({ ...profileData, age: text }))}
        {renderTextInput("Fitness Goals", profileData.fitness_goals, (text) => setProfileData({ ...profileData, fitness_goals: text }))}
        {renderTextInput("Medical Conditions", profileData.medical_conditions, (text) => setProfileData({ ...profileData, medical_conditions: text }))}

        {/* Update Profile Button */}
        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>

        {/* Logout Button at the Bottom */}
        <TouchableOpacity style={styles.logoutButtonBottom} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color="#F2AE30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;