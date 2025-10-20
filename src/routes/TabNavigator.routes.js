import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import { AuthContext } from '../contexts/auth';

import Home from '../screens/Home';
import Orders from '../screens/Orders';
import Config from '../screens/Config';
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();
function TabNavigator() {
  const { user } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#171515',
        tabBarStyle: { backgroundColor: '#5D82FB', paddingTop: 5, height: 60 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: { backgroundColor: '#5D82FB' },
          headerTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          headerTitle: `Olá, ${user.name}`,
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}>
              <Icon name="bell" size={25} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          title: 'Pedidos',
          headerTitle: 'Meus Pedidos',
          headerStyle: { backgroundColor: '#5D82FB' },
          headerTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <Icon name="file-text" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Config"
        component={Config}
        options={{
          title: 'Configurações',
          headerStyle: { backgroundColor: '#5D82FB' },
          headerTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
