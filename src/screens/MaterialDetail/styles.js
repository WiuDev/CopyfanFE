import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #F5F5F5;
`;

export const PdfContainer = styled(View)`
  flex: 1;
  width: 100%;
  margin-top: 10px;
`;

export const BottomActionArea = styled(View)`
  padding: 15px 20px;
  border-top-width: 1px;
  border-top-color: #EEE;
  background-color: #FFF;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MaterialInfoText = styled(Text)`
  font-size: 14px;
  color: #555;
`;