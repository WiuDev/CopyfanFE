import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  ScrollView,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import {
  Container,
  StyledInput,
  SubmitButton,
  SubmitButtonText,
  SectionTitle,
  DetailLabel,
} from './styles';

export default function AdminValues() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchCurrentPrices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/values');
      const pricesMap = response.data.values;
      const fetchedPricesArray = Object.values(pricesMap);
      fetchedPricesArray.sort((a, b) =>
        a.description.localeCompare(b.description),
      );

      setPrices(initialPricesMap);
      const initialPricesMap = fetchedPricesArray.map(item => ({
        ...item,
        displayValue: String(item.value),
      }));
      setPrices(initialPricesMap);
    } catch (error) {
      console.error('Erro ao buscar preços:', error);
      Alert.alert('Erro', 'Não foi possível carregar os preços vigentes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCurrentPrices();
    }, [fetchCurrentPrices]),
  );

  const handleValueChange = (id, newValue) => {
    setPrices(prevPrices =>
      prevPrices.map(price =>
        price.id === id ? { ...price, displayValue: newValue } : price,
      ),
    );
  };

  const handleSaveAll = async () => {
    const valuesToSend = prices
      .filter(price => {
        const originalValue = String(price.value);
        const newValue = price.displayValue.trim();
        const numericValue = parseFloat(newValue);

        return (
          newValue !== originalValue &&
          !isNaN(numericValue) &&
          numericValue >= 0
        );
      })
      .map(price => ({
        description: price.description,
        displayValue: price.displayValue,
      }));

    if (valuesToSend.length === 0) {
      Alert.alert('Atenção', 'Nenhum valor válido foi alterado.');
      return;
    }

    setSaving(true);
    try {
      const response = await api.post('/values', {
        updatedValues: valuesToSend,
      });

      Alert.alert(
        'Sucesso',
        response.data.message || 'Todos os preços foram atualizados.',
      );

      fetchCurrentPrices();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      Alert.alert(
        'Erro',
        error.response?.data?.error ||
          'Falha ao salvar as alterações de preço.',
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#5D82FB" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        enabled
    >
    <Container>
      <SectionTitle>Atualizar Preços (Admin)</SectionTitle>
      <Text style={{ marginBottom: 15, color: '#777' }}>
        Altere os valores e clique em Salvar para criar um novo registro
        vigente.
      </Text>

      <ScrollView style={{ flex: 1 }}>
        {prices.length > 0 ? (
          prices.map(price => (
            <View key={price.id} style={{ marginBottom: 15 }}>
              <DetailLabel style={{ marginBottom: 5 }}>
                {price.description}:
              </DetailLabel>
              <StyledInput
                keyboardType="numeric"
                value={price.displayValue}
                onChangeText={text =>
                  handleValueChange(price.id, text.replace(',', '.'))
                }
                placeholder={`Valor atual: R$ ${price.value}`}
              />
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 30 }}>
            Nenhum preço vigente encontrado.
          </Text>
        )}
      </ScrollView>

      <SubmitButton onPress={handleSaveAll} disabled={saving}>
        {saving ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <SubmitButtonText>Salvar Todas as Alterações</SubmitButtonText>
        )}
      </SubmitButton>
    </Container>
    </KeyboardAvoidingView>
  );
}
