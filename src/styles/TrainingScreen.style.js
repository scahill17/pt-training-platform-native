import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  workoutSessionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  workoutSessionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
  },
  ellipsisButton: {
    paddingRight: 10,
  },
  workoutContent: {
    marginTop: 20,
    width: "100%",
  },
  exerciseContainer: {
    marginBottom: 15,
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
    marginVertical: 5, 
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
    marginTop: 10,
  },
  startSessionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  
});

export default styles;
