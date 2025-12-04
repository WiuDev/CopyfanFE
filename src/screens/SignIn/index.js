import React, { useState, useContext, useEffect } from 'react';
import {
  Platform,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

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
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, loadingAuth } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function HandleLogin() {
    if (email === '' || password === '') {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    try {
      signIn(email, password);
    } catch (error) {
      Alert.alert('Erro', 'Seu email ou senha estão incorretos!');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      enabled
    >
      <BackGround>
        <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
          <Logo
            source={require('../../assets/Logo.png')}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
          <AreaInput>
            <Input
              placeholder="Seu Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#888"
            />
          </AreaInput>
          <AreaInput style={{ justifyContent: 'center' }}>
            <Input
              placeholder="Sua Senha"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={{ paddingRight: 50 }}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: 15,
                padding: 10,
                zIndex: 10,
              }}
            >
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
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
    </KeyboardAvoidingView>
  );
}
