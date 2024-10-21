import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Use Ionicons for custom icons
import WorkoutTable from '../components/WorkoutTable'; // Reuse the workout table component
import styles from '../styles/RenderExercisePage.style'; // Style file
import { useNavigation } from '@react-navigation/native';

export default function RenderExercisePage({ exercise, onAddSet, onRemoveSet, currentIndex, totalExercises }) {
  const [completedSets, setCompletedSets] = useState(
    new Array(exercise.sets).fill(false) // Default state for checkboxes
  );

  const navigation = useNavigation(); // For back button functionality

  const toggleCheckBox = (index) => {
    const updatedCompletedSets = [...completedSets];
    updatedCompletedSets[index] = !updatedCompletedSets[index]; // Toggle the checkbox
    setCompletedSets(updatedCompletedSets);
  };

  // Generate the dots for the page indicator
  const renderPageIndicator = () => {
    let dots = [];
    for (let i = 0; i < totalExercises; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            i === currentIndex ? styles.activeDot : styles.inactiveDot, // Larger and colored for active dot
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

      {/* Page indicator (Dots) */}
      {renderPageIndicator()}

      {/* Exercise title */}
      <Text style={styles.title}>{exercise.name}</Text>

      {/* Exercise instructions */}
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
        onAddSet={onAddSet}
        onRemoveSet={onRemoveSet}
      />
    </View>
  );
}