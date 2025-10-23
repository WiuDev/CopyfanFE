import styled from 'styled-components/native';
import {View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ModalContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #F8F8F8;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content-content: space-between;
  align-items: center;
  padding: 15px 15px 10px;
  background-color: #FFF;
  border-bottom-width: 1px;
  border-bottom-color: #EEE;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const OptionItem = styled.TouchableOpacity`
  padding: 15px 20px;
  background-color: #FFF;
  border-bottom-width: 1px;
  border-bottom-color: #F0F0F0;
`;

export const OptionText = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 5px 10px;
`;

export const CloseButtonText = styled.Text`
  color: #007AFF;
  font-size: 16px;
  font-weight: 500;
`;

export const PickerContainer = styled.View`
  padding: 10px 15px;
`;