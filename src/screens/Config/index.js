import react , {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../../contexts/auth';
import {View,Text, Button} from 'react-native';

export default function ConfigScreen() {
    const {signOut} = useContext(AuthContext);
    return(
        <View>
            <Text>Config Screen</Text>
            <Button title="Sair" onPress={() => signOut()} />
        </View>
    )
}