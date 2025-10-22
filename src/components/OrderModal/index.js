import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import {
  ScreenContainer,
  FormSection,
  HeaderTitle,
  OptionRow,
  PriceDisplay,
  CalculatedPriceText,
  StyledInput,
  CalculatedPriceLabel,
  CancelButtonText,
  PriceValueContainer,
  SubmitButton,
  SubmitButtonText,
} from './styles';

export default function OrderModal({ route }) {
  const navigation = useNavigation();
  const materialId = route.params?.materialId;
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [colored, setColored] = useState(false);
  const [binding, setBinding] = useState(false);
  const [frontBack, setFrontBack] = useState(false);

  const [calculatedPrice, setCalculatedPrice] = useState('R$ 0,00');
  const [rawPrice, setRawPrice] = useState(0);
  const [loadingPrice, setLoadingPrice] = useState(false);

  useEffect(() => {
    if (!startPage || !endPage || !quantity) {
      setCalculatedPrice('R$ 0,00');
      return;
    }
    const numStart = Number(startPage);
    const numEnd = Number(endPage);
    const numQuantity = Number(quantity);

    if (
      !materialId ||
      isNaN(numStart) ||
      isNaN(numEnd) ||
      isNaN(numQuantity) ||
      numStart <= 0 ||
      numQuantity <= 0
    ) {
      setCalculatedPrice('R$ 0,00');
      return;
    }
    if (numStart > numEnd) {
      setCalculatedPrice('Páginas inválidas');
      return;
    }

    setLoadingPrice(true);

    const delayDebounce = setTimeout(async () => {
      try {
        const dataToSend = {
          material_id: materialId,
          start_page: numStart,
          end_page: numEnd,
          quantity: numQuantity,
          colored: colored,
          binding: binding,
          front_back: frontBack,
        };
        const response = await api.post('/orders/calculate', dataToSend);
        setCalculatedPrice(response.data.formattedPrice);
        setRawPrice(response.data.totalPrice);
      } catch (error) {
        console.error('Erro ao calcular o preço:', error);
        setCalculatedPrice('Erro ao calcular');
      } finally {
        setLoadingPrice(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [startPage, endPage, quantity, colored, binding, frontBack, materialId]);

  const handleCreateOrder = async () => {
    if (!startPage || !endPage || !quantity || !materialId) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (loadingPrice) {
      Alert.alert('Aguarde', 'O cálculo do preço ainda está em andamento.');
      return;
    }
    const materialItemData = {
      material_id: materialId,
      start_page: Number(startPage),
      end_page: Number(endPage),
      quantity: Number(quantity),
      colored: colored,
      binding: binding,
      front_back: frontBack,
    };
    const orderData = {
      totalValue: rawPrice,
      methodPayment: 'Pix',
      materials: [materialItemData],
    };
    try {
      const response = await api.post('/orders', orderData);
      const pedidoIdCurto = response.data.order.substring(0, 8);

      if (response && response.data && response.data.order) {
        Alert.alert(
          `Pedido # ${pedidoIdCurto} Enviado!`,

          `Seu pedido foi criado com sucesso.\nTotal a pagar: ${calculatedPrice}.`,
          [
            {
              text: 'OK',
              onPress: () =>
                navigation.navigate('MainTabs', {
                  screen: 'Orders',
                }),
            },
          ],
        );
        return;
      }
    } catch (error) {
      const pedidoIdCurto = successfulResponse.data.order.substring(0, 8);

      if (error.response && error.response.status === 201) {
        const successfulResponse = error.response;

        if (successfulResponse.data && successfulResponse.data.order) {
          Alert.alert(
            `Pedido # ${pedidoIdCurto} Enviado!`,

            `Seu pedido foi criado com sucesso.\nTotal a pagar: ${calculatedPrice}.`,
            [
              {
                text: 'OK',
                onPress: () =>
                  navigation.navigate('MainTabs', {
                    screen: 'Orders',
                  }),
              },
            ],
          );
          return;
        }
      }

      const errorMessage =
        error.response?.data?.error || 'Não foi possível criar o pedido.';
      Alert.alert('Falha', errorMessage);
      console.error('Erro na criação do pedido:', error);
    }
  };

  return (
    <ScreenContainer contentContainerStyle={{ paddingBottom: 50 }}>
      <FormSection>
        <HeaderTitle>Configurar Impressão</HeaderTitle>
        <Text>Página Inicial</Text>
        <StyledInput
          placeholder="Página Inicial (Ex: 1)"
          value={startPage}
          onChangeText={setStartPage}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
        <Text>Página Final</Text>
        <StyledInput
          placeholder="Página Final (Ex: 50)"
          value={endPage}
          onChangeText={setEndPage}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
        <Text>Quantidade</Text>
        <StyledInput
          placeholder="Quantidade de Cópias"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        <OptionRow>
          <Text>Impressão Colorida</Text>
          <Switch value={colored} onValueChange={setColored} />
        </OptionRow>
        <OptionRow>
          <Text>Frente e Verso</Text>
          <Switch value={frontBack} onValueChange={setFrontBack} />
        </OptionRow>
        <OptionRow style={{ borderBottomWidth: 0 }}>
          <Text>Encadernação</Text>
          <Switch value={binding} onValueChange={setBinding} />
        </OptionRow>
      </FormSection>

      <PriceDisplay>
        <CalculatedPriceLabel>Custo Estimado:</CalculatedPriceLabel>
        <PriceValueContainer>
          {loadingPrice ? (
            <View style={{ height: 38, justifyContent: 'center' }}>
              <ActivityIndicator size="small" color="#FF9C55" />
            </View>
          ) : (
            <CalculatedPriceText>{calculatedPrice}</CalculatedPriceText>
          )}
        </PriceValueContainer>
      </PriceDisplay>
      <SubmitButton onPress={handleCreateOrder} disabled={loadingPrice}>
        <SubmitButtonText> Criar Pedido </SubmitButtonText>
      </SubmitButton>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ alignItems: 'center' }}
      >
        <CancelButtonText>Cancelar</CancelButtonText>
      </TouchableOpacity>
    </ScreenContainer>
  );
}
