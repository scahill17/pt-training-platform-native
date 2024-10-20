import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align content to the top of the page
    paddingHorizontal: 20, // Horizontal padding for alignment
    paddingTop: 60, // To create some spacing from the top
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center", // Center-align the title 'Training'
    marginBottom: 20,
  },
  workoutSessionHeader: {
    flexDirection: "row", // To make the ellipsis and text inline
    justifyContent: "space-between", // Align the text left and ellipsis right
    alignItems: "center", // Vertically center align the text and ellipsis
    width: "100%", // Full width for spacing
    marginBottom: 10,
  },
  workoutSessionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left", // Ensure it's left-aligned
  },
  ellipsisButton: {
    paddingRight: 10, // Slight padding for the button alignment
  },
  workoutContent: {
    marginTop: 20, // Space between the workout header and the content
    width: "100%", // Ensures the content takes up full width
  },
  exerciseContainer: {
    marginBottom: 15, // Spacing between exercises
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  exerciseInstructions: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    marginVertical: 5, // Space between the instruction and the title/details
  },  
  exerciseDetails: {
    fontSize: 16,
    color: "#555",
  },
  addWorkoutButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "transparent",
    borderRadius: 50,
  },
  startSessionButton: {
    backgroundColor: "#F2AE30",
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10, // Adds spacing between the header and the button
  },
  startSessionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  
});

export default styles;
