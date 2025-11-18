import styled from 'styled-components/native';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #F5F5F5;
  padding: 15px;
`;

export const SectionTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const CenteredView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ReportListContainer = styled(View)`
    margin-top: 10px;
`;

export const RevenueCard = styled(View)`
    background-color: #5D82FB; /* Azul Administrativo */
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    elevation: 5;
    shadow-color: #000;
    shadow-opacity: 0.2;
    shadow-radius: 4px;
`;

export const RevenueTitle = styled(Text)`
    color: #fff;
    font-size: 18px;
    font-weight: 500;
`;

export const RevenueValue = styled(Text)`
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    margin-top: 5px;
`;