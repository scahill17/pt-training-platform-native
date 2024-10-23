import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchUserProfile, updateUserProfile, updateAthleteProfile } from "../api/api";
import styles from "../styles/ProfileScreen.Style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
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

  // Fetch logged-in user's profile data on component mount
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId"); // Get the stored userId
        if (storedUserId) {
          setUserId(storedUserId); // Set the userId state
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

    loadUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      // Update the user table (name, email)
      await updateUserProfile(userId, {
        name: profileData.name,
        email: profileData.email,
      });

      // Update the athlete table (age, fitness goals, medical conditions)
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

        {/* Name Field */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={profileData.name}
          onChangeText={(text) => setProfileData({ ...profileData, name: text })}
        />

        {/* Email Field */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={profileData.email}
          onChangeText={(text) => setProfileData({ ...profileData, email: text })}
        />

        {/* Age Field */}
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={profileData.age}
          onChangeText={(text) => setProfileData({ ...profileData, age: text })}
        />

        {/* Fitness Goals Field */}
        <Text style={styles.label}>Fitness Goals</Text>
        <TextInput
          style={styles.input}
          placeholder="Fitness Goals"
          value={profileData.fitness_goals}
          onChangeText={(text) => setProfileData({ ...profileData, fitness_goals: text })}
        />

        {/* Medical Conditions Field */}
        <Text style={styles.label}>Medical Conditions</Text>
        <TextInput
          style={styles.input}
          placeholder="Medical Conditions"
          value={profileData.medical_conditions}
          onChangeText={(text) => setProfileData({ ...profileData, medical_conditions: text })}
        />

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