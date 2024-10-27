import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    padding: 5,
    backgroundColor: "#1E1E1E",
  },
  tabIcon: {
    color: "#888888",
  },
  focusedTabIcon: {
    color: "#FFFFFF",
    transform: [{ translateY: -5 }],
  },
  tabLabel: {
    color: "#888888",
    fontSize: 10,
    fontWeight: "normal",
    transform: [{ translateY: -5 }],
  },
  focusedTabLabel: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    transform: [{ translateY: -5 }],
  },
  focusedTabContainer: {
    backgroundColor: "#F2AE30",
    paddingVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -20,
    position: 'absolute',
    top: -20,
    width: '100%',
    height: 80,
  },
  tabContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default styles;