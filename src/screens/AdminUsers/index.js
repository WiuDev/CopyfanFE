import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import {
  Container,
  SectionTitle,
  CenteredView,
  StyledInput,
  RoleActionText,
} from './styles';
import RoleSelectorModal from '../../components/RoleSelectorModal';

const ALL_ROLES = ['user', 'professor', 'admin'];

const UserListItem = ({ user, onPress, currentUserId }) => {
  const isSelf = user.id === currentUserId;
  const currentRole = user.role;
  const isOwner = currentRole === 'admin';

  const roleColor = isOwner
    ? '#FF9C55'
    : currentRole === 'professor'
    ? '#007AFF'
    : '#5D82FB';

  return (
    <TouchableOpacity
      onPress={isSelf ? null : onPress}
      disabled={isSelf}
      style={{
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
        backgroundColor: isOwner ? '#FFF9E5' : '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: isSelf ? 0.6 : 1,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{user.name}</Text>
        <Text style={{ fontSize: 13, color: '#777' }}>{user.email}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 13,
            color: roleColor,
            marginBottom: 4,
          }}
        >
          {currentRole.toUpperCase()}
        </Text>
        <RoleActionText
          style={{ color: '#5D82FB', fontSize: 11, fontWeight: '600' }}
        >
          {isSelf ? '(Você)' : 'CLIQUE para alterar'}
        </RoleActionText>
      </View>
    </TouchableOpacity>
  );
};

export default function AdminUsers() {
  const { user } = useContext(AuthContext);
  const currentUserId = user?.id;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [userToEdit, setUserToEdit] = useState(null);
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);

  const isAdmin = user?.role === 'admin';

  const fetchUsers = useCallback(
    async (search = '') => {
      if (!isAdmin) return;

      setLoading(true);
      try {
        const response = await api.get(`/users?search=${search}`);
        setUsers(response.data);
      } catch (error) {
        Alert.alert(
          'Erro',
          error.response?.data?.error || 'Falha ao buscar a lista de usuários.',
        );
        setUsers([]);
      } finally {
        setLoading(false);
      }
    },
    [isAdmin],
  );

  useEffect(() => {
    if (!isAdmin) return;

    const handler = setTimeout(() => {
      fetchUsers(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, fetchUsers, isAdmin]);

  const handleRoleChange = async (userId, newRole) => {
    setLoading(true);
    try {
      await api.put(`/users/${userId}`, { role: newRole });

      setIsRoleModalVisible(false);
      fetchUsers(searchTerm);
      Alert.alert(
        'Sucesso',
        `Role do usuário alterada para ${newRole.toUpperCase()}.`,
      );
    } catch (error) {
      Alert.alert(
        'Erro',
        error.response?.data?.error || 'Falha ao alterar a permissão.',
      );
    }
  };

  const openRoleModal = userItem => {
    if (userItem.id === currentUserId) {
      Alert.alert(
        'Atenção',
        'Você não pode alterar sua própria permissão nesta tela.',
      );
      return;
    }
    setUserToEdit(userItem);
    setIsRoleModalVisible(true);
  };

  if (!isAdmin) {
    return (
      <CenteredView>
        <Text style={{ color: '#E74C3C', fontSize: 18 }}>
          Acesso Negado. Você não é um administrador.
        </Text>
      </CenteredView>
    );
  }

  if (loading && users.length === 0) {
    return (
      <CenteredView>
        <ActivityIndicator size="large" color="#5D82FB" />
      </CenteredView>
    );
  }

  return (
    <Container>
      <SectionTitle>Gerenciamento de Usuários</SectionTitle>
      <StyledInput
        placeholder="Buscar por Nome ou Email..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={{ marginBottom: 20 }}
      />
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <UserListItem
            user={item} // O clique agora abre o modal
            onPress={() => openRoleModal(item)}
            currentUserId={currentUserId}
          />
        )}
        refreshing={loading}
        onRefresh={() => fetchUsers('')}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#777', marginTop: 20 }}>
            {searchTerm
              ? 'Nenhum usuário encontrado.'
              : 'Nenhum usuário cadastrado.'}
          </Text>
        }
      />
      <RoleSelectorModal
        isVisible={isRoleModalVisible}
        user={userToEdit}
        allRoles={ALL_ROLES}
        onClose={() => setIsRoleModalVisible(false)}
        onRoleChange={handleRoleChange}
      />
    </Container>
  );
}
