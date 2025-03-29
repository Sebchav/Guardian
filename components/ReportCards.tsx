import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const resumenSemanalData = [
  {
    semana: 'Semana 10 (4-10 Mar)',
    actividad: 'Alta',
    pasos: 10234,
    ritmoCardiaco: '72 ppm',
    sueño: '7.5 hrs/día',
    mensajes: 5,
    llamadas: 3,
    alertas: 0,
    solicitudes: 4,
  },
  {
    semana: 'Semana 9 (26 Feb - 3 Mar)',
    actividad: 'Moderada',
    pasos: 8342,
    ritmoCardiaco: '75 ppm',
    sueño: '6.9 hrs/día',
    mensajes: 3,
    llamadas: 4,
    alertas: 1,
    solicitudes: 2,
  },
  {
    semana: 'Semana 8 (19-25 Feb)',
    actividad: 'Baja',
    pasos: 6241,
    ritmoCardiaco: '80 ppm',
    sueño: '6.2 hrs/día',
    mensajes: 2,
    llamadas: 2,
    alertas: 2,
    solicitudes: 1,
  },
  // ... agrega 7 semanas más simuladas si lo deseas
];

const resumenMensualData = [
  {
    mes: 'Marzo 2025',
    actividad: 'Alta',
    pasos: 40320,
    ritmoCardiaco: '72 ppm',
    sueño: '7.2 hrs/día',
    mensajes: 22,
    llamadas: 15,
    alertas: 1,
    solicitudes: 10,
  },
  {
    mes: 'Febrero 2025',
    actividad: 'Moderada',
    pasos: 34100,
    ritmoCardiaco: '76 ppm',
    sueño: '6.5 hrs/día',
    mensajes: 18,
    llamadas: 10,
    alertas: 3,
    solicitudes: 6,
  },
  {
    mes: 'Enero 2025',
    actividad: 'Baja',
    pasos: 28430,
    ritmoCardiaco: '78 ppm',
    sueño: '6.0 hrs/día',
    mensajes: 12,
    llamadas: 7,
    alertas: 5,
    solicitudes: 4,
  },
  {
    mes: 'Diciembre 2024',
    actividad: 'Moderada',
    pasos: 32000,
    ritmoCardiaco: '74 ppm',
    sueño: '6.8 hrs/día',
    mensajes: 15,
    llamadas: 11,
    alertas: 2,
    solicitudes: 5,
  },
];

export default function ReportesResumenesCard() {
  const [modo, setModo] = useState<'semanal' | 'mensual'>('semanal');
  const [indice, setIndice] = useState(0);

  const data = modo === 'semanal' ? resumenSemanalData : resumenMensualData;
  const actual = data[indice];

  const cambiarIndice = (nuevo: number) => {
    if (nuevo >= 0 && nuevo < data.length) setIndice(nuevo);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => {
            setModo('semanal');
            setIndice(0);
          }}
        >
          <Text style={[styles.tabText, modo === 'semanal' && styles.selectedTab]}>Resumen semanal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModo('mensual');
            setIndice(0);
          }}
        >
          <Text style={[styles.tabText, modo === 'mensual' && styles.selectedTab]}>Resumen mensual</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            onPress={() => cambiarIndice(indice + 1)}
            disabled={indice >= data.length - 1}
          >
            <Ionicons name="arrow-back-circle-outline" size={24} color="#777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            // Aquí puedes implementar un selector personalizado si deseas.
            const nombres = data.map((d, i) => modo === 'semanal' ? d.semana : d.mes);
            const nombre = prompt('Selecciona periodo:\n' + nombres.join('\n'));
            const idx = nombres.findIndex(n => n === nombre);
            if (idx !== -1) setIndice(idx);
          }}>
            <Ionicons name="filter-outline" size={22} color="#777" />
          </TouchableOpacity>
        </View>

        <Text style={styles.periodo}>{modo === 'semanal' ? actual.semana : actual.mes}</Text>
        <View style={styles.item}><Text style={styles.label}>Actividad:</Text> <Text>{actual.actividad}</Text></View>
        <View style={styles.item}><Text style={styles.label}>Pasos:</Text> <Text>{actual.pasos.toLocaleString()}</Text></View>
        <View style={styles.item}><Text style={styles.label}>Ritmo cardíaco:</Text> <Text>{actual.ritmoCardiaco}</Text></View>
        <View style={styles.item}><Text style={styles.label}>Sueño:</Text> <Text>{actual.sueño}</Text></View>
        <View style={styles.item}><Text style={styles.label}>Mensajes:</Text> <Text>{actual.mensajes}</Text></View>
        <View style={styles.item}><Text style={styles.label}>Llamadas:</Text> <Text>{actual.llamadas}</Text></View>
        <View style={styles.item}><Text style={styles.label}>Alertas:</Text> <Text>{actual.alertas}</Text></View>
        <View style={styles.item}><Text style={styles.label}>Solicitudes:</Text> <Text>{actual.solicitudes}</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    paddingLeft: 6,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  selectedTab: {
    textDecorationLine: 'underline',
    color: '#4B6FFF',
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  periodo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontWeight: '500',
    color: '#555',
  },
});
