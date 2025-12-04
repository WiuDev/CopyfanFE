import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import {
  BackGround,
  Container,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
  Link,
  LinkText,
  Logo,
} from '../SignIn/styles';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      Alert.alert('Atenção', 'Por favor, insira seu endereço de e-mail.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/forgot-password', { email });
      Alert.alert(
        'E-mail Enviado!',
        response.data.message ||
          'Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.',
      );
      navigation.navigate('OTPVerificationScreen', { email: email });
    } catch (error) {
      console.error('Erro forgot password:', error.message);
      Alert.alert('Erro', 'Não foi possível completar a solicitação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      enabled
    >
      <BackGround>
        <Container>
          <Logo
            source={require('../../assets/Logo.png')}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
            Recuperar Senha
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 30, textAlign: 'center' }}>
            Insira seu e-mail para redefinir sua senha.
          </Text>

          <AreaInput>
            <Input
              placeholder="Seu E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#888"
            />
          </AreaInput>

          <SubmitButton
            activeOpacity={0.8}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size={20} color="#FFF" />
            ) : (
              <SubmitText>Enviar Link</SubmitText>
            )}
          </SubmitButton>

          <Link onPress={() => navigation.goBack()}>
            <LinkText style={{ marginTop: 20 }}>Voltar ao Login</LinkText>
          </Link>
        </Container>
      </BackGround>
    </KeyboardAvoidingView>
  );
}
