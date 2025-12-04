import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { BackGround, Container, AreaInput, Input, SubmitButton, SubmitText, CenteredView } from '../SignIn/styles'; 
import Icon from 'react-native-vector-icons/Feather';

export default function OTPVerificationScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    
    const userEmail = route.params?.email; 

    const [otpCode, setOtpCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleReset = async () => {
        if (!otpCode || otpCode.length !== 6) {
            Alert.alert('Atenção', 'O código de 6 dígitos é obrigatório.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Atenção', 'As novas senhas não coincidem.');
            return;
        }
        if (!userEmail) {
            Alert.alert('Erro', 'E-mail do usuário não encontrado. Tente novamente.');
            return;
        }

        setLoading(true);
        try {
         
            await api.post('/auth/reset-password', { 
                token: otpCode,
                newPassword: newPassword,
                email: userEmail 
            });
            
            Alert.alert('Sucesso!', 'Sua senha foi atualizada com sucesso. Faça login para continuar.');
            navigation.navigate('SignIn');
            
        } catch (error) {
            console.error('Erro de redefinição:', error.message);
            const errorMessage = error.response?.data?.error || 'Código inválido ou expirado.';
            Alert.alert('Falha', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!userEmail) {
        return (
            <CenteredView style={{ padding: 20 }}>
                <Text style={{ color: '#E74C3C', fontSize: 16, textAlign: 'center' }}>
                    E-mail de redefinição não fornecido. Retorne à tela anterior.
                </Text>
            </CenteredView>
        );
    }
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} enabled>
            <BackGround>
                <Container>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Redefinir Senha</Text>
                    <Text style={{ fontSize: 16, marginBottom: 30, textAlign: 'center' }}>
                        Insira o código de 6 dígitos enviado para **{userEmail}** e sua nova senha.
                    </Text>
                    <AreaInput>
                        <Input 
                            placeholder="Código de 6 dígitos" 
                            value={otpCode} 
                            onChangeText={setOtpCode}
                            keyboardType="numeric"
                            maxLength={6}
                            placeholderTextColor="#888" 
                        />
                    </AreaInput>

                    <AreaInput style={{ justifyContent: 'center', position: 'relative' }}>
                        <Input placeholder="Nova Senha" value={newPassword} onChangeText={setNewPassword}
                               secureTextEntry={!showPassword} style={{ paddingRight: 50 }} placeholderTextColor="#888" />
                        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={{ position: 'absolute', right: 15, padding: 10, zIndex: 10 }}>
                            <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
                        </TouchableOpacity>
                    </AreaInput>

                    <AreaInput style={{ justifyContent: 'center', position: 'relative' }}>
                        <Input placeholder="Confirme a nova senha" value={confirmPassword} onChangeText={setConfirmPassword}
                               secureTextEntry={!showConfirmPassword} style={{ paddingRight: 50 }} placeholderTextColor="#888" />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(prev => !prev)} style={{ position: 'absolute', right: 15, padding: 10, zIndex: 10 }}>
                            <Icon name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
                        </TouchableOpacity>
                    </AreaInput>
                    
                    <SubmitButton onPress={handleReset} disabled={loading} style={{ marginTop: 30 }}>
                        {loading ? (<ActivityIndicator size={20} color="#FFF" />) : (<SubmitText>Redefinir Senha</SubmitText>)}
                    </SubmitButton>
                    
                </Container>
            </BackGround>
        </KeyboardAvoidingView>
    );
}