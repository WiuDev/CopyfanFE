import styled from 'styled-components/native';
import { TouchableOpacity, Text, View } from 'react-native';

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return '#2ECC71';
    case 'processing':
      return '#3498DB';
    case 'waiting_payment':
      return '#FF9C55';
    case 'failed':
      return '#E74C3C';
    default:
      return '#7F8C8D'; 
  }
};
export const ItemContainer = styled(TouchableOpacity)`
  background-color: #FFFFFF;
  padding: 18px 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  /* Destaque sutil: Borda lateral com a cor do APP para todos os itens */
  border-left-width: 4px;
  border-left-color: #FF9C55; 
`;

export const HeaderArea = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const OrderIdText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: #555;
`;

export const StatusPill = styled(View)`
  background-color: ${(props) => getStatusColor(props.status)};
  padding: 4px 8px;
  border-radius: 12px;
`;

export const StatusText = styled(Text)`
  color: #FFF;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const PriceAndStatusArea = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom-width: 1px;
  border-bottom-color: #EEE;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;


export const TotalValueContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const TotalValueText = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  color: #2C3E50; 
  /* Cor de destaque para o valor, exceto se for o preço principal do app */
`;

export const ItemListHeader = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

export const MaterialItemRow = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const MaterialNameText = styled(Text)`
  font-size: 13px;
  color: #444;
  margin-left: 8px;
  flex: 1;
`;

export const DetailInfoText = styled(Text)`
  font-size: 11px;
  color: #7F8C8D;
`;