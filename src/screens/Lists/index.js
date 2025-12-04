import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import api from '../../services/api';
import MaterialListItem from '../../components/MaterialListItem';
import FilterSelectionModal from '../../components/FilterSelectionModal';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  Container,
  FilterArea,
  FilterTitle,
  SearchInput,
  FilterRow,
  FilterSelectButton,
  FilterButtonText,
  ListContainer,
} from './styles';

export default function ListsScreen() {
  const navigation = useNavigation();
  const [publicLists, setPublicLists] = useState([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedCourseName, setSelectedCourseName] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    courseId: null,
    classPeriod: null,
  });

  const fetchPublicLists = useCallback(async () => {
    setLoadingLists(true);
    try {
      let url = '/materials?role=professor&is_visible=true';
      if (filters.search) {
        url += `&name=${encodeURIComponent(filters.search)}`;
      }
      if (filters.courseId) {
        url += `&course_id=${filters.courseId}`;
      }
      if (filters.classPeriod) {
        url += `&classPeriod=${filters.classPeriod}`;
      }

      const response = await api.get(url);
      setPublicLists(response.data);
    } catch (error) {
      console.error('Erro ao carregar listas públicas:', error);
    } finally {
      setLoadingLists(false);
    }
  }, [filters]);

  useFocusEffect(
    useCallback(() => {
      fetchPublicLists();
    }, [fetchPublicLists]),
  );

  const handleSearchChange = text => {
    setFilters(prev => ({ ...prev, search: text }));
  };
  const handleOpenCourseModal = () => {
    setModalType('course');
    setIsModalVisible(true);
  };

  const handleOpenPeriodModal = () => {
    setModalType('period');
    setIsModalVisible(true);
  };

  const handleSelection = (key, value, displayValue) => {
    setFilters(prev => ({ ...prev, [key]: value }));

    if (key === 'courseId') {
      setSelectedCourseName(displayValue);
    }

    if (loadingLists) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#FF9C55" />
        </View>
      );
    }
  };
  return (
    <Container>
      <FilterArea>
        <FilterTitle>Buscar Lista</FilterTitle>
        <SearchInput
          placeholder="Nome da lista ou professor"
          onChangeText={handleSearchChange}
          value={filters.search}
        />

        <FilterRow>
          <FilterSelectButton onPress={handleOpenCourseModal}>
            <FilterButtonText>
              {filters.courseId
                ? `Curso: ${selectedCourseName}`
                : 'Filtrar por Curso'}
            </FilterButtonText>
          </FilterSelectButton>
          <FilterSelectButton onPress={handleOpenPeriodModal}>
            <FilterButtonText>
              {filters.classPeriod || 'Filtrar por Período'}
            </FilterButtonText>
          </FilterSelectButton>
        </FilterRow>
      </FilterArea>

      <ListContainer>
        {publicLists.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 16, color: '#666' }}>
              Nenhuma lista pública disponível no momento.
            </Text>
          </View>
        ) : (
          <FlatList
            data={publicLists}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <MaterialListItem
                item={item}
                onPress={() =>
                  navigation.navigate('MaterialDetail', {
                    materialId: item.id,
                  })
                }
              />
            )}
          />
        )}
      </ListContainer>
      <FilterSelectionModal
        isVisible={isModalVisible}
        type={modalType}
        onClose={() => setIsModalVisible(false)}
        onSelect={handleSelection}
        selectedCourseId={filters.courseId}
        selectedClassPeriod={filters.classPeriod}
      />
    </Container>
  );
}
