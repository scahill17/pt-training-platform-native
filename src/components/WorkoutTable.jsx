import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/WorkoutTable.style'

/**
 * WorkoutTable component for React Native - Displays a table for an exercise with sets, reps, and weight
 * @param {Object} exercise - The current exercise being edited
 * @param {number} index - The index of the exercise in the exercises array
 * @param {Function} setExercises - Function to update the exercises state
 * @param {Array} exercises - The array of exercises
 */
const WorkoutTable = ({ exercise, index, setExercises, exercises, showCheckBox, completedSets, toggleCheckBox }) => {

  // Handle change in the reps or weight for a specific set
  const handleTableChange = (setIndex, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field][setIndex] = value; // Update reps or weight at specific set index
    setExercises(updatedExercises);
  };

  // Add a new set row to the exercise table
  const handleAddSetRow = () => {
    const updatedExercises = [...exercises];
    updatedExercises[index].sets += 1;
    updatedExercises[index].reps.push(''); // Add placeholder for reps
    updatedExercises[index].weight.push(''); // Add placeholder for weight
    setExercises(updatedExercises);
  };
  
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
