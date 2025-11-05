import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../contexts/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes() {
    const { signed, loading } = useContext(AuthContext);
    const navigation = useNavigation();

    useEffect(() => {
        const handleDeepLink = ({ url }) => {
            if (url && url.includes('/pagamento/')) { 
                navigation.navigate('MainTabs', { screen: 'Orders' }); 
            }
        };

        const subscription = Linking.addEventListener('url', handleDeepLink);
        Linking.getInitialURL().then(url => {
            if (url) {
                handleDeepLink({ url });
            }
        });

        return () => subscription.remove();
    }, [navigation]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }
    
    return (signed ? <AppRoutes /> : <AuthRoutes />);
}

export default Routes;