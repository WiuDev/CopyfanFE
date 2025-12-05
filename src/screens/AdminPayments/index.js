import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, ScrollView } from 'react-native';
import api from '../../services/api'; 
import { useFocusEffect } from '@react-navigation/native';
import { Container, SectionTitle, CenteredView } from './styles'; 

const STATUS_MAP = {
    'pending': 'Aguardando Pagamento',
    'failed': 'Falha no Pagamento',
    'completed': 'Concluído',
};

const getTranslatedStatus = (status) => {
    return STATUS_MAP[status] || status.replace('_', ' ');
};

const PaymentListItem = ({ item }) => {
    const formattedValue = parseFloat(item.totalValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const isCompleted = item.statusPayment === 'completed';
    const statusColor = isCompleted ? '#2ECC71' : (item.statusPayment === 'pending' ? '#FF9C55' : '#E74C3C');
    
    return (
        <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <Text style={{ fontWeight: 'bold', color: isCompleted ? '#333' : '#777' }}>Pedido #{item.order_id.substring(0, 8)}</Text>
                <Text style={{ fontSize: 12, color: statusColor }}>
                    Status: {getTranslatedStatus(item.statusPayment).toUpperCase()}
                </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{formattedValue}</Text>
                <Text style={{ fontSize: 12, color: '#777' }}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            </View>
        </View>
    );
};


export default function AdminPayments() {
    const [report, setReport] = useState({ payments: [], totalRevenue: '0.00' });
    const [loading, setLoading] = useState(true);

    const fetchReport = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/payments/admin/report');
            setReport(response.data);
        } catch (error) {
            console.error("Erro ao carregar pagamentos admin:", error);
            Alert.alert('Erro', 'Acesso negado ou falha ao buscar dados.');
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(useCallback(() => {
        fetchReport();
    }, [fetchReport]));

    const totalRevenueFloat = parseFloat(report.totalRevenue);
    const formattedRevenue = totalRevenueFloat.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    if (loading) {
        return <CenteredView><ActivityIndicator size="large" color="#5D82FB" /></CenteredView>;
    }

    return (
        <Container>
            <View style={{ backgroundColor: '#5D82FB', padding: 20, borderRadius: 10, marginBottom: 20, elevation: 5 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }}>SALDO TOTAL:</Text>
                <Text style={{ color: '#fff', fontSize: 36, fontWeight: 'bold', marginTop: 5 }}>{formattedRevenue}</Text>
                <Text style={{ color: '#fff', fontSize: 12, opacity: 0.8 }}>
                    Transações Completas: {report.payments.filter(p => p.statusPayment === 'completed').length}
                </Text>
            </View>

            <SectionTitle>Histórico de Transações</SectionTitle>

            {report.payments.length === 0 ? (
                <Text style={{ textAlign: 'center', color: '#777', marginTop: 20 }}>Nenhuma transação concluída.</Text>
            ) : (
                <FlatList
                    data={report.payments}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <PaymentListItem item={item} />}
                />
            )}
        </Container>
    );
}