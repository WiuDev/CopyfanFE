import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator.routes'; 
import SendScreen from '../screens/Send';
import OrderModal from '../components/OrderModal';

const RootStack = createStackNavigator();

export default function AppRoutes() {
    return (
        <RootStack.Navigator>
            
            <RootStack.Screen
                name="MainTabs"
                component={TabNavigator}
                options={{ headerShown: false }} 
            />
            <RootStack.Screen
                name="SendMaterialScreen" 

                component={SendScreen}
                options={{
                    headerShown: true, 
                    title: 'Enviar Novo Material',
                    headerStyle: { backgroundColor: '#5D82FB' },
                    headerTintColor: '#fff',
                }}
            />
            <RootStack.Screen
                name="OrderConfigModal"
                component={OrderModal} 
                options={{
                    presentation: 'modal', 
                    headerShown: true, 
                    title: 'Configurar e Orçar Pedido',
                    headerStyle: { backgroundColor: '#5D82FB' },
                    headerTintColor: '#fff',
                }}
            />
        </RootStack.Navigator>
    );
}