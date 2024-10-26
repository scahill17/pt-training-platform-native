import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchWorkoutTrends } from '../api/api';
import styles from '../styles/PerformanceOverview.style';

const screenWidth = Dimensions.get('window').width;
const chartHeight = 220;

const PerformanceOverview = ({ athleteId }) => {
  const [workoutTrends, setWorkoutTrends] = useState([]);
  const [selectedStat, setSelectedStat] = useState('average_weight');
  const [cumulativeStats, setCumulativeStats] = useState({ totalWeight: 0, averageWeight: 0, averageReps: 0, totalWorkouts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrends = async () => {
      try {
        const trends = await fetchWorkoutTrends(athleteId, 'weekly');
        const recentTrends = trends.slice(-7); // Only keep the most recent entries
        setWorkoutTrends(recentTrends);

        // Calculate cumulative stats
        const totalWeight = trends.reduce((sum, trend) => sum + trend.total_weight, 0);
        const averageWeight = Math.round(trends.reduce((sum, trend) => sum + trend.average_weight, 0) / trends.length);
        const averageReps = Math.round(trends.reduce((sum, trend) => sum + trend.average_reps, 0) / trends.length);
        const totalWorkouts = trends.reduce((sum, trend) => sum + trend.total_workouts, 0);

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
  }, [athleteId]);

  const handleStatChange = (stat) => {
    setSelectedStat(stat);
  };

  const formattedData = {
    labels: workoutTrends.map(trend =>
      new Date(trend.trend_period).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })
    ),
    datasets: [
      {
        data: workoutTrends.map(trend => Math.round(trend[selectedStat])),
        color: () => `#F2AE30`, // Set to orange for all graph types
        strokeWidth: 2,
      },
    ],
    legend: [selectedStat === 'total_weight' ? 'Total Weight Lifted Per Week' : selectedStat === 'average_weight' ? 'Average Weight Lifted Per Week' : 'Average Reps Completed Per Week'],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Performance Overview</Text>

      {/* Cumulative Stats Section */}
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

      {/* Graph Section */}
      {loading ? (
        <Text>Loading workout trends...</Text>
      ) : (
        <View style={styles.chartContainer}>
          <LineChart
            data={formattedData}
            width={screenWidth - 40}
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

      {/* Stat Type Selector */}
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
