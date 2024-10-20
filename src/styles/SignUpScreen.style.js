import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Main container with padding and centering
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 100,
    backgroundColor: "#fff",
  },

  // Back button at the top left
  backButton: {
    position: "absolute",
    top: 80,
    left: 20,
  },

  // Back button text styling
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },

  // Title styling
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
    marginTop: 40,
  },

  // Subtitle styling
  subTitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 20, 
    marginTop: 20,
  },

  // Input field styling
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 25,
    backgroundColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  // Sign-up button styling
  button: {
    backgroundColor: "#F2AE30",
    borderRadius: 30,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center", 
    marginTop: 30,
    marginBottom: 30,
  },

  // Button text styling
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;