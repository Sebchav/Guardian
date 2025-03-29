import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DeviceProps {
  name: string;
  status: string;
}

function DeviceItem({ name, status }: DeviceProps) {
  return (
    <View style={styles.deviceRow}>
      <View style={styles.deviceInfo}>
        <View style={styles.iconCircle}>
          <Ionicons name="pulse-outline" size={20} color="#2e7d32" />
        </View>
        <View>
          <Text style={styles.deviceName}>{name}</Text>
          <Text style={styles.deviceStatus}>{status}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.configButton}>
        <Text style={styles.configText}>configurar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function DispositivosConectadosCard() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Dispositivos Conectados</Text>
      <View style={styles.card}>
        <DeviceItem name="Apple Watch" status="Conectado" />
        <DeviceItem name="Alexa Echo" status="Conectado" />
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
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#b2f2bb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceName: {
    fontWeight: '600',
    fontSize: 15,
    color: '#333',
  },
  deviceStatus: {
    fontSize: 13,
    color: 'green',
  },
  configButton: {
    backgroundColor: '#f6f6f6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  configText: {
    color: '#333',
    fontSize: 14,
  },
});