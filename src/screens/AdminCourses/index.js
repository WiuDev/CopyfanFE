import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import { useFocusEffect } from '@react-navigation/native';
import CourseCreationModal from '../../components/CourseCreationModal';
import {
  Container,
  SectionTitle,
  CenteredView,
  StyledInput,
  CourseListItemContainer,
  CourseItemText,
  DeleteButton,
  DeleteButtonText,
} from './styles';

const CourseListItem = ({ course, onDelete }) => {
  return (
    <CourseListItemContainer>
      <View style={{ flex: 1, marginRight: 10 }}>
        <CourseItemText style={{ fontWeight: 'bold', fontSize: 16 }}>
          {course.title}
        </CourseItemText>
        <CourseItemText style={{ fontSize: 13, color: '#777', marginTop: 3 }}>
          {course.degree} | {course.modality}
        </CourseItemText>
      </View>

      <DeleteButton onPress={() => onDelete(course.id, course.title)}>
        <DeleteButtonText>Deletar</DeleteButtonText>
      </DeleteButton>
    </CourseListItemContainer>
  );
};

export default function AdminCourses() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreationModalVisible, setIsCreationModalVisible] = useState(false);

  const isAdminOrProfessor =
    user?.role === 'admin' || user?.role === 'professor';

  const fetchCourses = useCallback(async (search = '') => {
    setLoading(true);
    try {
      const response = await api.get(`/courses/admin/?search=${search}`);
      console.log('Cursos buscados:', response.data);
      setCourses(response.data);
    } catch (error) {
      Alert.alert(
        'Erro',
        error.response?.data?.error || 'Falha ao buscar a lista de cursos.',
      );
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (isAdminOrProfessor) {
        fetchCourses(searchTerm);
      }
    }, [isAdminOrProfessor, searchTerm, fetchCourses]),
  );

  const handleCreateCourse = async courseData => {
    try {
      await api.post('/courses', courseData);
      Alert.alert('Sucesso', `Curso "${courseData.title}" criado.`);
      fetchCourses(''); // Recarrega a lista
      setIsCreationModalVisible(false); // Fecha o modal
    } catch (error) {
      Alert.alert(
        'Erro',
        error.response?.data?.error || 'Falha ao criar o curso.',
      );
    }
  };

  const handleDeleteCourse = (courseId, courseName) => {
    Alert.alert(
      'Confirmar Deleção',
      `Tem certeza que deseja deletar o curso "${courseName}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          onPress: async () => {
            try {
              await api.delete(`/courses/${courseId}`);
              Alert.alert('Sucesso', `Curso "${courseName}" deletado.`);
              fetchCourses(searchTerm); // Recarrega a lista
            } catch (error) {
              Alert.alert(
                'Erro',
                error.response?.data?.error || 'Falha ao deletar o curso.',
              );
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  if (!isAdminOrProfessor) {
    return (
      <CenteredView>
        <Text style={{ color: '#E74C3C', fontSize: 18 }}>
          Acesso Negado. Você não tem permissão de administrador/professor.
        </Text>
      </CenteredView>
    );
  }

  if (loading && courses.length === 0) {
    return (
      <CenteredView>
        <ActivityIndicator size="large" color="#5D82FB" />
      </CenteredView>
    );
  }

  return (
    <Container>
      <SectionTitle>Gerenciamento de Cursos</SectionTitle>

      <StyledInput
        placeholder="Buscar por nome do curso..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={{ marginBottom: 20 }}
      />

      <TouchableOpacity
        onPress={() => setIsCreationModalVisible(true)}
        style={{
          backgroundColor: '#2ECC71',
          padding: 12,
          borderRadius: 5,
          marginBottom: 20,
        }}
      >
        <Text
          style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}
        >
          + CRIAR NOVO CURSO
        </Text>
      </TouchableOpacity>

      <FlatList
        data={courses}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <CourseListItem course={item} onDelete={handleDeleteCourse} />
        )}
        refreshing={loading}
        onRefresh={() => fetchCourses('')}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#777', marginTop: 20 }}>
            {searchTerm
              ? 'Nenhum curso encontrado.'
              : 'Nenhum curso cadastrado.'}
          </Text>
        }
      />

      <CourseCreationModal
        isVisible={isCreationModalVisible}
        onClose={() => setIsCreationModalVisible(false)}
        onCreate={handleCreateCourse}
      />
    </Container>
  );
}
