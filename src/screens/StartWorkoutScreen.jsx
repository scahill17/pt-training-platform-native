import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RenderExercisePage from '../components/RenderExercisePage';
import styles from '../styles/StartWorkoutScreen.style';
import { fetchWorkoutSessionDetails, saveWorkoutSession, saveWorkoutDetails, deleteWorkoutSession, fetchExerciseId } from '../api/api';

const screenWidth = Dimensions.get('window').width - 40;

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

  const handleCompleteWorkout = async () => {
    try {
      console.log("exercises 1: ", exercises);
      await deleteWorkoutSession(athleteID, date);
      const newSessionId = await saveWorkoutSession(athleteID, date, 'Y'); // Create a new session with completed = 'Y'
      console.log("new sessionid: ", newSessionId);
      console.log("exercises: ", exercises);
      console.log("exercises[0]: ", exercises[0]);
      console.log("exercises[0].id: ", exercises[0].id);

      await Promise.all(exercises.map(async (exercise) => {
        const exerciseId = await fetchExerciseId(exercise.name); // Get the correct ID for the exercise name

        const exerciseData = {
          workout_session_id: newSessionId,
          exercise_id: exerciseId,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
          instructions: exercise.instructions || "",
        };

        console.log("Exercise data: ", exerciseData);

        await saveWorkoutDetails(exerciseData); // Save workout details with correct structure
      }));

      Alert.alert('Success', 'Workout session completed!');
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
