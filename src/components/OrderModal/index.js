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
      isNaN(numStart) ||
      numStart <= 0 ||
      isNaN(numEnd) ||
      numEnd <= 0 ||
      isNaN(numQuantity) ||
      numQuantity <= 0
    ) {
      setCalculatedPrice('Valores Inválidos');
      return;
    }
    if (numStart > numEnd) {
      setCalculatedPrice('Pág. Final < Pág. Inicial');
      return;
    }
    if (!materialId) {
      setCalculatedPrice('Material Indisponível');
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
      // 💡 NOVA LÓGICA DE TRATAMENTO DE ERRO (Defensiva)
        let priceErrorMsg = 'Erro ao calcular';

        // 1. Tentar obter a mensagem do backend de forma segura
        const apiMessage =
          error.response?.data?.message || error.response?.data?.error;
        const statusCode = error.response?.status;

        if (statusCode === 400) {
          // Erro de Validação de Regra de Negócio
          if (apiMessage) {
            // Se o backend enviou uma mensagem específica (ex: "Página final excede o limite")
            priceErrorMsg = apiMessage;
          } else {
            // Mensagem padrão para 400 (Bad Request) que o frontend pode inferir.
            priceErrorMsg = 'Página fora do limite ou dados inválidos';
          }
        } else if (statusCode === 401 || statusCode === 403) {
          // Erros de autenticação/autorização
          priceErrorMsg = 'Não autorizado a calcular preço';
        } else if (statusCode) {
          // Outros erros HTTP
          priceErrorMsg = `Erro ${statusCode} - Falha na API`;
        }
        // Se error.response for undefined (erro de rede, timeout), priceErrorMsg será 'Erro ao calcular' (padrão)

        setCalculatedPrice(priceErrorMsg);
      } finally {
        setLoadingPrice(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [startPage, endPage, quantity, colored, binding, frontBack, materialId]);

  const handleCreateOrder = async () => {
    const numStart = Number(startPage);
    const numEnd = Number(endPage);
    const numQuantity = Number(quantity);
    if (!startPage || !endPage || !quantity || !materialId) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (isNaN(numStart) || isNaN(numEnd) || isNaN(numQuantity)) {
      Alert.alert(
        'Erro',
        'As páginas e a quantidade devem ser números válidos.',
      );
      return;
    }
    if (numStart <= 0 || numEnd <= 0 || numQuantity <= 0) {
      Alert.alert(
        'Erro',
        'As páginas e a quantidade devem ser maiores que zero.',
      );
      return;
    }
    if (numStart > numEnd) {
      Alert.alert(
        'Erro',
        'A "Página Inicial" não pode ser maior que a "Página Final".',
      );
      return;
    }
    if (
      rawPrice <= 0 ||
      calculatedPrice === 'Erro ao calcular' ||
      calculatedPrice === 'Valores Inválidos' ||
      calculatedPrice === 'Pág. Final < Pág. Inicial'
    ) {
      Alert.alert(
        'Erro',
        'O preço não foi calculado corretamente. Verifique os campos e tente novamente.',
      );
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
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Ocorreu um erro. Verifique sua conexão ou tente novamente.';

      Alert.alert('Falha ao Criar Pedido', errorMessage);
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
