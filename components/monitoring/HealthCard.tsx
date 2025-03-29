import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const resumenSalud = {
    ritmoCardiaco: 80,
    pasos: 4123,
    sueno: 6.5,
    actividad: 73,
  };
  

export default function ResumenSaludCard() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Resumen de Salud</Text>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.label}>Ritmo Cardíaco</Text>
          <Text style={styles.value}>{resumenSalud.ritmoCardiaco}</Text>
          <Text style={styles.unit}>ppm</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Pasos</Text>
          <Text style={styles.value}>{resumenSalud.pasos}</Text>
          <Text style={styles.unit}>hoy</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Sueño</Text>
          <Text style={styles.value}>{resumenSalud.sueno}</Text>
          <Text style={styles.unit}>horas</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Actividad</Text>
          <Text style={styles.value}>{resumenSalud.actividad}%</Text>
          <Text style={styles.unit}>normal</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    textAlign: 'center',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  unit: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
  },
});