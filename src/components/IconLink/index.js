import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { ButtonArea, IconWrapper, LabelText } from './styles';

export default function IconLink({ iconName, label, onPress }) {
  return (
    <ButtonArea onPress={onPress}>
      <IconWrapper>
        <Icon name={iconName} size={24} color="#fff" style={{ alignSelf: 'center' }} />
        <LabelText>{label}</LabelText>
      </IconWrapper>
    </ButtonArea>
  );
}
