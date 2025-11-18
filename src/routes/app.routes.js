import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator.routes'; 
import SendScreen from '../screens/Send';
import OrderModal from '../components/OrderModal';
import MaterialDetailScreen from '../screens/MaterialDetail';
import ListsScreen from '../screens/Lists';
import OrderDetailScreen from '../screens/OrderDetail';
import AdminAllOrders from '../screens/AdminAllOrders';
import AdminValues from '../screens/AdminValues';
import AdminPayments from '../screens/AdminPayments';
import AdminUsers from '../screens/AdminUsers';
import AdminCourses from '../screens/AdminCourses';

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
            <RootStack.Screen
                name="OrderDetail"
                component={OrderDetailScreen}
                options={{
                    headerShown: true,
                    title: 'Detalhes do Pedido',
                    headerStyle: { backgroundColor: '#5D82FB' },
                    headerTintColor: '#fff',
                }}
            />
             <RootStack.Screen
                name="AdminAllOrders"
                component={AdminAllOrders}
                options={{
                    headerShown: true,
                    title: 'Todos os Pedidos',
                    headerStyle: { backgroundColor: '#5D82FB' },
                    headerTintColor: '#fff',
                }}
            />
            <RootStack.Screen
                name="AdminValues"
                component={AdminValues}
                options={{
                    headerShown: true,
                    title: 'Todos os Pedidos',
                    headerStyle: { backgroundColor: '#5D82FB' },
                    headerTintColor: '#fff',
                }}
            />
            <RootStack.Screen
                name="AdminPayments"
                component={AdminPayments}
                options={{
                    headerShown: true,
                    title: 'Todos os Pedidos',
                    headerStyle: { backgroundColor: '#5D82FB' },
                    headerTintColor: '#fff',
                }}
            />
            <RootStack.Screen
                name="AdminUsers"
                component={AdminUsers}
                options={{
                    headerShown: true,
                    title: 'Todos os Pedidos',
                    headerStyle: { backgroundColor: '#5D82FB' },
                    headerTintColor: '#fff',
                }}
            />
            <RootStack.Screen
                name="AdminCourses"
                component={AdminCourses}
                options={{
                    headerShown: true,
                    title: 'Todos os Pedidos',
                    headerStyle: { backgroundColor: '#5D82FB' },
                    headerTintColor: '#fff',
                }}
            />
        </RootStack.Navigator>
    );
}