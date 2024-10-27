import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import styles from "../styles/CustomCalendar.style";

/**
 * CustomCalendar component for displaying and navigating weekly dates.
 * @param {Object} props - Component props.
 * @param {string} props.selectedDate - Currently selected date.
 * @param {function} props.setSelectedDate - Function to update selected date.
 * @returns {JSX.Element} - Rendered CustomCalendar component.
 */
function CustomCalendar({ selectedDate, setSelectedDate }) {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeekDates(new Date()));

  /**
   * Returns an array of dates representing the current week.
   * @param {Date} startDate - Date to calculate the week's start.
   * @returns {Array<string>} - Array of dates formatted as 'YYYY-MM-DD'.
   */
  function getCurrentWeekDates(startDate) {
    const startOfWeek = moment(startDate).startOf("isoWeek"); // Monday as start of week
    return Array.from({ length: 7 }, (_, i) =>
      startOfWeek.clone().add(i, "days").format("YYYY-MM-DD")
    );
  }

  /**
   * Navigates to the next week by updating currentWeek state.
   */
  const nextWeek = () => {
    const newStartDate = moment(currentWeek[0]).add(1, "weeks").toDate();
    setCurrentWeek(getCurrentWeekDates(newStartDate));
  };

  /**
   * Navigates to the previous week by updating currentWeek state.
   */
  const prevWeek = () => {
    const newStartDate = moment(currentWeek[0]).subtract(1, "weeks").toDate();
    setCurrentWeek(getCurrentWeekDates(newStartDate));
  };

  /**
   * Jumps to todays current date in the calendar
   */
  const jumpToToday = () => {
    const today = moment().format("YYYY-MM-DD");
    setSelectedDate(today);
    setCurrentWeek(getCurrentWeekDates(today)); // Update current week to today
  };

  /**
   * Changes the selected date on the calendar to the updated date.
   * @param {Date} date - Date to navigate the calendar to. 
   */
  const handleDateSelect = (date) => {
    setSelectedDate(date); // Update the selected date in the parent component
  };

  /**
   * Renders each day in the week as a selectable date.
   * @param {Object} item - Date item for each day.
   * @returns {JSX.Element} - Rendered day item.
   */
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

export default CustomCalendar;