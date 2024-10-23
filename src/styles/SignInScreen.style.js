import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },

  body: {
    alignItems: "center", 
    flexGrow: 1, 
    justifyContent: "flex-end", 
    paddingBottom: 20,
  },

  title: {
    paddingTop: 150,
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 40,
    color: "#666",
    textAlign: "center",
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
    shadowOpacity: 0.25,   
    shadowRadius: 3.84,    
    elevation: 5,
  },

  button: {
    backgroundColor: "#F2AE30",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    width: "80%",
    shadowColor: "#000", 
    shadowOffset: {
      width: 1,  
      height: 3, 
    },
    shadowOpacity: 0.25,   
    shadowRadius: 3.84,    
    elevation: 5,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  bottomText: {
    fontSize: 12,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "#666", 
  },

  linkButton: {
    marginTop: 10,
  },

  linkText: {
    color: "#D9952D", 
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    width: '80%',
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  modalText: {
    fontSize: 16,
    color: "#333",
    textAlign: 'center',
    marginBottom: 20,
  },

  closeButton: {
    backgroundColor: "#F2AE30",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    width: "60%",
    alignItems: "center",
    shadowColor: "#000", 
    shadowOffset: {
      width: 1,  
      height: 3, 
    },
    shadowOpacity: 0.25,   
    shadowRadius: 3.84,    
    elevation: 5,
  },

  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default styles;