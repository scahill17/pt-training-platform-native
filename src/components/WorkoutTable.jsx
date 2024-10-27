import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/WorkoutTable.style'

/**
 * WorkoutTable component for displaying exercise details in a table format.
 * @param {Object} props - Component props.
 * @param {Object} props.exercise - Exercise data with sets, reps, and weight.
 * @param {number} props.index - Index of the exercise in the exercises array.
 * @param {Function} props.setExercises - Function to update exercises state.
 * @param {Array} props.exercises - Array of exercises.
 * @param {boolean} [props.showCheckBox] - Determines if checkboxes are shown for sets.
 * @param {Array<boolean>} [props.completedSets] - Array tracking completed sets.
 * @param {Function} [props.toggleCheckBox] - Function to toggle checkbox state for sets.
 * @returns {JSX.Element} - Rendered WorkoutTable component.
 */
const WorkoutTable = ({ exercise, index, setExercises, exercises, showCheckBox, completedSets, toggleCheckBox }) => {

  /**
   * Updates reps or weight for a specific set in the exercises array.
   * @param {number} setIndex - Index of the set being updated.
   * @param {string} field - Either 'reps' or 'weight' field to update.
   * @param {string} value - New value for the field.
   */
  const handleTableChange = (setIndex, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field][setIndex] = value; // Update reps or weight at specific set index
    setExercises(updatedExercises);
  };

  /**
   * Adds a new set row into the table
   */
  const handleAddSetRow = () => {
    const updatedExercises = [...exercises];
    updatedExercises[index].sets += 1;
    updatedExercises[index].reps.push(''); // Add placeholder for reps
    updatedExercises[index].weight.push(''); // Add placeholder for weight
    setExercises(updatedExercises);
  };
  
  /**
   * Removes a last set row into the table
   */
  const handleRemoveSetRow = () => {
    const updatedExercises = [...exercises];
    if (updatedExercises[index].sets > 1) {
      updatedExercises[index].sets -= 1;
      updatedExercises[index].reps.pop(); // Remove last entry in reps
      updatedExercises[index].weight.pop(); // Remove last entry in weight
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
        {showCheckBox && <Text style={styles.headerText}>Done</Text>}
      </View>

      {/* Table Rows */}
      {Array.from({ length: exercise.sets }).map((_, setIndex) => (
        <View key={setIndex} style={styles.tableRow}>
          <Text style={styles.rowText}>{setIndex + 1}</Text>
          <TextInput
            style={styles.inputField}
            value={exercise.reps[setIndex] ? exercise.reps[setIndex].toString() : ''}
            onChangeText={(text) => handleTableChange(setIndex, 'reps', text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputField}
            value={exercise.weight[setIndex] ? exercise.weight[setIndex].toString() : ''}
            onChangeText={(text) => handleTableChange(setIndex, 'weight', text)}
            keyboardType="numeric"
          />
          {showCheckBox && (
            <TouchableOpacity onPress={() => toggleCheckBox(setIndex)} style={styles.checkboxContainer}>
              <Ionicons
                name={completedSets[setIndex] ? 'checkbox' : 'square-outline'}
                size={24}
                color={completedSets[setIndex] ? '#F2AE30' : '#777'}
              />
            </TouchableOpacity>
          )}
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