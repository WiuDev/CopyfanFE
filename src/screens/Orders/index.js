import React, { useEffect, useState } from 'react';
import { BackGround } from './styles';
import { useNavigation } from '@react-navigation/native';
import { FlatList, ActivityIndicator } from 'react-native';
import { SectionTitle, ContentArea } from './styles';
import OrdersListItem from '../../components/OrderListItem';
import api from '../../services/api';

export default function OrdersScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get('/orders/me');
        setOrdersList(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <BackGround>
      <ContentArea showsVerticalScrollIndicator={false}>
        <SectionTitle>Meus Pedidos</SectionTitle>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={ordersList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <OrdersListItem
                item={item}
                onPress={() => navigation.navigate('OrderDetail', { id: item.id })}
              />
            )}
            scrollEnabled={false}
          />
        )}
      </ContentArea>
    </BackGround>
  );
}
