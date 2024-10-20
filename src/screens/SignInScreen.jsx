import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { checkUserEmail } from "../api/api";
import styles from "../styles/SignInScreen.style";
import LoginModal from "../components/LoginModal";

export default function SignInScreen() {
  // State hooks for email, password, and login failure status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const navigation = useNavigation(); // Use navigation hook

  // Handle login logic asynchronously
  const handleLogin = async () => {
    const user = await checkUserEmail(email); // Validate email
    if (user) {
      // On successful login, navigate to the Main screen
      navigation.navigate("Main");
    } else {
      // Show login failed modal if email validation fails
      setLoginFailed(true);
    }
  };

  // Render the login screen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to your account</Text>
      <Text style={styles.subTitle}>Sign in or create your account</Text>

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
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.bottomText}>
            Don’t have an account? <Text style={styles.linkText}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Failure Modal */}
      <LoginModal
        visible={loginFailed}
        onClose={() => setLoginFailed(false)}
      />
    </View>
  );
}