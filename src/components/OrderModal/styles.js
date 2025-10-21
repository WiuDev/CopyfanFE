import styled from 'styled-components/native';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';

export const ScreenContainer = styled(ScrollView)`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const FormSection = styled(View)`
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

export const HeaderTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

export const StyledInput = styled.TextInput`
  border-width: 1.5px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  height: 50px;
  background-color: #fff;
  color: #333;
  font-size: 16px;
  /* Destaque sutil no foco */
  &:focus {
    border-color: #5d82fb;
    background-color: #f8f9ff;
  }
`;

export const OptionRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const PriceDisplay = styled(View)`
  margin-top: 15px;
  padding: 20px;
  border-radius: 10px;
  background-color: #ff9c55;
  align-items: center;
  border-width: 1px;
  border-color: #ff9c55;
`;

export const CalculatedPriceLabel = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: 500;
`;
export const PriceValueContainer = styled.View` 
  min-height: 40px; 
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

export const CalculatedPriceText = styled.Text`
  font-size: 38px;
  font-weight: 900;
  color: #fff;
  margin-top: 5px;
`;

export const SubmitButton = styled(TouchableOpacity)`
  background-color: #2ecc71;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-top: 30px;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

export const CancelButtonText = styled.Text`
  color: #5d82fb;
  font-weight: 600;
  margin-top: 20px;
`;
