import React, { useState, useContext, useEffect } from 'react';
import { Platform, ActivityIndicator, Alert } from 'react-native';

import {
  BackGround,
  Container,
  Logo,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
  Link,
  LinkText,
} from './styles';

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth.js';


export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext);


  function HandleLogin() {
    if (email === '' || password === '') {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    signIn(email, password);
  }

  return (
    <BackGround>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <Logo source={require('../../assets/Logo.png')} style={{ width: 150, height: 150 }} resizeMode='contain' />
        <AreaInput>
          <Input
            placeholder="Seu Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor='#121212'
          />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="Sua Senha"
            placeholderTextColor='#121212'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </AreaInput>
        <SubmitButton activeOpacity={0.8} onPress={HandleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <SubmitText>Entrar</SubmitText>
          )}
        </SubmitButton>
        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>Criar uma conta</LinkText>
        </Link>
      </Container>
    </BackGround>
  );
}
