import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PerformanceOverview from '../components/PerformanceOverview';
import ExerciseInsights from '../components/ExerciseInsights';
import styles from '../styles/AnalyticsScreen.style';

/**
 * AnalyticsScreen component for displaying athlete analytics data.
 * Allows toggling between PerformanceOverview and ExerciseInsights components.
 * @returns {JSX.Element} - Rendered AnalyticsScreen component.
 */
const AnalyticsScreen = () => {
  const [athleteId, setAthleteId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [activeScreen, setActiveScreen] = useState('PerformanceOverview');

  /**
   * Loads the athlete ID from AsyncStorage and handles errors if not found.
   */
  useEffect(() => {
    const loadAthleteId = async () => {
      try {
        const id = await AsyncStorage.getItem('athleteId');
        if (id) {
          setAthleteId(id);
        } else {
          setErrorMessage('Athlete ID not found. Please sign in again.');
        }
      } catch (error) {
        console.error('Error fetching athlete ID:', error);
        setErrorMessage('Failed to load athlete information.');
      }
    };

    loadAthleteId();
  }, []);

  if (!athleteId) return <Text style={styles.errorText}>{errorMessage}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Analytics</Text>

      {/* Creates buttons to toggle between performance and exercises */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, activeScreen === 'PerformanceOverview' && styles.activeButton]}
          onPress={() => setActiveScreen('PerformanceOverview')}
        >
          <Text style={styles.toggleText}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, activeScreen === 'ExerciseInsights' && styles.activeButton]}
          onPress={() => setActiveScreen('ExerciseInsights')}
        >
          <Text style={styles.toggleText}>Exercises</Text>
        </TouchableOpacity>
      </View>

      {/* Renders active analytics screen based on selection */}
      {activeScreen === 'PerformanceOverview' ? (
        <PerformanceOverview athleteId={athleteId} />
      ) : (
        <ExerciseInsights athleteId={athleteId} />
      )}
    </ScrollView>
  );
};

export default AnalyticsScreen;