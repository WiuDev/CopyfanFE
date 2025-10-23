import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator.routes'; 
import SendScreen from '../screens/Send';
import OrderModal from '../components/OrderModal';
import MaterialDetailScreen from '../screens/MaterialDetail';
import ListsScreen from '../screens/Lists';

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
                name="ListsScreen" 

                component={ListsScreen}
                options={{
                    headerShown: true, 
                    title: 'Listas Públicas',
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
            <RootStack.Screen
                name="MaterialDetail"
                component={MaterialDetailScreen}
                options={{
                    headerShown: true,
                    title: 'Detalhes do Material',
                    headerStyle: { backgroundColor: '#5D82FB' },
                    headerTintColor: '#fff',
                }}
            />
        </RootStack.Navigator>
    );
}