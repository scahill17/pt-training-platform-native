import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addAthlete } from "../api/api";
import styles from "../styles/SignUpScreen.style";

export default function SignUpScreen() {
  // State management for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [fitness_goals, setFitnessGoals] = useState("");
  const [medical_conditions, setMedicalConditions] = useState("");

  const navigation = useNavigation();

  // Handle Sign-Up logic
  const handleSignUp = async () => {
    if (password !== confirm_password) {
      Alert.alert("Error", "Passwords don't match");
      return;
    }

    const userData = {
      name,
      email,
      age,
      fitness_goals,
      medical_conditions,
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
        {renderInputField("Confirm Password", confirm_password, setConfirmPassword, {
          secureTextEntry: true,
        })}
        {renderInputField("Age", age, setAge)}
        {renderInputField("Fitness Goals", fitness_goals, setFitnessGoals)}
        {renderInputField("Medical Conditions", medical_conditions, setMedicalConditions)}

        {/* Sign-Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
