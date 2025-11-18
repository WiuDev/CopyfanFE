import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ADMIN_BLUE = '#5D82FB';
const ALERT_ORANGE = '#FF9C55';
const BACKGROUND_LIGHT = '#F5F5F5';
const TEXT_DARK = '#121212';
const SUCCESS_GREEN = '#2ECC71';
const DANGER_RED = '#E74C3C';

export const Container = styled(SafeAreaView)`
  flex: 1; 
  background-color: ${BACKGROUND_LIGHT};
  padding: 15px;
`;

export const CenteredView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SectionTitle = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  color: ${ADMIN_BLUE};
  margin-bottom: 15px;
`;

export const StyledInput = styled(TextInput)`
  border-width: 1.5px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 10px;
  height: 50px;
  background-color: #fff;
  color: ${TEXT_DARK};
  font-size: 16px;
  padding-left: 15px;
`;

export const SubmitButton = styled(TouchableOpacity)`
  background-color: ${ADMIN_BLUE};
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-top: 30px;
  elevation: 3;
`;

export const SubmitButtonText = styled(Text)`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

export const DetailLabel = styled(Text)`
  font-size: 15px;
  color: #555;
  font-weight: 600;
`;

export const RoleActionButton = styled(TouchableOpacity)`
    background-color: ${props => 
        props.isOwner ? DANGER_RED : 
        props.isSelf ? '#ccc' : 
        SUCCESS_GREEN};
    padding: 8px 12px;
    border-radius: 5px;
    opacity: ${props => props.isSelf ? 0.6 : 1};
    margin-left: 10px;
`;

export const RoleActionText = styled(Text)`
    color: #fff;
    font-size: 12px;
    font-weight: bold;
`;