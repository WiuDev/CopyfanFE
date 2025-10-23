import styled from 'styled-components/native';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export const Container = styled(ScrollView)`
  flex: 1;
  background-color: #fff9f2;
  padding: 15px;
`;

export const OptionRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

export const OptionText = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

export const FormArea = styled(View)`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const ScreenTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

export const StyledInput = styled(TextInput)`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  height: 50px;
  background-color: #fff;
`;

export const FilePickerButton = styled(TouchableOpacity)`
  background-color: #eee;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${props => (props.hasFile ? '#2ECC71' : '#DDD')};
`;

export const SubmitButton = styled(TouchableOpacity)`
  background-color: #ff9c55;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-top: 20px;
`;

export const ButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
