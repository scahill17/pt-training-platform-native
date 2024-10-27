import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import {
  fetchExercises,
  addNewExercise,
  fetchExerciseId,
  saveWorkoutSession,
  saveWorkoutDetails,
  fetchWorkoutSessionId
} from '../api/api';
import styles from '../styles/AddWorkoutScreen.style';
import WorkoutTable from '../components/WorkoutTable';

/**
 * AddWorkoutScreen component for adding a workout session with exercises for a specific athlete.
 * @param {Object} props - Component props.
 * @param {Object} props.route - React Navigation route object containing parameters.
 * @returns {JSX.Element} - Rendered AddWorkoutScreen component.
 */
function AddWorkoutScreen({ route }) {
  const { athleteID, date } = route.params;
  const [exercises, setExercises] = useState([]);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [newExerciseIndexes, setNewExerciseIndexes] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const navigation = useNavigation();

  // Fetch exercises on component mount
  useEffect(() => {
    loadExercises();
  }, []);

  /**
   * Loads available exercises to populate the exercise selection.
   */
  const loadExercises = async () => {
    try {
      const fetchedExercises = await fetchExercises();
      setExerciseOptions(['Select Exercise', ...fetchedExercises.map(exercise => exercise.name), 'New Exercise']);
    } catch (error) {
      console.error("Error loading exercises:", error);
      Alert.alert("Error", "Failed to load exercises.");
    }
  };

  /**
   * Adds an empty exercise template to the exercises list for editing.
   */
  const handleAddExercise = () => {
    setExercises([...exercises, { name: 'Select Exercise', sets: 3, instructions: '', reps: ['', '', ''], weight: ['', '', ''] }]);
  };

  /**
   * Handles exercise change from the dropdown component.
   * @param {Integer} index - The index of the selected exercise.
   * @param {String} value - The selected exercise in the drop down list.
   */
  const handleExerciseChange = (index, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].name = value;
    setExercises(updatedExercises);

    if (value === 'New Exercise') {
      setNewExerciseIndexes([...newExerciseIndexes, index]);
    } else {
      setNewExerciseIndexes(newExerciseIndexes.filter(i => i !== index));
    }
  };

  /**
   * Handles instructions changing for a given exercise.
   * @param {Integer} index - The index of the selected exercise.
   * @param {String} value - The instructions for the specific exercise.
   */
  const handleInstructionsChange = (index, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].instructions = value;
    setExercises(updatedExercises);
  };

  /**
   * Confirms the creation of a new exercise.
   * @param {Integer} index - Index of the new exercise being created. 
   */
  const handleAddNewExerciseConfirm = async (index) => {
    if (newExerciseName.trim()) {
      try {
        await addNewExercise(newExerciseName);
        setExerciseOptions([...exerciseOptions, newExerciseName]);
        handleExerciseChange(index, newExerciseName);
        setNewExerciseIndexes(newExerciseIndexes.filter(i => i !== index));
        setNewExerciseName('');
      } catch (error) {
        console.error('Error adding new exercise:', error);
      }
    }
  };

  /**
   * Handles cancelling the new exercise being created.
   * @param {Integer} index - Index of the new exercise that was being created. 
   */
  const handleRevertNewExercise = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].name = 'Select Exercise'; // Revert to placeholder
    setExercises(updatedExercises);
    setNewExerciseIndexes(newExerciseIndexes.filter(i => i !== index));
  };

  /**
   * Checks if the information entered in for the workout session is valid.
   * @returns {Boolean} - True if valid workout setup, false otherwise.
   */
  const validateWorkout = () => {
    for (const exercise of exercises) {
      // Ensure an exercise is selected
      if (exercise.name === 'Select Exercise') {
        Alert.alert('Validation Error', 'Please select an exercise.');
        return false;
      }

      // Ensure all reps and weight fields are filled with numbers
      if (exercise.reps.some(rep => !rep || isNaN(rep)) || exercise.weight.some(weight => !weight || isNaN(weight))) {
        Alert.alert('Validation Error', 'Please fill out all reps and weight fields with valid numbers.');
        return false;
      }
    }

    return true;
  };

  /**
   * Saves the workout session and exercises to the database.
   */
  const handleSaveWorkout = async () => {
    if (!validateWorkout()) return; // Run validation before saving

    try {
      // Save the workout session
      await saveWorkoutSession(athleteID, date);

      // Fetch the workout session ID after saving
      const workoutSessionId = await fetchWorkoutSessionId(athleteID, date);

      // Save the workout details (exercises)
      await Promise.all(exercises.map(async (exercise) => {
        const exerciseId = await fetchExerciseId(exercise.name);
        const exerciseData = {
          workout_session_id: workoutSessionId,
          exercise_id: exerciseId,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
          instructions: exercise.instructions || "",
        };
        // Save workout details with correct structure
        await saveWorkoutDetails(exerciseData);
      }));

      Alert.alert('Success', 'Workout session saved successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving workout session:', error);
      Alert.alert('Error', 'Failed to save the workout session.');
    }
  };

  /**
   * Discard the workout and go back
   */
  const handleDiscardWorkout = () => {
    Alert.alert('Discard', 'Are you sure you want to discard this workout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Discard', onPress: () => navigation.goBack() },
    ]);
  };

  /**
   * Delete an exercise from the list in the existing workout session.
   * @param {Integer} index - Current index of the exercise being deleted. 
   */
  const handleDeleteExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Workout</Text>

      {/* Back Button and Date Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.dateLabel}>{date}</Text>
      </View>

      {/* Exercises Form */}
      {exercises.map((exercise, index) => (
        <View key={index} style={styles.exerciseBlock}>
          {/* Dropdown for selecting exercise */}
          {newExerciseIndexes.includes(index) ? (
            <View style={styles.newExerciseInputContainer}>
              <TextInput
                style={styles.newExerciseInput}
                placeholder="Enter new exercise"
                value={newExerciseName}
                onChangeText={setNewExerciseName}
              />
              <TouchableOpacity onPress={() => handleAddNewExerciseConfirm(index)}>
                <Ionicons name="checkmark" size={24} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRevertNewExercise(index)}>
                <Ionicons name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ) : (
            <Picker
              selectedValue={exercise.name}
              style={[styles.picker, styles.exerciseInput]}
              onValueChange={(value) => handleExerciseChange(index, value)}
            >
              {exerciseOptions.map((option, i) => (
                <Picker.Item key={i} label={option} value={option} style={option === 'New Exercise' ? { fontWeight: 'bold' } : {}} />
              ))}
            </Picker>
          )}

          {/* Instructions Input */}
          <TextInput
            style={styles.exerciseInput}
            placeholder="Exercise Instructions"
            value={exercise.instructions}
            onChangeText={(value) => handleInstructionsChange(index, value)}
          />

          {/* Workout Table */}
          <WorkoutTable
            exercise={exercise}
            index={index}
            setExercises={setExercises}
            exercises={exercises}
          />

          {/* Delete Exercise Button */}
          <TouchableOpacity onPress={() => handleDeleteExercise(index)} style={styles.deleteExerciseButton}>
            <Text style={styles.deleteExerciseText}>Delete Exercise</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Add Exercise Button */}
      <TouchableOpacity onPress={handleAddExercise} style={styles.addExerciseButton}>
        <Ionicons name="add-circle" size={36} color="#F2AE30" />
        <Text style={styles.addExerciseText}>Add Exercise</Text>
      </TouchableOpacity>

      {/* Save and Discard Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.discardButton]} onPress={handleDiscardWorkout}>
          <Text style={styles.buttonText}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={handleSaveWorkout} disabled={isSaving}>
          <Text style={styles.buttonText}>Save Workout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddWorkoutScreen;