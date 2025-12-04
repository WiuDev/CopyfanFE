import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, ActivityIndicator } from 'react-native';
import { SectionTitle, ContentArea, BackGround } from './styles';
import OrdersListItem from '../../components/OrderListItem';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';

export default function AdminAllOrders() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [ordersList, setOrdersList] = useState([]);

  const isAdmin = user?.role === 'admin';

  const fetchData = useCallback(async () => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get('/orders');
      setOrdersList(response.data);
    } catch (error) {
      console.error('Error fetching admin orders:', error);
      setOrdersList([]);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );
  const handleItemPress = item => {
    navigation.navigate('OrderDetail', { id: item.id });
  };
  if (!isAdmin) {
    return (
      <CenteredView>
        <Text style={{ color: '#E74C3C', fontSize: 18 }}>
          Acesso Negado. Você não é um administrador.
        </Text>
      </CenteredView>
    );
  }

  return (
    <BackGround>
      <ContentArea showsVerticalScrollIndicator={false}>
        <SectionTitle>Todos os Pedidos</SectionTitle>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={ordersList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <OrdersListItem
                item={item}
                onPress={() => handleItemPress(item)}
              />
            )}
            scrollEnabled={false}
          />
        )}
      </ContentArea>
    </BackGround>
  );
}
