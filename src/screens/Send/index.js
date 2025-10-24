import React, { useState, useEffect, useContext } from 'react';
import RNFS from 'react-native-fs';
import {
  Alert,
  ActivityIndicator,
  Text,
  Switch,
  TouchableOpacity,
  Modal,
  FlatList,
  View,
  Button,
} from 'react-native';
import { pick, keepLocalCopy, types } from '@react-native-documents/picker';
import Feather from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import CoursePicker from '../../components/CoursePicker';
import { AuthContext } from '../../contexts/auth';
import {
  Container,
  FormArea,
  ScreenTitle,
  FilePickerButton,
  SubmitButton,
  ButtonText,
  StyledInput,
  OptionRow,
  OptionText,
} from './styles';

export default function SendScreen() {
  const [name, setName] = useState('');
  const [classPeriod, setClassPeriod] = useState('');
  const [isPeriodModalVisible, setIsPeriodModalVisible] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [file, setFile] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const PERIODS = [
    { id: '1', label: '1º Periodo', value: '1º Periodo' },
    { id: '2', label: '2º Periodo', value: '2º Periodo' },
    { id: '3', label: '3º Periodo', value: '3º Periodo' },
    { id: '4', label: '4º Periodo', value: '4º Periodo' },
    { id: '5', label: '5º Periodo', value: '5º Periodo' },
    { id: '6', label: '6º Periodo', value: '6º Periodo' },
    { id: '7', label: '7º Periodo', value: '7º Periodo' },
    { id: '8', label: '8º Periodo', value: '8º Periodo' },
    { id: '9', label: '9º Periodo', value: '9º Periodo' },
    { id: '10', label: '10º Periodo', value: '10º Periodo' },
    { id: '0', label: 'Todos os Períodos', value: null },
  ];

  const isProfessor = user?.role === 'professor';
  const copyContentUriToFile = async (contentUri, fileName) => {
    const destPath = `${RNFS.CachesDirectoryPath}/${fileName}`;

    await RNFS.copyFile(contentUri, destPath);

    return `file://${destPath}`;
  };

  const handlePeriodSelect = value => {
    setClassPeriod(value);
    setIsPeriodModalVisible(false);
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
    if (!name || classPeriod === null || !courseId || !file) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos e selecione um arquivo.',
      );
      return;
    }

    setLoadingUpload(true);

    try {
      const visibilityStatus = isProfessor ? isVisible : false;
      const fileContentBase64 = await RNFS.readFile(file.uri, 'base64');

      if (!fileContentBase64) {
        throw new Error('Falha ao ler o conteúdo do arquivo localmente.');
      }

      const formData = new FormData();

      formData.append('name', name);
      formData.append('classPeriod', classPeriod);
      formData.append('course_id', courseId);
      formData.append('is_visible', visibilityStatus);
      formData.append('file', {
        uri: `data:${file.type};base64,${fileContentBase64}`,
        name: file.name,
        type: file.type,
      });
      console.log(file.uri, file.name, file.is_visible, file.type);

      await api.postForm('/materials', formData);
      console.log('Upload finalizado com sucesso');
      Alert.alert('Sucesso', 'Arquivo enviado e pronto para pedido!');
      setName('');
      setClassPeriod('');
      setCourseId(null);
      setFile(null);
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

        <OptionRow style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
          <TouchableOpacity
            // Use um estilo que imite um input
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              padding: 10,
              height: 50,
              backgroundColor: '#fff',
              marginBottom: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
            }}
            onPress={() => setIsPeriodModalVisible(true)}
          >
            <Text
              style={{
                color: classPeriod ? '#333' : '#888',
                fontSize: 16,
                marginLeft: 5,
              }}
            >
              {classPeriod || 'Selecione o Período/Turma'}
            </Text>
          </TouchableOpacity>
        </OptionRow>

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
        {isProfessor && (
          <OptionRow>
            <OptionText>Disponibilizar Lista para Alunos</OptionText>
            <Switch
              value={isVisible}
              onValueChange={setIsVisible}
              trackColor={{ false: '#767577', true: '#FF9C55' }}
              thumbColor={isVisible ? '#FFF' : '#f4f3f4'}
            />
          </OptionRow>
        )}

        <SubmitButton onPress={handleSubmit} disabled={loadingUpload}>
          {loadingUpload ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <ButtonText>Enviar Material</ButtonText>
          )}
        </SubmitButton>
      </FormArea>
      <Modal
        animationType="slide"
        visible={isPeriodModalVisible}
        onRequestClose={() => setIsPeriodModalVisible(false)}
        transparent={false}
      >
        <View style={{ flex: 1, backgroundColor: '#FFF', paddingTop: 50 }}>
          {/* CABEÇALHO DO MODAL */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}
            >
              Selecione o Período/Turma
            </Text>
          </View>

          {/* 🚨 AQUI VOCÊ COLA A FLATLIST */}
          <FlatList
            // Use o array PERIODS que você definiu no topo do SendScreen
            data={PERIODS.filter(p => p.value !== null)}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 15,
                  borderBottomWidth: 1,
                  borderColor: '#EEE',
                }}
                // Chama a função que salva o valor e fecha o modal
                onPress={() => handlePeriodSelect(item.value)}
              >
                <Text style={{ fontSize: 16 }}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />

          {/* BOTÃO FECHAR */}
          <Button
            title="Fechar"
            onPress={() => setIsPeriodModalVisible(false)}
          />
        </View>
      </Modal>
    </Container>
  );
}
