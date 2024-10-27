import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingTop: 60,
      padding: 20,
      backgroundColor: '#fff',
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 10,
    },
    subText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 30,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 30,
    },
    navButton: {
      backgroundColor: '#F2AE30',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 8,
      marginBottom: 15,
      width: '80%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 3,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    quote: {
      fontSize: 14,
      fontStyle: 'italic',
      color: '#888',
      textAlign: 'center',
      marginTop: 20,
      paddingHorizontal: 20,
    },
  });

  export default styles;