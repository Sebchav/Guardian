import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Solicitud {
  id: string;
  titulo: string;
  descripcion: string;
  asignado: string;
  estado: 'Pendiente' | 'Completado' | 'En proceso';
  fecha: string;
}

export default function SolicitudesRecientesCard() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([
    {
      id: '1',
      titulo: 'Compra de medicamentos',
      descripcion: 'Necesito que me compren el medicamento X',
      asignado: 'Ana',
      estado: 'Pendiente',
      fecha: 'Hace 2 horas',
    },
    {
      id: '2',
      titulo: 'Ayuda con la compra',
      descripcion: 'Necesito que me compren algunas frutas y verduras.',
      asignado: 'Carlos',
      estado: 'Completado',
      fecha: 'Hace 8 horas',
    },
    {
      id: '3',
      titulo: 'Visita al médico',
      descripcion: 'Necesito ayuda para hacer la compra semanal.',
      asignado: 'Ana',
      estado: 'En proceso',
      fecha: 'Hace 1 día',
    },
  ]);

  const cambiarEstado = (id: string) => {
    const opciones: Solicitud['estado'][] = ['Pendiente', 'Completado', 'En proceso'];
    const actual = solicitudes.find(s => s.id === id);
    if (!actual) return;

    const siguienteIndex = (opciones.indexOf(actual.estado) + 1) % opciones.length;
    const nuevoEstado = opciones[siguienteIndex];

    setSolicitudes(prev =>
      prev.map(s =>
        s.id === id ? { ...s, estado: nuevoEstado } : s
      )
    );
  };

  const getEstadoStyle = (estado: Solicitud['estado']) => {
    switch (estado) {
      case 'Pendiente':
        return { backgroundColor: '#FFF9C4', color: '#B59B00' };
      case 'Completado':
        return { backgroundColor: '#C8E6C9', color: '#388E3C' };
      case 'En proceso':
        return { backgroundColor: '#BBDEFB', color: '#1976D2' };
      default:
        return {};
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Solicitudes Recientes</Text>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.buttonText}>Nueva Solicitud</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {solicitudes.map((item) => {
          const estadoStyle = getEstadoStyle(item.estado);
          return (
            <View key={item.id} style={styles.cardItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.titulo}</Text>
                <Text style={styles.description}>{item.descripcion}</Text>
                <Text style={styles.asignado}>Asignado a: {item.asignado}</Text>
              </View>
              <View style={styles.bottomRow}>
                <TouchableOpacity
                  onPress={() => cambiarEstado(item.id)}
                  style={[styles.estadoBadge, { backgroundColor: estadoStyle.backgroundColor }]}
                >
                  <Text style={{ color: estadoStyle.color, fontWeight: '600' }}>{item.estado}</Text>
                </TouchableOpacity>
                <Text style={styles.fecha}>{item.fecha}</Text>
              </View>
            </View>
          );
        })}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#7C78FF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    gap: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  listContainer: {
    marginTop: 16,
    gap: 12,
  },
  cardItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  asignado: {
    fontSize: 12,
    color: '#888',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  estadoBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  fecha: {
    fontSize: 12,
    color: '#999',
  },
});
