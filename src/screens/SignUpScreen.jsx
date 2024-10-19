import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Navigation hook for React Native
import { addAthlete } from "../api/api"; // Ensure the correct path
import styles from "../styles/SignUpScreen.style"; // Import the correct styles

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [fitnessGoals, setFitnessGoals] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");

  const navigation = useNavigation();

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

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subTitle}>Setup your account below</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={(text) => setAge(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Fitness Goals"
          value={fitnessGoals}
          onChangeText={(text) => setFitnessGoals(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Medical Conditions"
          value={medicalConditions}
          onChangeText={(text) => setMedicalConditions(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
