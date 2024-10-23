import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import CustomCalendar from "../components/CustomCalendar";
import styles from "../styles/TrainingScreen.style";
import { Ionicons } from "@expo/vector-icons";
import { fetchWorkoutSessionDetails } from "../api/api";
import WorkoutOptions from "../components/WorkoutOptions";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TrainingScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [workoutSession, setWorkoutSession] = useState(null);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [athleteId, setAthleteId] = useState(null);

  const navigation = useNavigation();

  // Fetch athleteId from AsyncStorage
  useEffect(() => {
    const loadAthleteId = async () => {
      try {
        const storedAthleteId = await AsyncStorage.getItem("athleteId"); // Retrieve athleteId from storage
        if (storedAthleteId) {
          setAthleteId(storedAthleteId); // Set athleteId in state
        } else {
          Alert.alert("Error", "Athlete ID not found. Please sign in again.");
          navigation.replace("Signin");
        }
      } catch (error) {
        console.error("Error loading athlete ID:", error);
      }
    };

    loadAthleteId();
  }, []);

  // Fetch workout session for the selected date when athleteId is available
  useEffect(() => {
    const loadWorkoutSession = async () => {
      if (!athleteId) return;

      try {
        setIsLoading(true);
        const session = await fetchWorkoutSessionDetails(athleteId, selectedDate);
        if (session) {
          setWorkoutSession(session); // If workout session exists, update state
        } else {
          setWorkoutSession(null); // If no workout session exists, clear the previous session
        }
      } catch (error) {
        console.error("Error fetching workout session:", error);
        setWorkoutSession(null); // Clear session on error as well
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkoutSession();
  }, [athleteId, selectedDate]);

  const handleShowOptions = () => {
    setIsOptionsVisible(true); // Show the WorkoutOptions component
  };

  const handleAddWorkout = () => {
    navigation.navigate('AddWorkout', { athleteID: athleteId, date: selectedDate });
  };

  const handleDeleteAndRefresh = () => {
    setIsOptionsVisible(false); // Close the modal
    setWorkoutSession(null); // Reset workout session data
    // Trigger data reload (by setting date or athleteId again if needed)
    Alert.alert("Success", "Workout session deleted successfully.");
  };

  const handleStartSession = () => {
    navigation.navigate('StartWorkout', { athleteID: athleteId, date: selectedDate });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Page Title */}
        <Text style={styles.title}>Training</Text>

        {/* Custom Week Calendar */}
        <CustomCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        {/* Workout Session Header with ellipsis */}
        <View style={styles.workoutSessionHeader}>
          <Text style={styles.workoutSessionText}>Workout Session</Text>
          <TouchableOpacity onPress={handleShowOptions} style={styles.ellipsisButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Conditional Start/Add Session Button */}
        {workoutSession ? (
          <TouchableOpacity style={styles.startSessionButton} onPress={handleStartSession}>
            <Text style={styles.startSessionText}>Start Session</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.startSessionButton} onPress={handleAddWorkout}>
            <Text style={styles.startSessionText}>Add Session</Text>
          </TouchableOpacity>
        )}

        {/* Workout Options Modal */}
        {isOptionsVisible && (
          <WorkoutOptions
            onClose={() => setIsOptionsVisible(false)}
            athleteId={athleteId}
            date={selectedDate}
            onDelete={handleDeleteAndRefresh} // Pass the delete handler
          />
        )}

        {/* Workout Session Content */}
        <View style={styles.workoutContent}>
          {isLoading ? (
            <Text>Loading workout session...</Text>
          ) : workoutSession ? (
            <View>
              {workoutSession.exercises.map((exercise, index) => (
                <View key={index} style={styles.exerciseContainer}>
                  {/* Exercise Title */}
                  <Text style={styles.exerciseTitle}>{exercise.name}</Text>

                  {/* Conditionally render exercise instructions if available */}
                  {exercise.instructions && exercise.instructions.trim() !== "" && (
                    <Text style={styles.exerciseInstructions}>
                      Instructions: {exercise.instructions}
                    </Text>
                  )}

                  {/* Exercise Details */}
                  <Text style={styles.exerciseDetails}>
                    {exercise.sets} sets of {exercise.reps.join(", ")} reps at {exercise.weight.join(", ")} kg
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>No workout session available for this day.</Text>
          )}
        </View>

        {/* Add Workout Button */}
        <TouchableOpacity style={styles.addWorkoutButton} onPress={handleAddWorkout}>
          <Ionicons name="add-circle" size={56} color="#F2AE30" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}