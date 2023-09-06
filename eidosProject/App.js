import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';

export default function App() {
  const [courses, setCourses] = useState([]); // Array to store course data
  const [courseName, setCourseName] = useState(''); // Course name input
  const [grade, setGrade] = useState(''); // Grade input
  const [credits, setCredits] = useState(''); // Credits input
  const [courseType, setCourseType] = useState(''); // Course type input
  const [gpa, setGPA] = useState(0); // GPA calculated based on course data
  const [error, setError] = useState('');

  // Portfolio section
  const [satScore, setSatScore] = useState(''); // SAT score input
  const [extracurriculars, setExtracurriculars] = useState(''); // Extracurriculars input
  const [leadershipRoles, setLeadershipRoles] = useState(''); // Leadership roles input
  const [volunteerHours, setVolunteerHours] = useState(''); // Volunteer hours input

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Eidos GPA Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Course Name"
        value={courseName}
        onChangeText={(text) => setCourseName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Grade (e.g., 4.0)"
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

      {/* Portfolio Section */}
      <Text style={styles.subtitle}>Portfolio</Text>
      <TextInput
        style={styles.input}
        placeholder="SAT Score"
        value={satScore}
        onChangeText={(text) => setSatScore(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Extracurriculars"
        value={extracurriculars}
        onChangeText={(text) => setExtracurriculars(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Leadership Roles"
        value={leadershipRoles}
        onChangeText={(text) => setLeadershipRoles(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Volunteer Hours"
        value={volunteerHours}
        onChangeText={(text) => setVolunteerHours(text)}
      />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd', // Original background color
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#191D88', // Original title color
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    padding: 12,
    borderRadius: 5, // Original rounded corners
    backgroundColor: 'white', // Original input background color
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007acc', // Original button color
    paddingVertical: 14,
    paddingHorizontal: 20, // Adjust the horizontal padding as needed
    borderRadius: 50, // Increased border radius
    marginVertical: 10,
    width: '100%', // Make the button take up the full width
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#191D88', // Original result color
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#191D88', // Original subtitle color
    textAlign: 'center',
  },
});
