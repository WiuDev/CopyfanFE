import react from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BackGround, LogoutButton, LogoutText } from './styles';

export default function HomeScreen() {
  return (
    <BackGround>
      <LogoutButton onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </LogoutButton>
    </BackGround>
  );
}
