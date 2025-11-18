import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { StyledInput } from './styles';
const CustomButton = ({ title, onPress, color }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: color,
      padding: 12,
      borderRadius: 8,
      width: '48%',
      alignItems: 'center',
      elevation: 2,
    }}
  >
    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function CourseCreationModal({ isVisible, onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [degree, setDegree] = useState('');
  const [modality, setModality] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !degree.trim() || !modality.trim()) {
      Alert.alert(
        'Atenção',
        'Todos os campos são obrigatórios: Título, Grau e Modalidade.',
      );
      return;
    }
    onCreate({ title, degree, modality });
    setTitle('');
    setDegree('');
    setModality('');
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
      >
        <View
          style={{
            width: '90%',
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
            Criar Novo Curso
          </Text>

          {/* Inputs... */}

          <TextInput
            placeholder="Título do Curso (Ex: Ciência de Dados)"
            value={title}
            onChangeText={setTitle}
            style={StyledInput}
            placeholderTextColor="#888"
          />

          <TextInput
            placeholder="Grau (Ex: Bacharelado)"
            value={degree}
            onChangeText={setDegree}
            style={StyledInput}
            placeholderTextColor="#888"
          />

          <TextInput
            placeholder="Modalidade (Ex: Presencial)"
            value={modality}
            onChangeText={setModality}
            style={StyledInput}
            placeholderTextColor="#888"
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}
          >
            {/* Botão Cancelar (Cor primária azul) */}
            <CustomButton title="Cancelar" onPress={onClose} color="#5D82FB" />

            {/* Botão Criar (Cor de sucesso verde) */}
            <CustomButton
              title="Criar Curso"
              onPress={handleSubmit}
              color="#2ECC71"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
