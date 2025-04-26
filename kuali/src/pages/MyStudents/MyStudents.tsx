import React from 'react';
import { 
  View,
  Text, 
  ScrollView, 
} from 'react-native';
import styles from './myStudents.styles';

const assignedStudents = [
  { id: 1, name: 'Nombre Estudiante 1', project: 'Investigación 1' },
  { id: 2, name: 'Nombre Estudiante 2', project: 'Investigación 2' },
  { id: 3, name: 'Nombre Estudiante 3', project: 'Investigación 3' },
];

export default function MyStudents(){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estudiantes asignados</Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {assignedStudents.map((student) => (
          <View key={student.id} style={styles.card}>
            <Text style={styles.name}>{student.name}</Text>
            <Text style={styles.project}>{student.project}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}