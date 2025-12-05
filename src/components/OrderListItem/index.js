import React from 'react';
import { View, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  ItemContainer,
  HeaderArea,
  OrderIdText,
  StatusPill,
  StatusText,
  PriceAndStatusArea,
  TotalValueContainer,
  TotalValueText,
  ItemListHeader,
  MaterialItemRow,
  MaterialNameText,
  DetailInfoText,
} from './styles';

const STATUS_MAP = {
    'waiting_payment': 'Aguardando Pagamento',
    'processing': 'Em Processamento',
    'canceled': 'Cancelado',
    'completed': 'Concluído',
    'pending': 'Pendente (MP)',
    'failed': 'Falha no Pagamento',
};

const OrderListItem = ({ item, onPress }) => {
  const hasMaterials = item.materials && item.materials.length > 0;
  const totalQuantity = item.materials.reduce((sum, material) => {
    const quantity = material.MaterialsOrders.quantity || 0; 
    return sum + quantity;
  }, 0);
  const totalJobSheets = item.materials.reduce((sum, material) => {
    const mo = material.MaterialsOrders;
    const pagesPerCopy = mo.end_page - mo.start_page + 1;
    return sum + pagesPerCopy * (mo.quantity || 0);
  }, 0);
  const pageRanges = item.materials
    .map(material => {
      const start = material.MaterialsOrders.start_page;
      const end = material.MaterialsOrders.end_page;
      return `${start}-${end}`;
    })
    .join(', ');
  const orderTitle = `Pedido #${item.id.substring(0, 8)}`;
  const isPaymentPending = item.status === 'waiting_payment';
  const getTranslatedStatus = (status) => {
    return STATUS_MAP[status] || status.replace('_', ' '); 
};
  return (
    <ItemContainer onPress={onPress}>
      <HeaderArea>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather
            name="package"
            size={20}
            color="#555"
            style={{ marginRight: 8 }}
          />
          <OrderIdText>{orderTitle}</OrderIdText>
        </View>

        <StatusPill status={item.status}>
          <StatusText>{getTranslatedStatus(item.status)}</StatusText>
        </StatusPill>
      </HeaderArea>
      <PriceAndStatusArea>
        <View>
          <Text style={{ fontSize: 12, color: '#777' }}>Valor Total</Text>

          <TotalValueContainer>
            {isPaymentPending && (
              <Feather
                name="alert-circle"
                size={18}
                color="#FF9C55"
                style={{ marginRight: 5 }}
              />
            )}
            <TotalValueText>R$ {item.payment.totalValue}</TotalValueText>
          </TotalValueContainer>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 12, color: '#777' }}>Data</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather
              name="calendar"
              size={14}
              color="#777"
              style={{ marginRight: 4 }}
            />
            <Text style={{ fontSize: 14, color: '#333' }}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </PriceAndStatusArea>
      <ItemListHeader>Itens ({item.materials.length})</ItemListHeader>
      {hasMaterials ? (
        item.materials.map((material, index) => (
          <MaterialItemRow key={index}>
            <Feather name="file-text" size={16} color="#7F8C8D" />
            <MaterialNameText numberOfLines={1}>
              {material.name}
            </MaterialNameText>
            <DetailInfoText>
              <Feather
                name="hash"
                size={10}
                color="#7F8C8D"
                style={{ marginRight: 2 }}
              />
              {material.total_pages} pág. | {material.classPeriod}
            </DetailInfoText>
          </MaterialItemRow>
        ))
      ) : (
        <Text style={{ color: '#888', marginLeft: 5 }}>
          Nenhum item detalhado neste pedido.
        </Text>
      )}
      <View
        style={{
          marginTop: 15,
          alignItems: 'flex-end',
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: '#F5F5F5',
        }}
      >
        <Text style={{ fontSize: 13, color: '#777' }}>
          Intervalos de Página:
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#555',
            marginBottom: 8,
          }}
        >
          {pageRanges}
        </Text>
        <Text style={{ fontSize: 13, color: '#777' }}>
          Quantidade:
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555' }}>
          {totalQuantity}x
        </Text>
        <Text style={{ fontSize: 13, color: '#777', marginTop: 5 }}>
          Total de Folhas Impressas:
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555' }}>
          {totalJobSheets}
        </Text>
      </View>
    </ItemContainer>
  );
};

export default OrderListItem;
