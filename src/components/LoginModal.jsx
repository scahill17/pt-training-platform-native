import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/SignInScreen.style";

/**
 * LoginModal component to display login failure messages.
 * @param {Object} props - Component props.
 * @param {boolean} props.visible - Determines if the modal is visible.
 * @param {function} props.onClose - Function to close the modal.
 * @returns {JSX.Element} - Rendered LoginModal component.
 */
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