import React from 'react';
import { Container, IconText, Title, Message, CTAButton, CTAButtonText } from './styles';

/**
 * @param {object} props
 * @param {function} props.onSend
 */
export default function EmptyState({ onSend }) {
  return (
    <Container>
      <IconText>📁</IconText> 
      <Title>Nenhum Material Encontrado</Title>
      <Message>
        Esta é a sua área pessoal de gerenciamento de materiais. Envie seu primeiro arquivo para começar a usá-la!
      </Message>
      
      <CTAButton onPress={onSend}>
        <CTAButtonText>Enviar Meu Primeiro Material</CTAButtonText>
      </CTAButton>
    </Container>
  );
}