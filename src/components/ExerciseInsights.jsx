// src/components/Analytics/ExerciseInsights.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetchExercises, fetchExercisePerformance } from '../api/api';
import styles from '../styles/ExerciseInsights.style';

const ExerciseInsights = ({ athleteId }) => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const exerciseData = await fetchExercises();
        setExercises(exerciseData);
      } catch (error) {
        console.error('Error loading exercises:', error);
      }
    };

    loadExercises();
  }, []);

  const loadPerformanceData = useCallback(async () => {
    if (!selectedExercise) return;
    setLoading(true);
    try {
      const performance = await fetchExercisePerformance(athleteId, selectedExercise);
      setPerformanceData(performance ? performance[0] : null);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedExercise, athleteId]);

  useEffect(() => {
    loadPerformanceData();
  }, [loadPerformanceData]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Exercise Insights</Text>
      <Picker
        selectedValue={selectedExercise}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedExercise(itemValue)}
      >
        <Picker.Item label="Select an Exercise" value="" />
        {exercises.map((exercise) => (
          <Picker.Item key={exercise.id} label={exercise.name} value={exercise.id} />
        ))}
      </Picker>
      {loading ? (
        <ActivityIndicator size="large" color="#F2AE30" />
      ) : performanceData ? (
        <View style={styles.performanceData}>
          <Text>Total Sessions: {performanceData.total_sessions}</Text>
          <Text>Average Weight Lifted: {performanceData.average_weight} kg</Text>
          <Text>Average Reps: {performanceData.average_reps}</Text>
          <Text>Personal Best Weight: {performanceData.personal_best_weight} kg</Text>
          <Text>Personal Best Reps: {performanceData.personal_best_reps}</Text>
        </View>
      ) : (
        selectedExercise && <Text style={styles.noDataText}>No data available for this exercise.</Text>
      )}
    </View>
  );
};

export default ExerciseInsights;
