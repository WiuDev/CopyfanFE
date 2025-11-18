import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Button,
} from 'react-native';

const ROLES = ['user', 'professor', 'admin'];

export default function RoleSelectorModal({
  isVisible,
  user,
  onClose,
  onRoleChange,
}) {
  if (!user) return null;

  const handleSelect = newRole => {
    if (newRole === user.role) {
      Alert.alert('Atenção', `O usuário já é ${newRole.toUpperCase()}.`);
      return;
    }
    onRoleChange(user.id, newRole);
    onClose();
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
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>
            Alterar Role para: {user.name}
          </Text>
          <FlatList
            data={ROLES}
            keyExtractor={r => r}
            renderItem={({ item: role }) => (
              <TouchableOpacity
                onPress={() => handleSelect(role)}
                style={{
                  padding: 15,
                  borderBottomWidth: 1,
                  borderColor: '#eee',
                }}
              >
                <Text
                  style={{
                    fontWeight: user.role === role ? 'bold' : 'normal',
                    color: user.role === role ? '#5D82FB' : '#333',
                  }}
                >
                  {role.toUpperCase()} {user.role === role ? '(Atual)' : ''}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Cancelar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}
