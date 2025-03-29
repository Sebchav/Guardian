import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Alerta({
  message,
  type = 'info',
  onClose,
  duration = 3000,
}: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.alert, styles[type]]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    padding: 14,
    borderRadius: 8,
    marginTop: 2,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  success: {
    backgroundColor: '#4BB543',
  },
  error: {
    backgroundColor: '#D9534F',
  },
  info: {
    backgroundColor: '#5BC0DE',
  },
});
