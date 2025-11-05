import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #F8F8F8;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 20px 15px;
`;

export const DetailCard = styled(View)`
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 0px 2px;
  shadow-radius: 4px;
`;


export const Title = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

export const DetailRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

export const DetailLabel = styled(Text)`
  font-size: 15px;
  color: #777;
`;

export const DetailValue = styled(Text)`
  font-size: 15px;
  font-weight: 600;
  color: #333;
`;

export const StatusText = styled(Text)`
  font-size: 15px;
  font-weight: bold;
  /* Cor condicional, ajuste conforme a cor do seu StatusPill se houver */
  color: ${props => (props.isPending ? '#FF9C55' : '#2ECC71')}; 
`;

const MP_BLUE = '#009ee3';

export const PayButton = styled(TouchableOpacity)`
  background-color: ${props => (props.disabled ? '#ccc' : MP_BLUE)};
  padding: 15px;
  border-radius: 8px;
  margin-top: 25px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const PayButtonText = styled(Text)`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const CenteredView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;