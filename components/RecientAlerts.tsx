import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Alerta {
  id: string;
  tipo: string;
  tiempo: string;
}

export default function AlertasRecientesCard() {
  const [alertas, setAlertas] = useState<Alerta[]>([
    {
      id: '1',
      tipo: 'Caída detectada',
      tiempo: 'Hace 1 minuto',
    },
    // Puedes agregar más alertas si deseas
  ]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Alertas</Text>
      <View style={styles.card}>
        {alertas.map((alerta) => (
          <View key={alerta.id} style={styles.alertItem}>
            <View style={styles.iconCircle}>
              <Ionicons name="alert" size={24} color="#C62828" />
            </View>
            <View>
              <Text style={styles.alertTitle}>{alerta.tipo}</Text>
              <Text style={styles.alertTime}>{alerta.tiempo}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffcdd2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
  },
  alertTime: {
    fontSize: 13,
    color: '#555',
  },
});
