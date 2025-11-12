import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'; 

import { AuthContext } from '../../contexts/auth';
import { BackGround, LogoutButton, LogoutText, PanelContainer, PanelTitle, AdminButton, AdminButtonText } from './styles'; 

const ADMIN_ROUTES = [
  { name: 'Visualizar Todos os Pedidos', icon: 'package', screen: 'AdminAllOrders' },
  { name: 'Atualizar Preços', icon: 'dollar-sign', screen: 'AdminValues' },
  { name: 'Gerenciar Cursos', icon: 'book', screen: 'AdminCourses' },
  { name: 'Buscar Pagamentos', icon: 'search', screen: 'AdminPayments' },
  { name: 'Gerenciar Usuários', icon: 'users', screen: 'AdminUsers' },
];

export default function ConfigScreen({ navigation }) { 
  const { signOut, user } = useContext(AuthContext); 
  
  const isAdmin = user?.role === 'admin'; 

  const handleAdminNavigation = (screenName) => {
    navigation.navigate(screenName); 
  };

  return (
    <BackGround>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
        {isAdmin && (
          <PanelContainer>
            <PanelTitle>Painel Administrativo</PanelTitle>
            {ADMIN_ROUTES.map(route => (
              <AdminButton 
                key={route.screen} 
                onPress={() => handleAdminNavigation(route.screen)}
              >
                <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>{route.name}</Text>
              </AdminButton>
            ))}
          </PanelContainer>
        )}
        <View style={{ marginTop: 40, width: '100%' }}>
            <Text style={{ fontSize: 18, marginBottom: 15, textAlign: 'center' }}>
                Opções de Conta
            </Text>
        </View>

        <LogoutButton onPress={() => signOut()}>
          <LogoutText>Sair</LogoutText>
        </LogoutButton>

      </ScrollView>
    </BackGround>
  );
}