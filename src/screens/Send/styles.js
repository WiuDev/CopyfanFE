import styled from 'styled-components/native';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';


export const Container = styled(ScrollView)`
  flex: 1;
  background-color: #fff9f2;
  padding: 15px;
`;

export const FormArea = styled(View)`
  background-color: #FFF;
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


export const PickerContainer = styled(View)`
  border-width: 1px;
  border-color: #CCC;
  border-radius: 8px;
  margin-bottom: 15px;
  height: 50px;
  justify-content: center;
  overflow: hidden; /* Para garantir que o Picker fique dentro da borda */
`;


export const StyledInput = styled(TextInput)`
  border-width: 1px;
  border-color: #CCC;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  height: 50px;
  background-color: #FFF;
`;



export const FilePickerButton = styled(TouchableOpacity)`
  background-color: #EEE;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${(props) => props.hasFile ? '#2ECC71' : '#DDD'};
`;


export const SubmitButton = styled(TouchableOpacity)`
  background-color: #007AFF;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-top: 20px;
`;

export const ButtonText = styled(Text)`
  color: #FFF;
  font-size: 16px;
  font-weight: bold;
`;