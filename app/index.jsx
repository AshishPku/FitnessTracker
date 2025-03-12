import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const DAILY_DATA = {
  Monday: {
    Exercises: [
      "Running (2 rounds)",
      "Stretching (10 min)",
      "LowerBody Exercises",
      "Plank (2 min) ",
      "Hanging upside down (10 min)",
    ],
  },
  Tuesday: {
    Exercises: [
      "Running (2 rounds)",
      "Stretching (10 min)",
      "Pullup-Pushup",
      "Plank (2 min) ",
      "Hanging upside down (10 min)",
    ],
  },
  Wednesday: {
    Exercises: [
      "Running (2 rounds)",
      "Stretching (10 min)",
      "Core Exercises",
      "Plank (2 min) ",
      "Hanging upside down (10 min)",
    ],
  },
  Thursday: {
    Exercises: [
      "Running (2 rounds)",
      "Swimming (30 min)",
      "Plank (2 min) ",
      "Hanging upside down (10 min)",
    ],
  },
  Friday: {
    Exercises: ["GYM", "Flexibility", "Hanging upside down (10 min)"],
  },
  Saturday: {
    Exercises: [
      "Long Running (5 rounds)",
      "Light stretching (15 min)",
      "Plank (2 min) ",
      "Hanging upside down (10 min)",
    ],
  },
  Sunday: {
    Exercises: ["Light jogging", "Hanging upside down (10 min)", "Vitamin D"],
  },
};

const SleepTracker = ({
  sleepData,
  setSleepData,
  selectedDay,
  setSelectedDay,
  currentInput,
  setCurrentInput,
}) => {
  const [error, setError] = useState("");

  const updateSleepHours = () => {
    if (selectedDay === null) {
      setError("Please select a day first");
      return;
    }

    const hours = parseFloat(currentInput);

    if (isNaN(hours) || hours < 0 || hours > 24) {
      setError("Please enter a valid number between 0 and 24");
      return;
    }

    const newData = [...sleepData];
    newData[selectedDay].hours = hours;
    setSleepData(newData);
    setCurrentInput("");
    setError("");
  };

  const getBarHeight = (hours) => {
    if (hours === null) return 0;
    return (hours / 24) * 150;
  };

  const getBarColor = (hours) => {
    if (hours === null) return "#e0e0e0";
    if (hours < 6) return "#FF5252";
    if (hours >= 6 && hours < 7) return "#FFC107";
    if (hours >= 7 && hours <= 9) return "#4CAF50";
    return "#FFC107";
  };

  const calculateAverage = () => {
    const validEntries = sleepData.filter((day) => day.hours !== null);
    if (validEntries.length === 0) return 0;
    return (
      validEntries.reduce((total, day) => total + day.hours, 0) /
      validEntries.length
    ).toFixed(1);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">
          Sleep Tracker - Last 7 Days
        </CardTitle>
      </CardHeader>
      <CardContent>
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>
            {selectedDay !== null
              ? `Enter sleep hours for ${sleepData[selectedDay].date}:`
              : "Select a day first"}
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={currentInput}
              onChangeText={setCurrentInput}
              keyboardType="numeric"
              placeholder="Hours of sleep"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={updateSleepHours}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.daySelector}
        >
          {sleepData.map((day, index) => (
            <TouchableOpacity
              key={day.key}
              style={[
                styles.dayButton,
                selectedDay === index && styles.selectedDayButton,
              ]}
              onPress={() => {
                setSelectedDay(index);
                setCurrentInput(day.hours !== null ? day.hours.toString() : "");
                setError("");
              }}
            >
              <Text
                style={[
                  styles.dayButtonText,
                  selectedDay === index && styles.selectedDayButtonText,
                ]}
              >
                {day.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.graphContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.idealSleepLabel}>Ideal (7-9h)</Text>
          <View style={styles.barContainer}>
            {sleepData.map((day) => (
              <View key={day.key} style={styles.barWrapper}>
                <View style={styles.barLabelContainer}>
                  <Text style={styles.barValue}>
                    {day.hours !== null ? day.hours : "-"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.bar,
                    {
                      height: getBarHeight(day.hours),
                      backgroundColor: getBarColor(day.hours),
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{day.date.split(" ")[0]}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{calculateAverage()}</Text>
            <Text style={styles.statLabel}>Avg Hours</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {sleepData.filter((day) => day.hours !== null).length}
            </Text>
            <Text style={styles.statLabel}>Days Tracked</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {
                sleepData.filter(
                  (day) =>
                    day.hours !== null && day.hours >= 7 && day.hours <= 9
                ).length
              }
            </Text>
            <Text style={styles.statLabel}>Ideal Days</Text>
          </View>
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#FF5252" }]}
            />
            <Text style={styles.legendText}>Less than 6h</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#FFC107" }]}
            />
            <Text style={styles.legendText}>6-7h / Over 9h</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#4CAF50" }]}
            />
            <Text style={styles.legendText}>7-9h (Ideal)</Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
};

const DailyPlanPage = () => {
  const days = Object.keys(DAILY_DATA);

  const getCurrentDay = () => {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return dayNames[new Date().getDay()];
  };

  const getPast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push({
        date: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        key: i,
        hours: null,
      });
    }
    return dates;
  };

  const [currentDay] = useState(getCurrentDay());
  const [completedExercises, setCompletedExercises] = useState({});
  const [sleepData, setSleepData] = useState(getPast7Days());
  const [currentInput, setCurrentInput] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const initialStatus = {};
    DAILY_DATA[currentDay].Exercises.forEach((_, index) => {
      initialStatus[index] = false;
    });
    setCompletedExercises(initialStatus);
  }, [currentDay]);

  const toggleExerciseStatus = (index) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const calculateProgress = () => {
    const totalExercises = DAILY_DATA[currentDay].Exercises.length;
    if (totalExercises === 0) return 0;
    const completedCount = Object.values(completedExercises).filter(
      (status) => status
    ).length;
    return (completedCount / totalExercises) * 100;
  };

  const renderSection = (title, items) => {
    if (!items || items.length === 0) {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.emptyText}>
            No {title.toLowerCase()} planned for this day.
          </Text>
        </View>
      );
    }

    if (title === "Exercises") {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.exerciseContainer}>
              <View style={styles.exerciseInfo}>
                <Text
                  style={[
                    styles.itemText,
                    completedExercises[index] && styles.completedExerciseText,
                  ]}
                >
                  {item}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    completedExercises[index]
                      ? styles.completedButton
                      : styles.notCompletedButton,
                  ]}
                  onPress={() => toggleExerciseStatus(index)}
                >
                  <Text style={styles.buttonText}>
                    {completedExercises[index] ? "Completed" : "Not Done"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
    );
  };

  const handleDayPress = (day) => {
    if (day !== currentDay) {
      Alert.alert(
        "Access Restricted",
        "You can only view today's plan. Plans for other days are locked.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Fitness Plan</Text>
      </View>

      <View style={styles.daySelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {days.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayButton,
                day === currentDay
                  ? styles.selectedDayButton
                  : styles.lockedDayButton,
              ]}
              onPress={() => handleDayPress(day)}
            >
              <Text
                style={[
                  styles.dayButtonText,
                  day === currentDay
                    ? styles.selectedDayButtonText
                    : styles.lockedDayButtonText,
                ]}
              >
                {day}
              </Text>
              {day !== currentDay && (
                <View style={styles.lockIconContainer}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Today's Progress</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { width: `${calculateProgress()}%` }]}
          />
        </View>
        <Text style={styles.progressText}>{`${Math.round(
          calculateProgress()
        )}% Complete`}</Text>
      </View>

      <ScrollView style={styles.content}>
        {renderSection("Exercises", DAILY_DATA[currentDay].Exercises)}
        {renderSection("Diet", DAILY_DATA[currentDay].Diet)}
        <SleepTracker
          sleepData={sleepData}
          setSleepData={setSleepData}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          currentInput={currentInput}
          setCurrentInput={setCurrentInput}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DailyPlanPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#4a90e2",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  daySelector: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 20,
  },
  dayButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 5,
    backgroundColor: "#f1f3f5",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedDayButton: {
    backgroundColor: "#4a90e2",
  },
  lockedDayButton: {
    backgroundColor: "#e0e0e0",
  },
  dayButtonText: {
    fontSize: 14,
    color: "#333",
  },
  selectedDayButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  lockedDayButtonText: {
    color: "#888",
  },
  lockIconContainer: {
    marginLeft: 5,
  },
  lockIcon: {
    fontSize: 12,
  },
  dateDisplay: {
    paddingTop: 15,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  progressContainer: {
    padding: 5,
    alignItems: "center",
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  progressBarContainer: {
    width: "100%",
    height: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    padding: 15,
  },
  sectionContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  exerciseContainer: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    alignItems: "center",
  },
  exerciseInfo: {
    flex: 1,
  },
  buttonContainer: {
    marginLeft: 10,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  completedButton: {
    backgroundColor: "#4CAF50",
  },
  notCompletedButton: {
    backgroundColor: "#FF5722",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  itemContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: "#444",
  },
  completedExerciseText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  saveButton: {
    marginLeft: 10,
    backgroundColor: "#4a90e2",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "500",
  },
  errorText: {
    color: "#FF5252",
    marginTop: 5,
  },
  graphContainer: {
    height: 220,
    marginBottom: 20,
    position: "relative",
  },
  horizontalLine: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    borderStyle: "dashed",
  },
  idealSleepLabel: {
    position: "absolute",
    right: 0,
    top: 45,
    fontSize: 12,
    color: "#666",
  },
  barContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: "100%",
    paddingTop: 10,
  },
  barWrapper: {
    alignItems: "center",
    width: 40,
  },
  barLabelContainer: {
    marginBottom: 5,
  },
  barValue: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  bar: {
    width: 20,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  barLabel: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingVertical: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});
