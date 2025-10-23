import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #fcfcfc;
  border-radius: 12px;
  margin: 20px;
  border: 1px dashed #DDD;
`;

export const IconText = styled.Text`
  font-size: 50px;
  margin-bottom: 15px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
`;

export const Message = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 25px;
  line-height: 20px;
`;

export const CTAButton = styled.TouchableOpacity`
  background-color: #FF9C55; /* Sua cor primária (laranja) */
  padding: 12px 30px;
  border-radius: 8px;
`;

export const CTAButtonText = styled.Text`
  color: #FFF;
  font-size: 16px;
  font-weight: bold;
`;