import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RenderExercisePage from '../components/RenderExercisePage';
import styles from '../styles/StartWorkoutScreen.style';
import {
  fetchWorkoutSessionDetails,
  saveWorkoutSession,
  saveWorkoutDetails,
  deleteWorkoutSession,
  fetchExerciseId,
  updateExercisePerformance,
  updateWorkoutTrends
} from '../api/api';

const screenWidth = Dimensions.get('window').width - 40;

/**
 * StartWorkoutScreen component for displaying and tracking a workout session.
 * Fetches session details, allows tracking of completed sets, and updates performance data.
 * @param {Object} props - Component props.
 * @param {Object} props.route - React Navigation route containing athlete ID and date.
 * @returns {JSX.Element} - Rendered StartWorkoutScreen component.
 */
function StartWorkoutScreen({ route }) {
  const { athleteID, date } = route.params;
  const [workoutSession, setWorkoutSession] = useState(null);
  const [exercises, setExercises] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadWorkoutSession();
  }, [athleteID, date]);

  /**
   * Fetches workout session details and loads exercises into state.
   */
  const loadWorkoutSession = async () => {
    try {
      const session = await fetchWorkoutSessionDetails(athleteID, date);
      if (session) {
        setWorkoutSession(session);
        setExercises(session.exercises);
      } else {
        Alert.alert("Error", "Workout session not found.");
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error loading workout session:', error);
      Alert.alert("Error", "Failed to load workout session.");
    }
  };

  /**
   * Saves the workout session as completed and updates performance and trends data.
   */
  const handleCompleteWorkout = async () => {
    try {
      await deleteWorkoutSession(athleteID, date);
      const newSessionId = await saveWorkoutSession(athleteID, date, 'Y');

      // Initialise cumulative totals for the session
      let totalWorkoutWeight = 0;
      let totalWorkoutReps = 0;

      await Promise.all(exercises.map(async (exercise) => {
        const exerciseId = await fetchExerciseId(exercise.name);

        // Parse weights and reps to integers for calculations
        const parsedWeights = exercise.weight.map(w => parseInt(w, 10));
        const parsedReps = exercise.reps.map(r => parseInt(r, 10));

        // Calculate individual exercise totals
        const totalWeight = parsedWeights.reduce((sum, w, i) => sum + (w * parsedReps[i]), 0);
        const totalReps = parsedReps.reduce((sum, r) => sum + r, 0);
        const averageWeight = Math.floor(totalWeight / parsedReps.length);
        const averageReps = Math.floor(totalReps / parsedReps.length);
        const personalBestWeight = Math.max(...parsedWeights);
        const personalBestReps = Math.max(...parsedReps);

        await updateExercisePerformance(
          athleteID,
          exerciseId,
          totalReps,
          totalWeight,
          averageReps,
          averageWeight,
          personalBestWeight,
          personalBestReps
        );

        // Accumulate totals for the entire workout session
        totalWorkoutWeight += totalWeight;
        totalWorkoutReps += totalReps;

        const exerciseData = {
          workout_session_id: newSessionId,
          exercise_id: exerciseId,
          sets: exercise.sets,
          reps: parsedReps,
          weight: parsedWeights,
          instructions: exercise.instructions || "",
        };
        await saveWorkoutDetails(exerciseData);
      }));

      // Determine trend period for weekly
      const currentDate = new Date(date);
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekPeriod = weekStart.toISOString().split('T')[0];

      // Update workout trends with consolidated totals
      await updateWorkoutTrends(athleteID, 'weekly', weekPeriod, totalWorkoutWeight, totalWorkoutReps);

      Alert.alert('Success', 'Workout completed!');
      navigation.goBack();
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
          contentContainerStyle={{ width: screenWidth * (exercises.length + 1) }}
        >
          {exercises.map((exercise, index) => (
            <RenderExercisePage
              key={index}
              exercise={exercise}
              currentIndex={index}
              totalExercises={exercises.length}
              exercises={exercises} // Pass the exercises array
              setExercises={setExercises} // Pass the setExercises function
            />
          ))}

          {/* Done Training Page */}
          <View style={[styles.completePage, { width: screenWidth }]}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.image}
            />
            <Text style={styles.completeText}>Congratulations!</Text>
            <Text style={styles.subText}>You've successfully completed your workout session.</Text>
            <TouchableOpacity style={styles.completeSessionButton} onPress={handleCompleteWorkout}>
              <Text style={styles.completeSessionText}>Complete Workout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <Text>Loading workout details...</Text>
      )}
    </View>
  );
}

export default StartWorkoutScreen;