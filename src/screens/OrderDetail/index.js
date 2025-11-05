import React, { useState, useEffect, useContext } from 'react';
import { View, Alert, Linking, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import {
  Container,
  ScrollContainer,
  DetailCard,
  Title,
  DetailRow,
  DetailLabel,
  DetailValue,
  StatusText,
  PayButton,
  PayButtonText,
  CenteredView,
} from './styles';

export default function OrderDetailScreen() {
  const route = useRoute();
  const { user } = useContext(AuthContext);
  const orderId = route.params?.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        Alert.alert('Erro', 'ID do pedido não encontrado.');
        return;
      }
      try {
        const response = await api.get(`/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error(`Erro ao buscar pedido ${orderId}:`, error);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do pedido.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleInitiatePayment = async () => {
    if (!order) return;

    const totalValueForCheckout = order.payment?.totalValue || order.totalValue;

    const isWaitingForPayment = order.status === 'waiting_payment';

    if (!isWaitingForPayment) {
      Alert.alert(
        'Atenção',
        `O pedido já está em status ${order.status.toUpperCase()}.`,
      );
      return;
    }

    setLoadingPayment(true);
    try {
      const checkoutData = {
        orderId: order.id,
        totalValue: totalValueForCheckout,
        description: `Pagamento do Pedido #${order.id.substring(0, 8)}`,
        userEmail: 'TESTUSER1039688960975491054@testuser.com',
        userName: user.name,
      };
      console.log('Iniciando checkout com dados:', checkoutData);

      const checkoutResponse = await api.post('/checkout/create', checkoutData);

      if (checkoutResponse.data.paymentUrl) {
        Linking.openURL(checkoutResponse.data.paymentUrl);
      } else {
        throw new Error('Link de pagamento não retornado.');
      }
    } catch (error) {
      console.error('Erro ao iniciar pagamento:', error);
      Alert.alert(
        'Erro no Pagamento',
        'Falha ao gerar o link do Mercado Pago.',
      );
    } finally {
      setLoadingPayment(false);
    }
  };

  if (loading) {
    return (
      <CenteredView>
        <ActivityIndicator size="large" color="#FF9C55" />
      </CenteredView>
    );
  }

  if (!order) {
    return (
      <CenteredView>
        <DetailLabel>Pedido não encontrado.</DetailLabel>
      </CenteredView>
    );
  }
  const rawValue = order.payment?.totalValue || order.totalValue || 0;

  const formattedValue = Number(rawValue).toFixed(2).replace('.', ',');
  const isPending = order.status === 'waiting_payment';

  const displayStatus = order.status.replace('_', ' ').toUpperCase();

  return (
    <Container>
      <ScrollContainer>
        <Title>Detalhes do Pedido</Title>

        <DetailCard>
          <DetailRow>
            <DetailLabel>ID do Pedido:</DetailLabel>
            <DetailValue>{order.id.substring(0, 8)}...</DetailValue>
          </DetailRow>

          <DetailRow>
            <DetailLabel>Status:</DetailLabel>
            <StatusText isPending={isPending}>{displayStatus}</StatusText>
          </DetailRow>

          <DetailRow style={{ borderBottomWidth: 0, marginTop: 15 }}>
            <DetailLabel style={{ fontWeight: 'bold' }}>
              VALOR TOTAL:
            </DetailLabel>
            <DetailValue style={{ fontWeight: 'bold', fontSize: 18 }}>
              R$ {formattedValue}
            </DetailValue>
          </DetailRow>
        </DetailCard>

        {isPending && (
          <PayButton onPress={handleInitiatePayment} disabled={loadingPayment}>
            {loadingPayment ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <PayButtonText>Pagar R$ {formattedValue}</PayButtonText>
            )}
          </PayButton>
        )}
      </ScrollContainer>
    </Container>
  );
}
