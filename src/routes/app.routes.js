import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Home from '../screens/Home';
import Orders from '../screens/Pedidos';
import Config from '../screens/Config';


const Tab = createBottomTabNavigator();

function AppRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon: ({ color, size }) => (
        <Icon name="home" color={color} size={size} />
      )}} />
      <Tab.Screen name="Orders" component={Orders} options={{tabBarIcon: ({ color, size }) => (
        <Icon name="list" color={color} size={size} />
      )}} />
      <Tab.Screen name="Config" component={Config} options={{tabBarIcon: ({ color, size }) => (
        <Icon name="settings" color={color} size={size} />
      )}} />
    </Tab.Navigator>
  );
}

export default AppRoutes;
