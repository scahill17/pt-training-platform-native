// src/styles/AnalyticsScreen.style.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fafafa',
    flexGrow: 1,
    width: '100%',  // Ensure the container spans the full width
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 50, // Positions title further down
    marginBottom: 30,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',  // Spreads buttons across screen width
    justifyContent: 'space-around', // Adds even spacing between buttons
    paddingHorizontal: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#F2AE30',
  },
  toggleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
