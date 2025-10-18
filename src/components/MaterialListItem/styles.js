import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const ItemContainer = styled(TouchableOpacity)`
  background-color: #FFF;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  elevation: 2; /* Sombra para Android */
  shadow-color: #000; /* Sombra para iOS */
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  border-left-width: 4px;
  border-left-color: #FF9C55; /* Linha de destaque */
`;

export const HeaderArea = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const TitleText = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: 'black';
  flex: 1; /* Permite que o título ocupe o espaço restante */
`;

export const CourseTitleText = styled.Text`
  font-size: 14px;
  color: #FF9C55; 
  font-weight: bold;
  margin-bottom: 8px;
`;

export const DetailsGrid = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`;

export  const DetailItem = styled.View`
  align-items: flex-start;
  width: 30%;
`;

export const DetailLabel = styled.Text`
  font-size: 10px;
  font-weight: 500;
  color: #888;
  margin-bottom: 2px;
  text-transform: uppercase;
`;

export const DetailValue = styled.Text`
  font-size: 14px;
  color: #444;
  font-weight: 600;
`;