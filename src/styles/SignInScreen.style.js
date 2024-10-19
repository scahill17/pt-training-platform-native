import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between', 
  },
  body: {
    alignItems: "center", 
    flexGrow: 1, 
    justifyContent: "flex-end", 
    paddingBottom:20,
  },
  title: {
    paddingTop: 150,
    fontSize: 40,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 40,
  },
  input: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    shadowColor: "#000", 
    shadowOffset: {
      width: 1,  
      height: 3, 
    },
    shadowOpacity: 0.25,   // Shadow transparency
    shadowRadius: 3.84,    // Shadow blur radius
    elevation: 5, // Android Elevation
  },
  button: {
    backgroundColor: "#F2AE30",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    width:"80%",
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 1,  // Horizontal shadow offset
      height: 3, // Vertical shadow offset
    },
    shadowOpacity: 0.25,   // Shadow transparency
    shadowRadius: 3.84,    // Shadow blur radius
    elevation: 5, // Android Elevation
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomText: {
    fontSize: 12, // Adjusted for better readability
    padding: 10,
    fontWeight: "bold",
    textAlign: "center", // Centered for better alignment
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: "#D9952D", // Link color for "Register"
    fontWeight: "bold",
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay background
  },
  modalContent: {
    width: '80%',
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000", // Add shadow for Android
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 10, // Shadow blur radius
    elevation: 10, // Elevation for Android
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#407FDC",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    width: "60%",
    alignItems: "center",
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 1,  
      height: 3, 
    },
    shadowOpacity: 0.25,   // Shadow transparency
    shadowRadius: 3.84,    // Shadow blur radius
    elevation: 5, // Android Elevation
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default styles;