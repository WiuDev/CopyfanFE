import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Button, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Container,
  PdfContainer,
  BottomActionArea,
  MaterialInfoText,
} from './styles';
import api from '../../services/api';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';

export default function MaterialDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const materialId = route.params?.materialId;

  const [materialDetails, setMaterialDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [localFileUri, setLocalFileUri] = useState(null);

  const downloadUrl = `${api.defaults.baseURL}/materials/${materialId}`;

  useEffect(() => {
    if (!materialId) {
      setLoading(false);
      return;
    }
    async function processMaterial() {
      setDownloading(true);

      const token = await AsyncStorage.getItem('@Copyfan');
      if (!token) {
        throw new Error('Usuário não autenticado. Faça login novamente.');
      }

      const tempFileName = `material_${materialId}.pdf`;
      const localPath = `${RNFS.CachesDirectoryPath}/${tempFileName}`;

      try {
        const metaResponse = await api.get(`/materials/${materialId}/metadata`);
        console.log('Detalhes do material obtidos:', metaResponse.data);
        setMaterialDetails(metaResponse.data);
        const downloadHeaders = {
          Authorization: `Bearer ${token}`,
        };

        const response = await RNFS.downloadFile({
          fromUrl: downloadUrl,
          toFile: localPath,
          headers: downloadHeaders,
        }).promise;

        if (response.statusCode === 200) {
          setLocalFileUri(`file://${localPath}`);
        } else {
          throw new Error(`Falha no download (Status: ${response.statusCode})`);
        }
      } catch (error) {
        console.error('Erro ao processar material para visualização:', error);
        Alert.alert(
          'Erro',
          'Não foi possível carregar ou baixar o material para visualização.',
        );
      } finally {
        setLoading(false);
        setDownloading(false);
      }
    }
    processMaterial();
  }, [materialId]);
  const handleStartOrder = () => {
    if (!materialId) return;
    navigation.navigate('OrderConfigModal', { materialId: materialId });
  };

  return (
    <Container>
      <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 15 }}>
        {materialDetails?.name || 'Carregando Material...'}
      </Text>
      <PdfContainer>
        {loading || downloading ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ flex: 1 }} />
        ) : localFileUri ? (
          <Pdf
            source={{ uri: localFileUri }}
            style={{ flex: 1, width: '100%' }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`PDF carregado com ${numberOfPages} páginas`);
            }}
            onError={error => {
              console.error('Erro no PDF Viewer:', error);
              Alert.alert('Erro', 'Falha ao renderizar o PDF.');
            }}
          />
        ) : (
          <Text
            style={{ textAlign: 'center', marginTop: 50, color: '#E74C3C' }}
          >
            Não foi possível carregar o arquivo.
          </Text>
        )}
      </PdfContainer>
      <BottomActionArea>
        <MaterialInfoText>
          Total de Páginas: {materialDetails?.total_pages || 'N/A'}
        </MaterialInfoText>

        <Button
          title="Configurar Impressão e Pedir"
          color="#007AFF"
          onPress={handleStartOrder}
          disabled={downloading}
        />
      </BottomActionArea>
    </Container>
  );
}
