import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Datos simulados del usuario o del estado del dispositivo
const mockEstadoUsuario = {
  nombre: 'María',
  estado: 'emergencia', // 'activo', 'inactivo', 'emergencia'
};

export default function EstadoActualCard() {
  const { estado, nombre } = mockEstadoUsuario;
  const styles = getStyles(estado);

  const estados = {
    activo: {
      iconColor: '#2e7d32',
      title: 'Todo en orden',
      subtitle: `${nombre} está bien y activa`,
    },
    inactivo: {
      iconColor: '#b26a00',
      title: 'Sin actividad detectada',
      subtitle: `No se detecta uso de la pulsera de ${nombre}`,
    },
    emergencia: {
      iconColor: '#c62828',
      title: '¡Emergencia detectada!',
      subtitle: `${nombre} podría necesitar ayuda urgente`,
    },
  };

  const current = estados[estado];

  return (
    <View>
      <Text style={styles.sectionTitle}>Estado Actual</Text>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="pulse-outline" size={24} color={current.iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.subtitle}>{current.subtitle}</Text>
        </View>
      </View>
    </View>
  );
}

const getStyles = (estado: string) => {
  const colors = {
    activo: {
      bg: '#e6fbe6',
      border: '#4CAF50',
      iconBg: '#b2f2bb',
      title: '#2e7d32',
      subtitle: '#4CAF50',
    },
    inactivo: {
      bg: '#fff5e6',
      border: '#ffa726',
      iconBg: '#ffecb3',
      title: '#b26a00',
      subtitle: '#fb8c00',
    },
    emergencia: {
      bg: '#fdecea',
      border: '#f44336',
      iconBg: '#ffcdd2',
      title: '#c62828',
      subtitle: '#e53935',
    },
  }[estado];

  return StyleSheet.create({
    sectionTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 10,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 12,
      padding: 12,
    },
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.iconBg,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      color: colors.title,
      fontWeight: 'bold',
      fontSize: 16,
    },
    subtitle: {
      color: colors.subtitle,
      fontSize: 13,
    },
  });
};