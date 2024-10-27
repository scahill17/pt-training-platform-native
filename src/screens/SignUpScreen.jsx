import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addAthlete } from "../api/api";
import styles from "../styles/SignUpScreen.style";

/**
 * SignUpScreen component for registering a new user.
 * Collects user data, validates input, and submits to the database.
 * @returns {JSX.Element} - Rendered SignUpScreen component.
 */
function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [fitness_goals, setFitnessGoals] = useState("");
  const [medical_conditions, setMedicalConditions] = useState("");
  const navigation = useNavigation();

  /**
   * Validates the form data, ensuring passwords match and submits registration.
   */
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
      await addAthlete(userData);
      Alert.alert("Success", "Sign-up successful. Please log in.");
      navigation.goBack();
    } catch (error) {
      console.error("Sign-up failed. Error details:", error);
      Alert.alert("Error", "Sign-up failed. Please try again.");
    }
  };

  /**
   * Renders a text input field for the sign-up form.
   * @param {string} placeholder - Label for the input field.
   * @param {string} value - Current value of the input field.
   * @param {Function} onChangeText - Function to handle text changes.
   * @returns {JSX.Element} - Rendered text input field.
   */
  const renderInputField = (placeholder, value, onChangeText) => (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
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
        {renderInputField("Email", email, setEmail, { keyboardType: "email-address", autoCapitalize: "none" })}
        {renderInputField("Password", password, setPassword, { secureTextEntry: true })}
        {renderInputField("Confirm Password", confirm_password, setConfirmPassword, { secureTextEntry: true })}
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

export default SignUpScreen;