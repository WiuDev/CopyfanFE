import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Cores do Tema ---
const ADMIN_BLUE = '#5D82FB';
const ALERT_ORANGE = '#FF9C55';
const BACKGROUND_LIGHT = '#F5F5F5';
const TEXT_DARK = '#121212';


export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${BACKGROUND_LIGHT};
  padding: 15px;
`;

export const ScrollArea = styled(ScrollView)`
`;

export const SectionTitle = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  color: ${ADMIN_BLUE};
  margin-bottom: 10px;
`;

export const StyledInput = styled(TextInput)`
  border-width: 1.5px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  height: 50px;
  background-color: #fff;
  color: ${TEXT_DARK};
  font-size: 16px;
  padding-left: 15px;
  &:focus {
     border-color: ${ALERT_ORANGE}; 
  }
`;

export const DetailLabel = styled(Text)`
  font-size: 15px;
  color: ${TEXT_DARK};
  font-weight: 600;
  margin-bottom: 5px;
`;

export const SubmitButton = styled(TouchableOpacity)`
  background-color: ${ADMIN_BLUE};
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 20px;
  elevation: 5;
`;

export const SubmitButtonText = styled(Text)`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;