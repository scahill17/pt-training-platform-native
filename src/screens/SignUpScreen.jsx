import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Navigation hook for React Native
import { addAthlete } from "../api/api"; // Ensure the correct path
import styles from "../styles/SignUpScreen.style"; // Import the correct styles

export default function SignUpScreen() {
  // State management for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [fitnessGoals, setFitnessGoals] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");

  const navigation = useNavigation();

  // Handle Sign-Up logic
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }

    const userData = {
      name,
      email,
      age,
      fitnessGoals,
      medicalConditions,
    };

    try {
      console.log("Attempting to sign up user with data:", userData);
      const response = await addAthlete(userData);
      console.log("Server response after signing up:", response);
      Alert.alert("Success", "Sign-up successful. Please log in.");
      navigation.navigate("Signin");
    } catch (error) {
      console.error("Sign-up failed. Error details:", error);
      Alert.alert("Error", "Sign-up failed. Please try again.");
    }
  };

  // Reusable input component to simplify the form structure
  const renderInputField = (placeholder, value, onChangeText, additionalProps = {}) => (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      {...additionalProps}
    />
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>

        {/* Title and Subtitle */}
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subTitle}>Setup your account below</Text>

        {/* Input Fields */}
        {renderInputField("Name", name, setName)}
        {renderInputField("Email", email, setEmail, {
          keyboardType: "email-address",
          autoCapitalize: "none",
        })}
        {renderInputField("Password", password, setPassword, { secureTextEntry: true })}
        {renderInputField("Confirm Password", confirmPassword, setConfirmPassword, {
          secureTextEntry: true,
        })}
        {renderInputField("Age", age, setAge)}
        {renderInputField("Fitness Goals", fitnessGoals, setFitnessGoals)}
        {renderInputField("Medical Conditions", medicalConditions, setMedicalConditions)}

        {/* Sign-Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
