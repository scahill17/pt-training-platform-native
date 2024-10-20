import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/SignInScreen.style";

const LoginModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Login failed, please try again.</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LoginModal;