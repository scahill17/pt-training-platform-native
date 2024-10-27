import React, { useState, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetchExercises, fetchExercisePerformance } from '../api/api';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/ExerciseInsights.style';

/**
 * ExerciseInsights component for displaying exercise performance insights.
 * @param {Object} props - Component props.
 * @param {number} props.athleteId - ID of the athlete.
 * @returns {JSX.Element} - Rendered ExerciseInsights component.
 */
const ExerciseInsights = ({ athleteId }) => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Fetches list of exercises available for the athlete.
   */
  const loadExercises = useCallback(async () => {
    try {
      const exerciseData = await fetchExercises();
      setExercises(exerciseData);
    } catch (error) {
      console.error('Error loading exercises:', error);
    }
  }, []);

  /**
   * Fetches performance data for the selected exercise.
   */
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

  // Load exercises on component focus and on mount
  useFocusEffect(
    useCallback(() => {
      loadExercises();
      loadPerformanceData();
    }, [loadExercises, loadPerformanceData])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Exercise Insights</Text>

      {/* Styled picker for exercise selection */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedExercise}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedExercise(itemValue)}
          mode="dropdown"
        >
          <Picker.Item label="Select an Exercise" value="" />
          {exercises.map((exercise) => (
            <Picker.Item key={exercise.id} label={exercise.name} value={exercise.id} />
          ))}
        </Picker>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#F2AE30" />
      ) : performanceData ? (
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Sessions Completed</Text>
            <Text style={styles.statValue}>{performanceData.total_sessions}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Average Weight Lifted</Text>
            <Text style={styles.statValue}>{performanceData.average_weight} kg</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Average Reps Completed</Text>
            <Text style={styles.statValue}>{performanceData.average_reps}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>PB: Weight Lifted</Text>
            <Text style={styles.statValue}>{performanceData.personal_best_weight} kg</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>PB: Reps Completed</Text>
            <Text style={styles.statValue}>{performanceData.personal_best_reps}</Text>
          </View>
        </View>
      ) : (
        selectedExercise && <Text style={styles.noDataText}>No data available for this exercise.</Text>
      )}
    </View>
  );
};

export default ExerciseInsights;