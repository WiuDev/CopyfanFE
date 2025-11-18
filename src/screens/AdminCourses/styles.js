import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Cores do Tema ---
const ADMIN_BLUE = '#5D82FB';
const ALERT_ORANGE = '#FF9C55'; // Para status de atenção
const BACKGROUND_LIGHT = '#F5F5F5';
const TEXT_DARK = '#121212';
const SUCCESS_GREEN = '#2ECC71';
const DANGER_RED = '#E74C3C';


// =======================================================
// 1. Containers Raiz e Layouts Gerais (Usados em todas as telas Admin/Detail)
// =======================================================

// Container Raiz (Garante área segura e fundo)
export const Container = styled(SafeAreaView)`
  flex: 1; 
  background-color: ${BACKGROUND_LIGHT};
  padding: 15px;
`;

// ScrollView para o Conteúdo (Usado na OrderDetailScreen)
export const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 0 5px; /* Ajuste para não ter padding duplo com o Container */
`;

// View Centralizada (Para Loading/Erros)
export const CenteredView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// Título Principal da Seção (Usado em Admin, etc.)
export const SectionTitle = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  color: ${ADMIN_BLUE};
  margin-bottom: 15px;
`;

// =======================================================
// 2. Componentes de Formulário/Input
// =======================================================

// Input Padrão (Para Busca e Formulários)
export const StyledInput = styled(TextInput)`
  border-width: 1.5px;
  border-color: #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  height: 50px;
  background-color: #fff;
  color: ${TEXT_DARK};
  font-size: 16px;
  padding-left: 15px;
  /* 💡 Efeito de foco sutil */
  &:focus {
    border-color: ${ALERT_ORANGE}; 
  }
`;

// Botão Principal de Submissão (Usado para Salvar/Criar)
export const SubmitButton = styled(TouchableOpacity)`
  background-color: ${ADMIN_BLUE}; 
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 20px;
  elevation: 3;
`;

export const SubmitButtonText = styled(Text)`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

// =======================================================
// 3. Estilos de Listagem e Detalhes (AdminUsers e OrderDetail)
// =======================================================

// A. OrderDetail/Admin Panel Card
export const DetailCard = styled(View)`
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 0px 2px;
  shadow-radius: 4px;
`;

export const DetailRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

export const DetailLabel = styled(Text)`
  font-size: 15px;
  color: #777;
`;

export const DetailValue = styled(Text)`
  font-size: 15px;
  font-weight: 600;
  color: #333;
`;

// B. Status e Cores de Pagamento
export const StatusText = styled(Text)`
  font-size: 15px;
  font-weight: bold;
  color: ${props => (props.isPending ? ALERT_ORANGE : SUCCESS_GREEN)}; 
`;

// C. Gerenciamento de Usuários (UserListItem)
export const RoleActionText = styled(Text)`
    color: #fff;
    font-size: 12px;
    font-weight: bold;
`;

export const RoleActionButton = styled(TouchableOpacity)`
    /* Estilos dinâmicos de cor são aplicados diretamente no JSX */
    padding: 8px 12px;
    border-radius: 5px;
    margin-left: 10px;
`;

// D. Listagem de Cursos
export const CourseListItemContainer = styled(View)`
    padding: 15px;
    border-bottom-width: 1px;
    border-bottom-color: #f0f0f0;
    background-color: #fff;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const DeleteButton = styled(TouchableOpacity)`
    background-color: ${DANGER_RED}; 
    padding: 8px 12px;
    border-radius: 5px;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
`;

export const DeleteButtonText = styled(Text)`
    color: #fff;
    font-size: 12px;
    font-weight: bold;
`;
export const CourseItemText = styled(Text)`
    color: #333;
`;