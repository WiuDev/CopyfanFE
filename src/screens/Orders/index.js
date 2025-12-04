import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, ActivityIndicator } from 'react-native';
import { SectionTitle, ContentArea, BackGround } from './styles';
import OrdersListItem from '../../components/OrderListItem';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';

export default function OrdersScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [ordersList, setOrdersList] = useState([]);

  const fetchData = useCallback(async () => {
        if (!user?.id) { 
            return; 
        }
        setLoading(true);
        try {
            const response = await api.get('/orders/me');
            setOrdersList(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );
    
    useEffect(() => {
        if (user) { 
             fetchData();
        }
    }, [user, fetchData]);

  const handleItemPress = item => {
    navigation.navigate('OrderDetail', { id: item.id });
  };

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
