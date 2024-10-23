import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchExercises, addNewExercise, fetchExerciseId, saveWorkoutSession, saveWorkoutDetails, fetchWorkoutSessionId } from '../api/api';
import styles from '../styles/AddWorkoutScreen.style';
import WorkoutTable from '../components/WorkoutTable';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function AddWorkoutScreen({ route }) {
  const { athleteID, date } = route.params;
  const [exercises, setExercises] = useState([]);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [newExerciseIndexes, setNewExerciseIndexes] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState('');

  const navigation = useNavigation();

  // Fetch exercises from the database
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const fetchedExercises = await fetchExercises();
        setExerciseOptions(['Select Exercise', ...fetchedExercises.map(exercise => exercise.name), 'New Exercise']);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    loadExercises();
  }, []);

  // Add a new exercise block to the session
  const handleAddExercise = () => {
    setExercises([...exercises, { name: 'Select Exercise', sets: 3, instructions: '', reps: ['', '', ''], weight: ['', '', ''] }]);
  };

  // Handle dropdown change
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

  // Confirm adding a new exercise
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

  // Revert the new exercise selection
  const handleRevertNewExercise = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].name = 'Select Exercise'; // Revert to placeholder
    setExercises(updatedExercises);
    setNewExerciseIndexes(newExerciseIndexes.filter(i => i !== index));
  };

  // Input validation before saving the workout
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

  // Save workout session
  const handleSaveWorkout = async () => {
    if (!validateWorkout()) return; // Run validation before saving

    try {
      // Save the workout session
      await saveWorkoutSession(athleteID, date);
  
      // Fetch the workout session ID after saving
      const workoutSessionId = await fetchWorkoutSessionId(athleteID, date);
  
      // Save the workout details (exercises)
      await Promise.all(exercises.map(async (exercise) => {
        const exerciseId = await fetchExerciseId(exercise.name); // Get the correct ID for the exercise name
  
        const exerciseData = {
          workout_session_id: workoutSessionId,
          exercise_id: exerciseId, 
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
          instructions: exercise.instructions || "", 
        };
        
        console.log("Exercise data: ", exerciseData);
        
        await saveWorkoutDetails(exerciseData); // Save workout details with correct structure
      }));
  
      Alert.alert('Success', 'Workout session saved successfully!');
    } catch (error) {
      console.error('Error saving workout session:', error);
      Alert.alert('Error', 'Failed to save the workout session.');
    }
  };
  
  // Discard the workout and go back
  const handleDiscardWorkout = () => {
    Alert.alert('Discard', 'Are you sure you want to discard this workout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Discard', onPress: () => navigation.goBack() },
    ]);
  };

  // Delete an exercise from the list
  const handleDeleteExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Page Title */}
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
                style={styles.newExerciseInput} // Matches the sign-in page styling
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
              style={[styles.picker, styles.exerciseInput]} // Match the input field styling
              onValueChange={(value) => handleExerciseChange(index, value)}
            >
              {exerciseOptions.map((option, i) => (
                <Picker.Item key={i} label={option} value={option} style={option === 'New Exercise' ? { fontWeight: 'bold' } : {}} />
              ))}
            </Picker>
          )}

          {/* Instructions Input */}
          <TextInput
            style={styles.exerciseInput} // Matches the sign-in page styling
            placeholder="Exercise Instructions"
            value={exercise.instructions}
            onChangeText={(value) => handleExerciseChange(index, value)}
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
