import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SemanaResumen {
  semana: string;
  pasos: number;
  ritmoCardiacoPromedio: number;
  horasSueno: number;
  actividadFisica: string;
  alertas: number;
}

interface MesResumen {
  mes: string;
  pasos: number;
  ritmoCardiacoPromedio: number;
  horasSueno: number;
  actividadFisica: string;
  alertas: number;
}

const semanasMock: SemanaResumen[] = [
  { semana: 'Semana 1 (Mar 18 - Mar 24)', pasos: 30500, ritmoCardiacoPromedio: 72, horasSueno: 49, actividadFisica: 'Alta', alertas: 1 },
  { semana: 'Semana 2 (Mar 11 - Mar 17)', pasos: 25000, ritmoCardiacoPromedio: 70, horasSueno: 45, actividadFisica: 'Moderada', alertas: 0 },
  { semana: 'Semana 3 (Mar 4 - Mar 10)', pasos: 20000, ritmoCardiacoPromedio: 75, horasSueno: 40, actividadFisica: 'Baja', alertas: 2 },
  { semana: 'Semana 4 (Feb 26 - Mar 3)', pasos: 32000, ritmoCardiacoPromedio: 68, horasSueno: 50, actividadFisica: 'Alta', alertas: 0 },
  { semana: 'Semana 5 (Feb 19 - Feb 25)', pasos: 27000, ritmoCardiacoPromedio: 73, horasSueno: 46, actividadFisica: 'Moderada', alertas: 1 },
  { semana: 'Semana 6 (Feb 12 - Feb 18)', pasos: 18000, ritmoCardiacoPromedio: 78, horasSueno: 42, actividadFisica: 'Baja', alertas: 3 },
  { semana: 'Semana 7 (Feb 5 - Feb 11)', pasos: 31000, ritmoCardiacoPromedio: 70, horasSueno: 48, actividadFisica: 'Alta', alertas: 0 },
  { semana: 'Semana 8 (Ene 29 - Feb 4)', pasos: 23000, ritmoCardiacoPromedio: 74, horasSueno: 44, actividadFisica: 'Moderada', alertas: 1 },
  { semana: 'Semana 9 (Ene 22 - Ene 28)', pasos: 26000, ritmoCardiacoPromedio: 72, horasSueno: 47, actividadFisica: 'Moderada', alertas: 2 },
  { semana: 'Semana 10 (Ene 15 - Ene 21)', pasos: 19500, ritmoCardiacoPromedio: 76, horasSueno: 39, actividadFisica: 'Baja', alertas: 3 },
];

const mesesMock: MesResumen[] = [
  { mes: 'Marzo 2025', pasos: 122000, ritmoCardiacoPromedio: 72, horasSueno: 200, actividadFisica: 'Moderada', alertas: 3 },
  { mes: 'Febrero 2025', pasos: 105000, ritmoCardiacoPromedio: 73, horasSueno: 195, actividadFisica: 'Alta', alertas: 2 },
  { mes: 'Enero 2025', pasos: 98000, ritmoCardiacoPromedio: 74, horasSueno: 190, actividadFisica: 'Moderada', alertas: 4 },
  { mes: 'Diciembre 2024', pasos: 89000, ritmoCardiacoPromedio: 75, horasSueno: 185, actividadFisica: 'Baja', alertas: 5 },
];

export default function ReportesResumenesCard() {
  const [tipo, setTipo] = useState<'semanal' | 'mensual'>('semanal');
  const [indice, setIndice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const datos = tipo === 'semanal' ? semanasMock : mesesMock;
  const resumenActual = datos[indice];

  const seleccionarItem = (i: number) => {
    setIndice(i);
    setModalVisible(false);
  };

  return (
    <View style={{ marginTop: 24 }}>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setTipo('semanal')} style={[styles.tab, tipo === 'semanal' && styles.tabActivo]}>
          <Text style={tipo === 'semanal' ? styles.tabTextActivo : styles.tabText}>Resumen semanal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTipo('mensual')} style={[styles.tab, tipo === 'mensual' && styles.tabActivo]}>
          <Text style={tipo === 'mensual' ? styles.tabTextActivo : styles.tabText}>Resumen mensual</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => setIndice((prev) => Math.min(prev + 1, datos.length - 1))}>
            <Ionicons name="arrow-back-circle-outline" size={24} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="filter-outline" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{tipo === 'semanal' ? resumenActual.semana : resumenActual.mes}</Text>
          <Text style={styles.label}>Pasos: <Text style={styles.value}>{resumenActual.pasos}</Text></Text>
          <Text style={styles.label}>Ritmo Cardíaco Promedio: <Text style={styles.value}>{resumenActual.ritmoCardiacoPromedio} ppm</Text></Text>
          <Text style={styles.label}>Horas de Sueño: <Text style={styles.value}>{resumenActual.horasSueno} hrs</Text></Text>
          <Text style={styles.label}>Actividad Física: <Text style={styles.value}>{resumenActual.actividadFisica}</Text></Text>
          <Text style={styles.label}>Alertas Registradas: <Text style={styles.value}>{resumenActual.alertas}</Text></Text>
        </View>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
            Selecciona una {tipo === 'semanal' ? 'semana' : 'mes'}
          </Text>
          {datos.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.selectorItem}
              onPress={() => seleccionarItem(i)}
            >
              <Text style={{ fontSize: 16 }}>
                {tipo === 'semanal' ? (item as SemanaResumen).semana : (item as MesResumen).mes}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20 }}>
            <Text style={{ color: '#4B6FFF', textAlign: 'center' }}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActivo: {
    borderBottomColor: '#7C78FF',
  },
  tabText: {
    color: '#333',
  },
  tabTextActivo: {
    color: '#000',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoContainer: {
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#444',
  },
  value: {
    fontWeight: '600',
    color: '#000',
  },
  selectorItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
