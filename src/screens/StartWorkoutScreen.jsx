import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RenderExercisePage from '../components/RenderExercisePage'; // Custom component to render each exercise
import styles from '../styles/StartWorkoutScreen.style'; // Style file
import { fetchWorkoutSessionDetails, saveWorkoutSession, saveWorkoutDetails, deleteWorkoutSession } from '../api/api'; // Your existing API functions

const screenWidth = Dimensions.get('window').width;

export default function StartWorkoutScreen({ route }) {
  const { athleteID, date } = route.params;
  const [workoutSession, setWorkoutSession] = useState(null);
  const [exercises, setExercises] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadWorkoutSession = async () => {
      try {
        const session = await fetchWorkoutSessionDetails(athleteID, date);
        if (session) {
          setWorkoutSession(session);
          setExercises(session.exercises);
        }
      } catch (error) {
        console.error('Error loading workout session:', error);
      }
    };

    loadWorkoutSession();
  }, [athleteID, date]);

  const handleAddSet = (exerciseIndex) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets += 1; // Add one set
    setExercises(updatedExercises);
  };

  const handleRemoveSet = (exerciseIndex) => {
    const updatedExercises = [...exercises];
    if (updatedExercises[exerciseIndex].sets > 1) {
      updatedExercises[exerciseIndex].sets -= 1; // Remove one set
      setExercises(updatedExercises);
    }
  };

  const handleCompleteWorkout = async () => {
    try {
      await deleteWorkoutSession(workoutSession.id); // Delete the existing workout session
      const newSessionId = await saveWorkoutSession(athleteID, date, 'Y'); // Create a new session with completed = 'Y'

      for (const exercise of exercises) {
        await saveWorkoutDetails({
          workout_session_id: newSessionId,
          exercise_id: exercise.id,
          instructions: exercise.instructions,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
        });
      }

      Alert.alert('Success', 'Workout session completed!');
      navigation.navigate('Training'); // Navigate back to TrainingScreen
    } catch (error) {
      console.error('Error completing workout session:', error);
      Alert.alert('Error', 'Failed to complete workout session.');
    }
  };

  return (
    <View style={styles.container}>
      {exercises.length > 0 ? (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: screenWidth * (exercises.length + 1) }} // Full width for all exercises + done page
        >
          {exercises.map((exercise, index) => (
            <RenderExercisePage
              exercise={exercise}
              onAddSet={() => handleAddSet(index)}
              onRemoveSet={() => handleRemoveSet(index)}
              currentIndex={index}
              totalExercises={exercises.length}
            />
          ))}

          {/* Done Training Page */}
          <View style={[styles.completePage, { width: screenWidth }]}>
            <Text style={styles.completeText}>Done Training!</Text>
            <Button title="Complete Workout" onPress={handleCompleteWorkout} />
          </View>
        </ScrollView>
      ) : (
        <Text>Loading workout details...</Text>
      )}
    </View>
  );
}
