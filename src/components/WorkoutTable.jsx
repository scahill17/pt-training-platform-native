import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icons replacement for FaPlus, FaMinus
import styles from '../styles/WorkoutTable.style'; // Import your custom styles

/**
 * WorkoutTable component for React Native - Displays a table for an exercise with sets, reps, and weight
 * @param {Object} exercise - The current exercise being edited
 * @param {number} index - The index of the exercise in the exercises array
 * @param {Function} setExercises - Function to update the exercises state
 * @param {Array} exercises - The array of exercises
 */
const WorkoutTable = ({ exercise, index, setExercises, exercises }) => {

  // Handle change in the reps or weight for a specific set
  const handleTableChange = (setIndex, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field][setIndex] = value;
    setExercises(updatedExercises);
  };

  // Add a new set row to the exercise table
  const handleAddSetRow = () => {
    const updatedExercises = [...exercises];
    updatedExercises[index].sets += 1;
    updatedExercises[index].reps.push(''); // Add an empty rep input
    updatedExercises[index].weight.push(''); // Add an empty weight input
    setExercises(updatedExercises);
  };

  // Remove the last set row from the exercise table
  const handleRemoveSetRow = () => {
    const updatedExercises = [...exercises];
    if (updatedExercises[index].sets > 1) {
      updatedExercises[index].sets -= 1;
      updatedExercises[index].reps.pop(); // Remove the last rep input
      updatedExercises[index].weight.pop(); // Remove the last weight input
      setExercises(updatedExercises);
    }
  };

  return (
    <View style={styles.workoutTableContainer}>
      {/* Exercise Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Set</Text>
        <Text style={styles.headerText}>Reps</Text>
        <Text style={styles.headerText}>Weight</Text>
      </View>

      {/* Table Rows */}
      {Array.from({ length: exercise.sets }).map((_, setIndex) => (
        <View key={setIndex} style={styles.tableRow}>
          <Text style={styles.rowText}>{setIndex + 1}</Text>
          <TextInput
            style={styles.inputField}
            value={exercise.reps[setIndex]}
            onChangeText={(text) => handleTableChange(setIndex, 'reps', text)}
          />
          <TextInput
            style={styles.inputField}
            value={exercise.weight[setIndex]}
            onChangeText={(text) => handleTableChange(setIndex, 'weight', text)}
          />
        </View>
      ))}

      {/* Set Controls */}
      <View style={styles.setControls}>
        <TouchableOpacity onPress={handleRemoveSetRow}>
          <Ionicons name="remove-circle-outline" size={30} color="#F2AE30" />
        </TouchableOpacity>
        <Text style={styles.setsLabel}>{`${exercise.sets} Sets`}</Text>
        <TouchableOpacity onPress={handleAddSetRow}>
          <Ionicons name="add-circle-outline" size={30} color="#F2AE30" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkoutTable;