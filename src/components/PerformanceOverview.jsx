// src/components/Analytics/PerformanceOverview.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchWorkoutTrends } from '../api/api';
import styles from '../styles/PerformanceOverview.style';

const PerformanceOverview = ({ athleteId }) => {
  const [workoutTrends, setWorkoutTrends] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrends = async () => {
      try {
        const trends = await fetchWorkoutTrends(athleteId);
        setWorkoutTrends(trends);
      } catch (error) {
        console.error('Error loading workout trends:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTrends();
  }, [athleteId]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  const filteredTrend = workoutTrends.find((trend) => {
    const trendDate = new Date(trend.trend_period);
    return trendDate <= selectedDate && trendDate >= new Date(selectedDate - 7 * 24 * 60 * 60 * 1000); // Last 7 days
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Performance Overview</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>Select Date: {selectedDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      {loading ? (
        <Text>Loading workout trends...</Text>
      ) : filteredTrend ? (
        <View style={styles.trendData}>
          <Text>Total Weight Lifted: {filteredTrend.total_weight} kg</Text>
          <Text>Average Weight Per Session: {filteredTrend.average_weight} kg</Text>
          <Text>Average Reps Per Session: {filteredTrend.average_reps}</Text>
          <Text>Total Workouts: {filteredTrend.total_workouts}</Text>
        </View>
      ) : (
        <Text style={styles.noDataText}>No trends available.</Text>
      )}
    </View>
  );
};

export default PerformanceOverview;