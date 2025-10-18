import react, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BackGround, LogoutButton, LogoutText } from './styles';
import { AuthContext } from '../../contexts/auth';

export default function HomeScreen() {
  const { signOut } = useContext(AuthContext);

  return (
    <BackGround>
      <LogoutButton onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </LogoutButton>
    </BackGround>
  );
}
