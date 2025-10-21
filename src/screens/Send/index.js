import React, { useState, useEffect } from 'react';
import RNFS from 'react-native-fs';
import { Alert, ActivityIndicator, Text } from 'react-native';
import { pick, keepLocalCopy, types } from '@react-native-documents/picker';
import Feather from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import CoursePicker from '../../components/CoursePicker';
import {
  Container,
  FormArea,
  ScreenTitle,
  FilePickerButton,
  SubmitButton,
  ButtonText,
  StyledInput,
} from './styles';

export default function SendScreen() {
  const [name, setName] = useState('');
  const [classPeriod, setClassPeriod] = useState('');
  const [courseId, setCourseId] = useState(null);
  const [file, setFile] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const copyContentUriToFile = async (contentUri, fileName) => {
    const destPath = `${RNFS.CachesDirectoryPath}/${fileName}`;

    await RNFS.copyFile(contentUri, destPath);

    return `file://${destPath}`;
  };
  const handleFilePick = async () => {
    try {
      const [result] = await pick({ type: [types.pdf, types.images] });

      if (!result) return;

      const name = result.name || result.fileName || 'arquivo';
      let uri = result.uri;
      const type = result.type || 'application/octet-stream';

      if (Platform.OS === 'android' && uri.startsWith('content://')) {

        const destPath = `${RNFS.CachesDirectoryPath}/${name}`;


        await RNFS.copyFile(uri, destPath);

  
        uri = `file://${destPath}`;
      }

      setFile({ uri, name, type });
    } catch (err) {
      if (err?.message?.includes('canceled')) {
        console.log('Seleção cancelada');
        return;
      }
      console.error(err);
      Alert.alert('Erro', 'Falha ao selecionar arquivo');
    }
  };

  const handleSubmit = async () => {

    if (!name || !classPeriod || !courseId || !file) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos e selecione um arquivo.',
      );
      return;
    }

    setLoadingUpload(true);

    try {
      const fileContentBase64 = await RNFS.readFile(file.uri, 'base64');

      if (!fileContentBase64) {
        throw new Error('Falha ao ler o conteúdo do arquivo localmente.');
      }

      const formData = new FormData();


      formData.append('name', name);
      formData.append('classPeriod', classPeriod);
      formData.append('course_id', courseId);

      formData.append('file', {
        uri: `data:${file.type};base64,${fileContentBase64}`,
        name: file.name,
        type: file.type,
      });
      console.log(file.uri, file.name, file.type);

      await api.postForm('/materials', formData);
      console.log('Upload finalizado com sucesso');
      Alert.alert('Sucesso', 'Arquivo enviado e pronto para pedido!');

    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        'Erro desconhecido ao enviar material.';

      console.error('Erro no upload (Falha de Rede/Servidor):', err);
      Alert.alert('Falha no Envio', `Erro: ${errorMessage}`);
    } finally {
      setLoadingUpload(false);
    }
  };
  return (
    <Container contentContainerStyle={{ paddingBottom: 50 }}>
      <FormArea>
        <ScreenTitle>Enviar Novo Material</ScreenTitle>

        <StyledInput
          placeholder="Nome/Título do material (Ex: Lista de Cálculo)"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          placeholderTextColor="#888"
        />

        <StyledInput
          placeholder="Período/Turma (Ex: 8º Semestre)"
          value={classPeriod}
          onChangeText={setClassPeriod}
          placeholderTextColor="#888"
        />

        <CoursePicker
          selectedCourseId={courseId}
          onCourseChange={setCourseId}
        />

        <FilePickerButton onPress={handleFilePick} hasFile={!!file}>
          <Feather
            name="file-text"
            size={20}
            color={file ? '#2ECC71' : '#007AFF'}
            style={{ marginRight: 10 }}
          />
          <Text
            style={{ color: file ? '#2ECC71' : '#007AFF', fontWeight: 'bold' }}
          >
            {file
              ? `Arquivo Selecionado: ${file.name}`
              : 'Selecionar PDF ou Imagem'}
          </Text>
        </FilePickerButton>

        <SubmitButton onPress={handleSubmit} disabled={loadingUpload}>
          {loadingUpload ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <ButtonText>Enviar para Análise e Cadastro</ButtonText>
          )}
        </SubmitButton>
      </FormArea>
    </Container>
  );
}
