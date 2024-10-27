import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { checkUserEmail, fetchAthleteId } from "../api/api";
import styles from "../styles/SignInScreen.style";
import LoginModal from "../components/LoginModal";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * SignInScreen component for user authentication.
 * Validates user email and stores user ID on successful login.
 * @returns {JSX.Element} - Rendered SignInScreen component.
 */
function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const navigation = useNavigation();

  /**
    * Handles the login process by validating user email and storing user IDs in AsyncStorage.
    */
  const handleLogin = async () => {
    try {
      // Validate email.
      const user = await checkUserEmail(email);
      if (user) {
        // Fetch and store user and athlete Id.
        await AsyncStorage.setItem("userId", String(user.id));
        const athleteId = await fetchAthleteId(user.id);
        await AsyncStorage.setItem("athleteId", String(athleteId));
        navigation.navigate("Main");
      } else {
        setLoginFailed(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Failed to log in. Please try again.");
    }
  };

  /**
     * Closes the login failure modal and resets the loginFailed state.
     */
  const handleCloseModal = () => setLoginFailed(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.body}>
        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Sign-up Navigation */}
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.bottomText}>
            Don’t have an account? <Text style={styles.linkText}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Failure Modal */}
      <LoginModal visible={loginFailed} onClose={handleCloseModal} />
    </View>
  );
}

export default SignInScreen;