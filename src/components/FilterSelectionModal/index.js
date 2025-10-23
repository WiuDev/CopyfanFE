import React, { useState, useEffect } from 'react';
import { Modal, FlatList, View, ActivityIndicator } from 'react-native'; // 💡 Adicionar ActivityIndicator
import api from '../../services/api'; // 💡 Adicionar api para buscar cursos
// 🚨 REMOVER: import CoursePicker from '../CoursePicker';
import {
  ModalContainer,
  Header,
  Title,
  OptionItem,
  OptionText,
  CloseButton,
  CloseButtonText,
} from './styles';

const PERIODS = [
  { id: '1', label: '1º Semestre', value: '1º Semestre' },
  { id: '2', label: '2º Semestre', value: '2º Semestre' },
  { id: '3', label: '3º Semestre', value: '3º Semestre' },
  { id: '4', label: '4º Semestre', value: '4º Semestre' },
  { id: '5', label: '5º Semestre', value: '5º Semestre' },
  { id: '6', label: '6º Semestre', value: '6º Semestre' },
  { id: '7', label: '7º Semestre', value: '7º Semestre' },
  { id: '8', label: '8 Semestre', value: '8º Semestre' },
  { id: '9', label: '9º Semestre', value: '9º Semestre' },
  { id: '10', label: '10º Semestre', value: '10º Semestre' },
  { id: '0', label: 'Todos os Períodos', value: null },
];

export default function FilterSelectionModal({
  isVisible,
  type,
  onClose,
  onSelect,
}) {
  const isCourseMode = type === 'course';
  const modalTitle = isCourseMode ? 'Filtrar por Curso' : 'Filtrar por Período';

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  useEffect(() => {
    if (isVisible && type === 'course' && courses.length === 0) {
      async function fetchCourses() {
        setLoadingCourses(true);
        try {
          const response = await api.get('/courses');
          setCourses(response.data);
        } catch (error) {
          console.error('Erro ao buscar cursos no modal:', error);
        } finally {
          setLoadingCourses(false);
        }
      }
      fetchCourses();
    }
  }, [isVisible, type]);

  const handlePeriodSelect = value => {
    onSelect('classPeriod', value);
    onClose();
  };

  const handleCourseSelect = (id, title) => {
    onSelect('courseId', id, title);
    onClose();
  };

  const renderPeriodList = () => (
    <View style={{ flex: 1 }}>
      <FlatList
        data={PERIODS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <OptionItem onPress={() => handlePeriodSelect(item.value)}>
            <OptionText>{item.label}</OptionText>
          </OptionItem>
        )}
      />
    </View>
  );

  const renderCourseList = () => {
    if (loadingCourses) {
      return (
        <ActivityIndicator
          size="large"
          color="#FF9C55"
          style={{ padding: 30 }}
        />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={courses}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <OptionItem onPress={() => handleCourseSelect(item.id, item.title)}>
              <OptionText>{item.title || item.name}</OptionText>
            </OptionItem>
          )}
          ListHeaderComponent={() => (
            <OptionItem onPress={() => handleCourseSelect(null, 'Todos os Cursos')}>
              <OptionText style={{ fontWeight: 'bold' }}>
                Todos os Cursos
              </OptionText>
            </OptionItem>
          )}
          stickyHeaderIndices={[0]}
        />
      </View>
    );
  };

  // ----------------------------------------------------

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <ModalContainer>
        <Header>
          <Title>{modalTitle}</Title>
          <CloseButton onPress={onClose}>
            <CloseButtonText>Fechar</CloseButtonText>
          </CloseButton>
        </Header>
        {isCourseMode ? renderCourseList() : renderPeriodList()}
      </ModalContainer>
    </Modal>
  );
}
