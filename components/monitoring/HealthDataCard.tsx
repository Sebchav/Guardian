import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  label: string;
  value: string;
  percentage: number;
  color: string;
}

function ProgressBar({ label, value, percentage, color }: ProgressBarProps) {
  return (
    <View style={styles.progressItem}>
      <View style={styles.progressHeader}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

export default function DatosSaludCard() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Datos de salud</Text>

      <View style={styles.card}>
        <ProgressBar label="Ritmo Cardiaco" value="72 ppm" percentage={72} color="#4CAF50" />
        <ProgressBar label="Calidad de sueño" value="7.2 horas" percentage={72} color="#9370DB" />
        <ProgressBar label="Actividad diaria" value="85 %" percentage={85} color="#1E90FF" />
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
  progressItem: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    borderRadius: 5,
  },
});
