import React, { useEffect, useState, useContext } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackGround, SectionTitle, QuickNavArea, ContentArea } from './styles';
import MaterialListItem from '../../components/MaterialListItem';
import EmptyState from '../../components/EmptyState';
import IconLink from '../../components/IconLink';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [materialsList, setMaterialsList] = useState([]);
  const fetchData = async () => {
    if (!user?.id) {
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/materials?ownerId=${user.id}`);
      setMaterialsList(response.data);
    } catch (error) {
      console.log('Erro ao buscar materiais: ' + error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const quickNavigationData = [
    { id: '1', name: 'Enviar', icon: 'upload', screen: 'SendMaterialScreen' },
    { id: '2', name: 'Listas', icon: 'book-open', screen: 'ListsScreen' },
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

        <SectionTitle>Meus Materiais Enviados</SectionTitle>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : materialsList.length === 0 ? (
          <EmptyState
            onSend={() => navigation.navigate('SendMaterialScreen')}
          />
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
