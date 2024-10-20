import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  weekNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: '90%',
  },
  weekLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  weekContainer: {
    justifyContent: "space-between",
    paddingBottom: 5,
    width: '100%',
    paddingHorizontal: 10,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    width: 40,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#333",
  },
  selectedDay: {
    backgroundColor: "#F2AE30",
  },
  dayText: {
    fontSize: 12,
    color: "#fff",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  todayButton: {
    marginTop: 10,
    marginBottom: 40,
    padding: 10,
    backgroundColor: "#F2AE30",
    borderRadius: 8,
  },
  todayButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
