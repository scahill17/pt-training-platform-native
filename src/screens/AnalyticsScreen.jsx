// src/components/Analytics/AnalyticsScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PerformanceOverview from '../components/PerformanceOverview';
import ExerciseInsights from '../components/ExerciseInsights';
import styles from '../styles/AnalyticsScreen.style';

const AnalyticsScreen = () => {
  const [athleteId, setAthleteId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [activeScreen, setActiveScreen] = useState('PerformanceOverview'); // Toggle for active component

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
      <Text style={styles.title}>Your Analytics</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, activeScreen === 'PerformanceOverview' && styles.activeButton]} 
          onPress={() => setActiveScreen('PerformanceOverview')}
        >
          <Text style={styles.toggleText}>Performance Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, activeScreen === 'ExerciseInsights' && styles.activeButton]} 
          onPress={() => setActiveScreen('ExerciseInsights')}
        >
          <Text style={styles.toggleText}>Exercise Insights</Text>
        </TouchableOpacity>
      </View>

      {activeScreen === 'PerformanceOverview' ? (
        <PerformanceOverview athleteId={athleteId} />
      ) : (
        <ExerciseInsights athleteId={athleteId} />
      )}
    </ScrollView>
  );
};

export default AnalyticsScreen;
