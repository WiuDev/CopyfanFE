import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator.routes'; 
import SendScreen from '../screens/Send';

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
        </RootStack.Navigator>
    );
}