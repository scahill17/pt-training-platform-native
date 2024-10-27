import React from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import styles from "../styles/WorkoutOptions.style";
import { deleteWorkoutSession } from "../api/api";

/**
 * WorkoutOptions component for managing workout sessions, allowing deletion with confirmation.
 * @param {Object} props - Component props.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {number} props.athleteId - ID of the athlete.
 * @param {string} props.date - Date of the workout session.
 * @param {Function} props.onDelete - Callback function to trigger data refresh on deletion.
 * @returns {JSX.Element} - Rendered WorkoutOptions component.
 */
export default function WorkoutOptions({ onClose, athleteId, date, onDelete }) {
  
  /**
   * Confirms and deletes the workout session.
   */
  const handleDeleteSession = async () => {
    try {
      Alert.alert(
        "Delete Session",
        "Are you sure you want to delete this session?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            onPress: async () => {
              await deleteWorkoutSession(athleteId, date);
              // Notify parent to refresh data and close modal
              onDelete();
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