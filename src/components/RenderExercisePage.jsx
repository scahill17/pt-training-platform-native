import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WorkoutTable from '../components/WorkoutTable';
import styles from '../styles/RenderExercisePage.style';
import { useNavigation } from '@react-navigation/native';

export default function RenderExercisePage({ exercise, currentIndex, totalExercises, exercises, setExercises }) {
  const [completedSets, setCompletedSets] = useState(new Array(exercise.sets).fill(false));
  const navigation = useNavigation();

  const toggleCheckBox = (index) => {
    const updatedCompletedSets = [...completedSets];
    updatedCompletedSets[index] = !updatedCompletedSets[index];
    setCompletedSets(updatedCompletedSets);
  };

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
        index={currentIndex}
        setExercises={setExercises}
        exercises={exercises}
      />
    </View>
  );
}