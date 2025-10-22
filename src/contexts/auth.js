import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api.js';
import { useNavigation} from '@react-navigation/native';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('@Copyfan');
      if (storageUser) {
        try {
          const response = await api.get('/users/me', {
            headers: {
              Authorization: `Bearer ${storageUser}`,
            },
          });

          if (response && response.data) {
            api.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${storageUser}`;
            setUser(response.data);
          } else {
            await AsyncStorage.removeItem('@Copyfan');
            setUser(null);
          }
        } catch (error) {
          await AsyncStorage.removeItem('@Copyfan');
          setUser(null);
        }
      }
      setLoading(false);
    }
    loadStorage();
  }, []);
  async function signUp(name, email, password, courseId) {
    setLoadingAuth(true);
    try {
      const response = await api.post('/auth/register', {
        name: name,
        email: email,
        password: password,
        role: 'user',
        course_id: courseId,
      });

      Alert.alert(
        'Sucesso!',
        'Conta criada com sucesso! Faça login para continuar.',
        // Opcional: Adicionar um botão OK que dispara a navegação
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Erro desconhecido';
      Alert.alert('Erro no Cadastro', `Erro: ${errorMessage}`);
      console.log('Erro ao cadastrar: ' + error);
    }
    finally{
      setLoadingAuth(false);
    }
  }
  async function signIn(email, password) {
    setLoadingAuth(true);
    try {
      const response = await api.post('/auth/login', {
        email: email,
        password: password,
      });
      const { id, name, token, role } = response.data;
      console.log('Token recebido:', token);
      const data = {
        id,
        name,
        email,
        role,
        token,
      };
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await AsyncStorage.setItem('@Copyfan', token);

      setUser({
        id,
        name,
        email,
        role,
      });
      setLoadingAuth(false);
    } catch (error) {
      console.log('Erro ao logar: ' + error);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signUp,
        signIn,
        signOut,
        loadingAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
