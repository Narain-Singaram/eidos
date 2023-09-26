import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';

export default function App() {
  const [courses, setCourses] = useState([]); // Array to store course data
  const [courseName, setCourseName] = useState(''); // Course name input
  const [grade, setGrade] = useState(''); // Grade input
  const [credits, setCredits] = useState(''); // Credits input
  const [courseType, setCourseType] = useState(''); //a Course type input
  const [gpa, setGPA] = useState(0); // GPA calculated based on course data
  const [error, setError] = useState('');

  // Function to add a course to the list
  const addCourse = () => {
    if (!courseName || !grade || !credits || !courseType) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    const course = { courseName, grade, credits, courseType };
    setCourses([...courses, course]);
    setCourseName('');
    setGrade('');
    setCredits('');
    setCourseType('');
  };

  // Function to calculate GPA
  const calculateGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach((course) => {
      const courseGrade = parseFloat(course.grade);
      const courseCredits = parseFloat(course.credits);

      if (!isNaN(courseGrade) && !isNaN(courseCredits)) {
        totalCredits += courseCredits;
        totalPoints += courseCredits * courseGrade;
      }
    });

    if (totalCredits > 0) {
      const calculatedGPA = totalPoints / totalCredits;
      setGPA(calculatedGPA.toFixed(2)); // Round GPA to 2 decimal places
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eidos GPA Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Course Name"
        value={courseName}
        onChangeText={(text) => setCourseName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="What Grade was course"
        value={grade}
        onChangeText={(text) => setGrade(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Credits"
        value={credits}
        onChangeText={(text) => setCredits(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Course Type (e.g., AP, Honors, On-Level, IB)"
        value={courseType}
        onChangeText={(text) => setCourseType(text)}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={addCourse}>
        <Text style={styles.buttonText}>Add Course</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={calculateGPA}>
        <Text style={styles.buttonText}>Calculate GPA</Text>
      </TouchableOpacity>
      {gpa > 0 ? <Text style={styles.result}>Your GPA: {gpa}</Text> : null}
      <Text style={styles.subtitle}>Submitted Courses:</Text>
      <FlatList
        data={courses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.courseItem}>
            <Text>{index + 1}. Course: {item.courseName}</Text>
            <Text>Grade: {item.grade}</Text>
            <Text>Credits: {item.credits}</Text>
            <Text>Type: {item.courseType}</Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 60,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#191D88',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#191D88',
    paddingVertical: 14,
    borderRadius: 50,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#007acc',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#191D88',
    textAlign: 'center',
  },
  courseItem: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginVertical: 8,
    width: '100%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
