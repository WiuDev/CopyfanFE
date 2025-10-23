import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #FFF9F2;
`;


export const FilterArea = styled.View`
  padding: 15px;
  background-color: #FFFFFF;
  border-bottom-width: 1px;
  border-bottom-color: #E0E0E0;
`;


export const FilterTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
`;


export const SearchInput = styled.TextInput`
  height: 45px;
  border-radius: 8px;
  padding: 0 15px;
  background-color: #F0F0F0;
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
`;


export const FilterRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`;

export const FilterSelectButton = styled.TouchableOpacity`
  flex: 1;
  height: 45px;
  background-color: #FFFFFF;
  border: 1px solid #CCC;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-horizontal: 5px;
`;

export const FilterButtonText = styled.Text`
  color: #444;
  font-size: 15px;
`;

export const ListContainer = styled.View`
  flex: 1;
  padding: 0 10px;
`;