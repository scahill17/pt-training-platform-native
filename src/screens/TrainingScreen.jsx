import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import CustomCalendar from "../components/CustomCalendar";
import styles from "../styles/TrainingScreen.style";
import { Ionicons } from "@expo/vector-icons";
import { fetchWorkoutSessionDetails, fetchCurrentWorkoutSession } from "../api/api";
import WorkoutOptions from "../components/WorkoutOptions";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TrainingScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [workoutSession, setWorkoutSession] = useState(null);
  const [session, setSession] = useState(null);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [athleteId, setAthleteId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadAthleteId = async () => {
      try {
        const storedAthleteId = await AsyncStorage.getItem("athleteId");
        if (storedAthleteId) {
          setAthleteId(storedAthleteId);
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

  useFocusEffect(
    useCallback(() => {
      const loadWorkoutSession = async () => {
        if (!athleteId) return;
        try {
          setIsLoading(true);
          const currentSession = await fetchCurrentWorkoutSession(athleteId, selectedDate);
          setSession(currentSession);
          const sessionDetails = await fetchWorkoutSessionDetails(athleteId, selectedDate);
          setWorkoutSession(sessionDetails || null);
        } catch (error) {
          console.error("Error fetching workout session:", error);
          setWorkoutSession(null);
        } finally {
          setIsLoading(false);
        }
      };
      loadWorkoutSession();
    }, [athleteId, selectedDate])
  );

  const handleShowOptions = () => {
    setIsOptionsVisible(true);
  };

  const handleAddWorkout = () => {
    navigation.navigate('AddWorkout', { athleteID: athleteId, date: selectedDate });
  };

  const handleDeleteAndRefresh = () => {
    setIsOptionsVisible(false);
    setWorkoutSession(null);
    Alert.alert("Success", "Workout session deleted successfully.");
  };

  const handleStartSession = () => {
    navigation.navigate('StartWorkout', { athleteID: athleteId, date: selectedDate });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Training</Text>
        <CustomCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        <View style={styles.workoutSessionHeader}>
          <Text style={styles.workoutSessionText}>Workout Session</Text>
          <TouchableOpacity onPress={handleShowOptions} style={styles.ellipsisButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {workoutSession ? (
          session[0] && session[0].completed === "Y" ? (
            <View style={styles.sessionCompletedContainer}>
              <Text style={styles.sessionCompletedText}>Session Completed</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.startSessionButton} onPress={handleStartSession}>
              <Text style={styles.startSessionText}>Start Session</Text>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity style={styles.startSessionButton} onPress={handleAddWorkout}>
            <Text style={styles.startSessionText}>Add Session</Text>
          </TouchableOpacity>
        )}

        {isOptionsVisible && (
          <WorkoutOptions
            onClose={() => setIsOptionsVisible(false)}
            athleteId={athleteId}
            date={selectedDate}
            onDelete={handleDeleteAndRefresh}
          />
        )}

        <View style={styles.workoutContent}>
          {isLoading ? (
            <Text>Loading workout session...</Text>
          ) : workoutSession ? (
            <View>
              {workoutSession.exercises.map((exercise, index) => (
                <View key={index} style={styles.exerciseContainer}>
                  <Text style={styles.exerciseTitle}>{exercise.name}</Text>
                  {exercise.instructions && exercise.instructions.trim() !== "" && (
                    <Text style={styles.exerciseInstructions}>
                      Instructions: {exercise.instructions}
                    </Text>
                  )}
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

        <TouchableOpacity style={styles.addWorkoutButton} onPress={handleAddWorkout}>
          <Ionicons name="add-circle" size={56} color="#F2AE30" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
