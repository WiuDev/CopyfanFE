import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import OTPVerificationScreen from '../screens/OTPVerification';

const AuthStack = createStackNavigator();

function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <AuthStack.Screen name="SignUp" component={SignUp}/>
            <AuthStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ title: 'Recuperar Acesso' }} />
            <AuthStack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} options={{ title: 'Verificação OTP' }} />
        </AuthStack.Navigator>
    );
}

export default AuthRoutes;
