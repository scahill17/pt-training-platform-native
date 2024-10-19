import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 100,  // Lower the content to avoid being too close to the top
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 80, // Lower the back button for accessibility
    left: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
    marginTop: 40
  },
  subTitle: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,  // Larger border radius for rounded corners
    paddingVertical: 15,  // More padding for larger input boxes
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 25,  // More space between input fields
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // For Android shadow
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 30, // More rounded button
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,  // Add more space before the button
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;