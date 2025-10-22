import React, { useContext, useState } from 'react';
import { Platform, ActivityIndicator, Alert, View } from 'react-native';

import { AuthContext } from '../../contexts/auth.js';
import CoursePicker from '../../components/CoursePicker';

import {
  BackGround,
  Container,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
} from '../SignIn/styles.js';

export default function SignUp() {
  const { signUp, loadingAuth } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [courseId, setCourseId] = useState(null);
  const isValidEmail = email => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const isStrongPassword = password => {
    if (password.length < 8) {
      return {
        valid: false,
        message: 'A senha deve ter no mínimo 8 caracteres.',
      };
    }
    if (!/\d/.test(password)) {
      return {
        valid: false,
        message: 'A senha deve conter pelo menos um número.',
      };
    }
    if (!/[a-z]/.test(password)) {
      return {
        valid: false,
        message: 'A senha deve conter pelo menos uma letra minúscula.',
      };
    }
    if (!/[A-Z]/.test(password)) {
      return {
        valid: false,
        message: 'A senha deve conter pelo menos uma letra maiúscula.',
      };
    }
    return { valid: true, message: 'Senha forte.' };
  };

  function handleSignUp() {
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === '' ||
      courseId === null
    ) {
      Alert.alert(
        'Atenção',
        'Por favor, preencha todos os campos e selecione seu curso.',
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(
        'Atenção',
        'As senhas não coincidem. Por favor, tente novamente.',
      );
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Atenção', 'Por favor, insira um email válido.');
      return;
    }
    const passwordCheck = isStrongPassword(password);
    if (!passwordCheck.valid) {
      Alert.alert('Atenção', `Sua senha é fraca. ${passwordCheck.message}`);
      return;
    }
    signUp(name, email, password, courseId);
  }

  return (
    <BackGround>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
        <AreaInput>
          <Input
            placeholder="Nome"
            value={name}
            onChangeText={text => setName(text)}
          />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="Seu Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="Sua Senha"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="Confirme Sua Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
        </AreaInput>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginBottom: 15,
          }}
        >
          <CoursePicker
            selectedCourseId={courseId}
            onCourseChange={setCourseId}
          />
        </View>
        <SubmitButton activeOpacity={0.8} onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </BackGround>
  );
}
