import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const StyledInput = styled(TextInput)`
  border-width: 1.5px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  height: 50px;
  /* 🚨 CORREÇÃO: Mudar o fundo para um cinza claro para destacar no modal */
  background-color: #F0F0F0; 
  color: #333;
  font-size: 16px;
  padding-left: 15px;
  
  /* Destaque no foco */
  &:focus {
    border-color: #FF9C55; 
  }
`;