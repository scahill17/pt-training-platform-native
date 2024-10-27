import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WorkoutTable from '../components/WorkoutTable';
import styles from '../styles/RenderExercisePage.style';
import { useNavigation } from '@react-navigation/native';

/**
 * RenderExercisePage component for displaying a specific exercise with tracking for completed sets.
 * @param {Object} props - Component props.
 * @param {Object} props.exercise - Exercise data object.
 * @param {number} props.currentIndex - Index of the current exercise.
 * @param {number} props.totalExercises - Total number of exercises in the session.
 * @param {Array} props.exercises - List of all exercises.
 * @param {Function} props.setExercises - Function to update exercises.
 * @returns {JSX.Element} - Rendered exercise page.
 */
function RenderExercisePage({ exercise, currentIndex, totalExercises, exercises, setExercises }) {
  const [completedSets, setCompletedSets] = useState(new Array(exercise.sets).fill(false));
  const navigation = useNavigation();

  /**
   * Toggles completion status of a specific set.
   * @param {number} index - Index of the set to toggle.
   */
  const toggleCheckBox = (index) => {
    const updatedCompletedSets = [...completedSets];
    updatedCompletedSets[index] = !updatedCompletedSets[index];
    setCompletedSets(updatedCompletedSets);
  };

  /**
   * Renders navigation dots indicating the current exercise page.
   * @returns {JSX.Element} - Page indicator with dots.
   */
  const renderPageIndicator = () => {
    let dots = [];
    for (let i = 0; i < totalExercises; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            i === currentIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      );
    }
    return <View style={styles.dotsContainer}>{dots}</View>;
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color="black" />
      </TouchableOpacity>

      {/* Page indicator */}
      {renderPageIndicator()}

      <Text style={styles.title}>{exercise.name}</Text>
      {exercise.instructions ? (
        <Text style={styles.instructions}>{exercise.instructions}</Text>
      ) : (
        <Text style={styles.instructions}>No instructions available.</Text>
      )}

      {/* Workout Table */}
      <WorkoutTable
        exercise={exercise}
        showCheckBox={true}
        completedSets={completedSets}
        toggleCheckBox={toggleCheckBox}
        index={currentIndex}
        setExercises={setExercises}
        exercises={exercises}
      />
    </View>
  );
}

export default RenderExercisePage;