import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    padding: 5,
    backgroundColor: "#1E1E1E",
  },
  tabIcon: {
    color: "#888888", // Default inactive color
  },
  focusedTabIcon: {
    color: "#FFFFFF", // Active icon color
    transform: [{ translateY: -5 }],
  },
  tabLabel: {
    color: "#888888", // Default inactive label color
    fontSize: 10,
    fontWeight: "normal", // Normal weight for inactive tabs
    transform: [{ translateY: -5 }], // Shift text upwards
  },
  focusedTabLabel: {
    color: "#FFFFFF", // Active label color
    fontSize: 10,
    fontWeight: "bold", // Bold when focused
    transform: [{ translateY: -5 }], // Shift text upwards
  },
  focusedTabContainer: {
    backgroundColor: "#F2AE30",
    paddingVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -20, // Extend beyond the nav bar
    position: 'absolute', // Position to float above the tab bar
    top: -20, // Float over the tab bar
    width: '100%', // Full width of the tab
    height: 80, // Adjusted height for focus effect
  },
  tabContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default styles;
