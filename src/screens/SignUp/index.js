import React, {useContext, useState} from 'react'
import { Platform, ActivityIndicator} from 'react-native'


import { AuthContext } from '../../contexts/auth.js';

import {BackGround, Container, AreaInput, Input, SubmitButton, SubmitText} from '../SignIn/styles.js'

export default function SignUp() {
    const { signUp, loadingAuth } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignUp(){
        if(name === '' || email === '' || password === ''){
            return;
        }
        signUp(name, email,password);
    }

    return (
        <BackGround>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
                <AreaInput>
                    <Input placeholder="Nome" value ={name} onChangeText={(text) => setName(text)}/>
                </AreaInput>
                 <AreaInput>
                    <Input placeholder="Seu Email" value ={email} onChangeText={(text) => setEmail(text)}/>
                </AreaInput>
                 <AreaInput>
                    <Input placeholder="Sua Senha" value ={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true}/>
                </AreaInput>
                <SubmitButton activeOpacity={0.8} onPress={handleSignUp}>
                    { loadingAuth ? (<ActivityIndicator size={20} color="#FFF" />) : (<SubmitText>Cadastrar</SubmitText>) }
                </SubmitButton>
            </Container>
        </BackGround>
    )
}