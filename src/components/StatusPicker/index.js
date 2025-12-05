import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PickerContainer } from './styles';

const ADMIN_STATUSES = [
  'waiting_payment',
  'processing',
  'completed',
  'canceled',
];

const STATUS_MAP = {
  'waiting_payment': 'Aguardando Pagamento',
  'processing': 'Em Processamento',
  'canceled': 'Cancelado',
  'completed': 'Concluído',
};

const getTranslatedStatus = (status) => {
  return STATUS_MAP[status] || status.replace('_', ' ');
};

export default function StatusPicker({
  currentStatus,
  onStatusChange,
  loadingUpdate,
}) {
  const displayStatus = currentStatus || ADMIN_STATUSES[0];

  if (!currentStatus) {
    return (
      <PickerContainer style={{ justifyContent: 'center' }}>
        <ActivityIndicator size="small" color="#007AFF" />
      </PickerContainer>
    );
  }

  return (
    <PickerContainer>
      <Picker
        selectedValue={currentStatus}
        onValueChange={onStatusChange}
        mode="dropdown"
        style={{ color: currentStatus ? '#121212' : '#A9A9A9' }}
      >
        {ADMIN_STATUSES.map(status => (
          <Picker.Item
            key={status}
            label={getTranslatedStatus(status).toUpperCase()}
            value={status}
          />
        ))}
      </Picker>
    </PickerContainer>
  );
}
