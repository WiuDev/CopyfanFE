import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';
import {PickerContainer} from '../../screens/Send/styles'

/**
 * 
 * @param {string} selectedCourseId - O ID do curso atualmente selecionado (state do pai).
 * @param {function} onCourseChange - Função para atualizar o ID do curso no componente pai.
 */

export default function CoursePicker({ selectedCourseId, onCourseChange }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await api.get('/courses'); 
        const fetchedCourses = response.data || [];
        setCourses(fetchedCourses);
        
        if (fetchedCourses.length > 0 && !selectedCourseId) {
          onCourseChange(fetchedCourses[0].id);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar a lista de cursos.');
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, [selectedCourseId, onCourseChange]);

  if (loading) {
    return (
      <PickerContainer style={{ justifyContent: 'center' }}>
        <ActivityIndicator size="small" color="#007AFF" />
      </PickerContainer>
    );
  }
  
  if (courses.length === 0) {
      return <Text style={{ color: '#E74C3C' }}>Nenhum curso cadastrado.</Text>;
  }


  return (
    <PickerContainer>
      <Picker
        selectedValue={selectedCourseId}
        onValueChange={onCourseChange}
        mode="dropdown"
      >
        {courses.map((course) => (
          <Picker.Item key={course.id} label={course.title} value={course.id} /> 
        ))}
      </Picker>
    </PickerContainer>
  );
}