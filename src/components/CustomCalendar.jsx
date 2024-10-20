import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import styles from "../styles/CustomCalendar.style";

export default function CustomCalendar({ selectedDate, setSelectedDate }) {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeekDates(new Date()));

  // Function to get the current week's dates
  function getCurrentWeekDates(startDate) {
    const startOfWeek = moment(startDate).startOf("isoWeek"); // Monday as start of week
    return Array.from({ length: 7 }, (_, i) =>
      startOfWeek.clone().add(i, "days").format("YYYY-MM-DD")
    );
  }

  // Navigate to the next week
  const nextWeek = () => {
    const newStartDate = moment(currentWeek[0]).add(1, "weeks").toDate();
    setCurrentWeek(getCurrentWeekDates(newStartDate));
  };

  // Navigate to the previous week
  const prevWeek = () => {
    const newStartDate = moment(currentWeek[0]).subtract(1, "weeks").toDate();
    setCurrentWeek(getCurrentWeekDates(newStartDate));
  };

  // Jump to today's date
  const jumpToToday = () => {
    const today = moment().format("YYYY-MM-DD");
    setSelectedDate(today);
    setCurrentWeek(getCurrentWeekDates(today)); // Update current week to today
  };

  // Handle selecting a new date
  const handleDateSelect = (date) => {
    setSelectedDate(date); // Update the selected date in the parent component
  };

  const renderDay = ({ item }) => {
    const isSelected = item === selectedDate;
    return (
      <TouchableOpacity
        style={[styles.dayContainer, isSelected && styles.selectedDay]}
        onPress={() => handleDateSelect(item)}
      >
        <Text style={styles.dayText}>{moment(item).format("ddd")}</Text>
        <Text style={styles.dateText}>{moment(item).format("DD")}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      
      {/* Week Navigation Buttons */}
      <View style={styles.weekNavigation}>
        <TouchableOpacity onPress={prevWeek}>
          <Ionicons name="chevron-back" size={30} color="#F2AE30" />
        </TouchableOpacity>
        <Text style={styles.weekLabel}>
          {moment(currentWeek[0]).format("MMM DD")} - {moment(currentWeek[6]).format("MMM DD")}
        </Text>
        <TouchableOpacity onPress={nextWeek}>
          <Ionicons name="chevron-forward" size={30} color="#F2AE30" />
        </TouchableOpacity>
      </View>

      {/* Weekly Calendar View */}
      <FlatList
        data={currentWeek}
        horizontal
        keyExtractor={(item) => item}
        renderItem={renderDay}
        contentContainerStyle={styles.weekContainer}
        showsHorizontalScrollIndicator={false}
      />

      {/* "Jump to Today" Button */}
      <TouchableOpacity onPress={jumpToToday} style={styles.todayButton}>
        <Text style={styles.todayButtonText}>Jump to Today</Text>
      </TouchableOpacity>
      
    </View>
  );
}
