import React from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import styles from "../styles/WorkoutOptions.style";
import { deleteWorkoutSession } from "../api/api";

export default function WorkoutOptions({ onClose, athleteId, date, onDelete }) {
  // Handle delete session
  const handleDeleteSession = async () => {
    try {
      // Confirm deletion
      Alert.alert(
        "Delete Session",
        "Are you sure you want to delete this session?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            onPress: async () => {
              await deleteWorkoutSession(athleteId, date);
              onDelete(); // Notify parent component to refresh data and close modal
            },
            style: "destructive",
          },
        ]
      );
    } catch (error) {
      console.error("Error deleting workout session:", error);
      Alert.alert("Error", "Failed to delete the workout session.");
    }
  };

  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Workout Options</Text>

          {/* Delete Session Button */}
          <TouchableOpacity style={styles.optionButton} onPress={handleDeleteSession}>
            <Text style={styles.optionText}>Delete Session</Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.optionText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
