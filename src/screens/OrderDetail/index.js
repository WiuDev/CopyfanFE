import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Alert, Linking, ActivityIndicator, TouchableOpacity, Text } from 'react-native';

import { useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';

import StatusPicker from '../../components/StatusPicker';

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
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const isAdmin = user?.role === 'admin';

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const fetchOrderDetails = useCallback(async () => {
    if (!orderId) {
      Alert.alert('Erro', 'ID do pedido não encontrado.');
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/orders/${orderId}`);
      setOrder(response.data);
      setSelectedStatus(response.data.status);
    } catch (error) {
      console.error(`Erro ao buscar pedido ${orderId}:`, error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do pedido.');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  const handleUpdateStatus = async () => {
    const newStatus = selectedStatus;
    if (!order || !selectedStatus || selectedStatus === order.status) {
      Alert.alert('Atenção', 'Selecione um novo status diferente do atual.');
      return;
    }

    setLoadingUpdate(true);
    try {
      await api.put(`/orders/${order.id}/status`, {
        status: newStatus,
      });

      Alert.alert(
        'Sucesso',
        `Status do pedido atualizado para ${newStatus
          .replace('_', ' ')
          .toUpperCase()}.`,
      );
      // Atualiza o estado local
      setOrder(prev => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      Alert.alert(
        'Erro',
        `Falha ao atualizar status: ${
          error.response?.data?.error || 'Erro de conexão'
        }`,
      );
      setSelectedStatus(order.status);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleInitiatePayment = async () => {
    if (!order) return;

    const totalValueForCheckout = order.payment?.totalValue || order.totalValue;

    const isWaitingForPayment = order.status === 'waiting_payment';

    if (!isWaitingForPayment) {
      Alert.alert(
        'Atenção',
        `O pedido já está em status ${order.status
          .replace('_', ' ')
          .toUpperCase()}.`,
      );
      return;
    }

    setLoadingPayment(true);
    try {
      const checkoutData = {
        orderId: order.id,
        totalValue: totalValueForCheckout,
        description: `Pagamento do Pedido #${order.id.substring(0, 8)}`,
        userEmail: user?.email,
        userName: user?.name,
      };

      const checkoutResponse = await api.post('/checkout', checkoutData);
      if (checkoutResponse.data.init_point) {
        const supported = await Linking.canOpenURL(
          checkoutResponse.data.init_point,
        );
        if (supported) {
          Linking.openURL(checkoutResponse.data.init_point);
        } else {
          Alert.alert('Atenção', 'Não foi possível abrir o link de pagamento.');
        }
      } else {
        throw new Error('Link de pagamento não retornado.');
      }
    } catch (error) {
      Alert.alert(
        'Erro no Pagamento',
        'Falha ao gerar o link do Mercado Pago.',
      );
    } finally {
      setLoadingPayment(false);
    }
  };
  const handleCancelation = () => {
    // 1. Verifica se o pedido pode ser cancelado (waiting_payment)
    if (order.status !== 'waiting_payment') {
      Alert.alert(
        'Atenção',
        'O pedido só pode ser cancelado se estiver aguardando pagamento.',
      );
      return;
    }

    // 2. Apresenta o diálogo de confirmação
    Alert.alert(
      'Confirmar Cancelamento',
      `Tem certeza que deseja cancelar o pedido #${order.id.substring(
        0,
        8,
      )}? Essa ação não pode ser desfeita.`,
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, Cancelar',
          // 3. 🎯 Chamada direta à API após a confirmação do usuário
          onPress: confirmCancelationApiCall,
          style: 'destructive',
        },
      ],
    );
  };

  // 🎯 FUNÇÃO DE API (Executada APENAS após o usuário clicar em 'Sim, Cancelar')
  const confirmCancelationApiCall = async () => {
    setLoadingPayment(true); // Reutiliza o estado de loading
    try {
      // 4. PUT /orders/:id/cancel
      await api.put(`/orders/${order.id}/cancel`);

      Alert.alert(
        'Cancelado',
        `O pedido #${order.id.substring(0, 8)} foi cancelado.`,
      );

      // 5. Recarrega os dados para mostrar o status 'canceled'
      fetchOrderDetails();
    } catch (error) {
      Alert.alert(
        'Erro',
        error.response?.data?.error || 'Falha ao processar o cancelamento.',
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

  const formattedValue = Number(rawValue)
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

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

        {isAdmin && (
          <DetailCard style={{ marginTop: 20 }}>
            <Title style={{ fontSize: 18, marginBottom: 10 }}>
              Controle Administrativo
            </Title>

            <StatusPicker
              currentStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />

            <PayButton
              onPress={handleUpdateStatus}
              disabled={loadingUpdate || selectedStatus === order.status}
              style={{
                backgroundColor:
                  loadingUpdate || selectedStatus === order.status
                    ? '#ccc'
                    : '#5D82FB',
                marginTop: 15,
                alignSelf: 'stretch',
              }}
            >
              {loadingUpdate ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <PayButtonText>Salvar Novo Status</PayButtonText>
              )}
            </PayButton>
          </DetailCard>
        )}

        {isPending && !isAdmin && (
          <PayButton
            onPress={handleInitiatePayment}
            disabled={loadingPayment}
            style={{ marginTop: 20 }}
          >
            {loadingPayment ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <PayButtonText>Pagar R$ {formattedValue}</PayButtonText>
            )}
          </PayButton>
        )}



        {isPending && !isAdmin && (
          <View style={{ marginTop: 15, width: '100%' }}>
            <TouchableOpacity
              onPress={handleCancelation} // 💡 Chama a função unificada
              disabled={loadingPayment}
              style={{
                backgroundColor: '#E74C3C',
                padding: 15,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              {loadingPayment ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}
                >
                  Cancelar Pedido
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollContainer>
    </Container>
  );
}
