import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Navigation hook for React Native
import { checkUserEmail } from "../api/api"; // Ensure the correct path
import styles from "../styles/SignInScreen.style"; // Import the styles

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Although password doesn't matter
  const [loginFailed, setLoginFailed] = useState(false); // To control modal visibility

  const navigation = useNavigation(); // Correctly use the navigation hook for React Native

  const handleLogin = async () => {
    const user = await checkUserEmail(email); // Check if the email exists
    if (user) {
      // Store the logged-in user info in AsyncStorage or localStorage
      // AsyncStorage.setItem("loggedInUser", JSON.stringify(user)); // Use AsyncStorage for React Native

      // Navigate to MainTabs after login
      navigation.navigate("Main");
    } else {
      // Email doesn't exist, show login failed modal
      setLoginFailed(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to your account</Text>
      <Text style={styles.subTitle}>Sign in or create your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.body}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.bottomText}>
            Don’t have an account? <Text style={styles.linkText}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal for login failure */}
      <Modal visible={loginFailed} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Login failed, please try again.</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setLoginFailed(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
