import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackGround, SectionTitle, QuickNavArea, ContentArea } from './styles';
import MaterialListItem from '../../components/MaterialListItem';
import IconLink from '../../components/IconLink';
import api from '../../services/api';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [materialsList, setMaterialsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get('/materials');
        setMaterialsList(response.data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const quickNavigationData = [
    { id: '1', name: 'Enviar', icon: 'upload', screen: 'SendMaterialScreen' },
    { id: '2', name: 'Listas', icon: 'book-open', screen: 'Lists' },
  ];

  return (
    <BackGround>
      <ContentArea showsVerticalScrollIndicator={false}>
        <SectionTitle>Acesso Rápido</SectionTitle>
        <QuickNavArea>
          {quickNavigationData.map(item => (
            <IconLink
              key={item.id}
              iconName={item.icon}
              label={item.name}
              onPress={() => navigation.navigate(item.screen)}
            />
          ))}
        </QuickNavArea>

        <SectionTitle>Materiais Disponíveis</SectionTitle>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={materialsList}
            keyExtractor={item => item.id}
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
            scrollEnabled={false}
          />
        )}
      </ContentArea>
    </BackGround>
  );
}
