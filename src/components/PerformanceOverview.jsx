import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchWorkoutTrends } from '../api/api';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/PerformanceOverview.style';

const screenWidth = Dimensions.get('window').width;
const chartHeight = 220;

/**
 * PerformanceOverview component for displaying workout trends and cumulative statistics.
 * @param {Object} props - Component props.
 * @param {number} props.athleteId - ID of the athlete.
 * @returns {JSX.Element} - Rendered PerformanceOverview component.
 */
const PerformanceOverview = ({ athleteId }) => {
  const [workoutTrends, setWorkoutTrends] = useState([]);
  const [selectedStat, setSelectedStat] = useState('average_weight');
  const [cumulativeStats, setCumulativeStats] = useState({ totalWeight: 0, averageWeight: 0, averageReps: 0, totalWorkouts: 0 });
  const [loading, setLoading] = useState(true);

  /**
   * Loads workout trends and calculates cumulative stats for the athlete.
   */
  useFocusEffect(
    useCallback(() => {
      const loadTrends = async () => {
        try {
          const trends = await fetchWorkoutTrends(athleteId, 'weekly');
          // Limit to 6 entries for display.
          const recentTrends = trends.slice(-7);
          setWorkoutTrends(recentTrends);

          // Calculate cumulative stats for trend data.
          totalWeight = trends.reduce((sum, trend) => sum + trend.total_weight, 0);
          averageWeight = Math.round(trends.reduce((sum, trend) => sum + trend.average_weight, 0) / trends.length);
          averageReps = Math.round(trends.reduce((sum, trend) => sum + trend.average_reps, 0) / trends.length);
          totalWorkouts = trends.reduce((sum, trend) => sum + trend.total_workouts, 0);

          setCumulativeStats({
            totalWeight,
            averageWeight,
            averageReps,
            totalWorkouts,
          });
        } catch (error) {
          console.error('Error loading workout trends:', error);
        } finally {
          setLoading(false);
        }
      };
      loadTrends();
    }, [athleteId])
  );

  /**
   * Handles stat change for the graph display.
   * @param {String} stat 
   */
  const handleStatChange = (stat) => {
    setSelectedStat(stat);
  };

  /**
   * Data formatted for presentation on the graph depending on selected stat.
   */
  const formattedData = {
    labels: workoutTrends.map(trend =>
      new Date(trend.trend_period).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })
    ),
    datasets: [
      {
        data: workoutTrends.map(trend => Math.round(trend[selectedStat])),
        color: () => `#F2AE30`,
        strokeWidth: 2,
      },
    ],
    legend: [selectedStat === 'total_weight' ? 'Total Weight Lifted Per Week' : selectedStat === 'average_weight' ? 'Average Weight Lifted Per Rep' : 'Average Reps Completed Per Week'],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Performance Overview</Text>

      {/* Stat information in boxes before the graph */}
      <View style={styles.cumulativeStatsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Workouts Done</Text>
          <Text style={styles.statValue}>{cumulativeStats.totalWorkouts}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Average Weight Lifted</Text>
          <Text style={styles.statValue}>{cumulativeStats.averageWeight} kg</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Average Reps Completed</Text>
          <Text style={styles.statValue}>{cumulativeStats.averageReps}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Weight Lifted</Text>
          <Text style={styles.statValue}>{cumulativeStats.totalWeight} kg</Text>
        </View>
      </View>

      {/* Graph component displayed for each main stat type */}
      {loading ? (
        <Text>Loading workout trends...</Text>
      ) : (
        <View style={styles.chartContainer}>
          <LineChart
            data={formattedData}
            width={screenWidth - 80}
            height={chartHeight}
            yAxisSuffix={selectedStat === 'average_reps' ? '' : ' kg'}
            yAxisInterval={1}
            bezier
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={styles.chartStyle}
          />
        </View>
      )}

      <View style={styles.statToggleContainer}>
        <TouchableOpacity
          onPress={() => handleStatChange('average_weight')}
          style={[styles.statButton, selectedStat === 'average_weight' && styles.activeStatButton]}
        >
          <Text style={[styles.statButtonText, selectedStat === 'average_weight' && styles.activeStatButtonText]}>
            Average Weight Lifted
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleStatChange('average_reps')}
          style={[styles.statButton, selectedStat === 'average_reps' && styles.activeStatButton]}
        >
          <Text style={[styles.statButtonText, selectedStat === 'average_reps' && styles.activeStatButtonText]}>
            Average Reps Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleStatChange('total_weight')}
          style={[styles.statButton, selectedStat === 'total_weight' && styles.activeStatButton]}
        >
          <Text style={[styles.statButtonText, selectedStat === 'total_weight' && styles.activeStatButtonText]}>
            Total Weight Lifted
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PerformanceOverview;