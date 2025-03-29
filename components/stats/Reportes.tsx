import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReporteDiario {
  id: number;
  label: string;
  locked: boolean;
}

export default function ReportesDiarios() {
  // Ejemplo: si suscrito = true, todo accesible; si suscrito = false, hay bloqueo.
  const suscrito = false;

  // Lista de reportes diarios
  const reportes: ReporteDiario[] = [
    { id: 1, label: 'Hoy', locked: false },
    { id: 2, label: 'Ayer', locked: false },
    { id: 3, label: '27 Marzo', locked: false },
    // El cuarto reporte se bloquea si no está suscrito
    { id: 4, label: '26 Marzo', locked: !suscrito },
  ];

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Reportes diarios</Text>

        {/* Botón 'Ver todos' */}
        <TouchableOpacity
          style={[styles.verTodosBtn, !suscrito && styles.btnBloqueado]}
          disabled={!suscrito}
          onPress={() => {
            if (suscrito) {
              // Lógica para ver todos
            }
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[
                styles.verTodosText,
                !suscrito && { color: '#999' },
              ]}
            >
              Ver todos
            </Text>
            {/* Si no está suscrito, se muestra candado */}
            {!suscrito && (
              <Ionicons
                name="lock-closed-outline"
                size={16}
                color="#999"
                style={{ marginLeft: 4 }}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Lista de reportes diarios */}
      <View style={styles.listaContainer}>
        {reportes.map((reporte) => (
          <View key={reporte.id} style={styles.itemContainer}>
            <View style={styles.itemLeft}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#7C78FF"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.itemLabel}>{reporte.label}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.verBtn,
                reporte.locked && styles.verBtnBloqueado,
              ]}
              disabled={reporte.locked}
              onPress={() => {
                // Lógica para ver el reporte
              }}
            >
              {reporte.locked ? (
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color="#999"
                />
              ) : (
                <Text style={styles.verBtnText}>Ver</Text>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    margin: 12,
    // Sombra (opcional)
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  verTodosBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  verTodosText: {
    fontSize: 14,
    color: '#444',
  },
  btnBloqueado: {
    backgroundColor: '#f0f0f0',
  },
  listaContainer: {
    marginTop: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 14,
    color: '#333',
  },
  verBtn: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#e0e0fe',
  },
  verBtnBloqueado: {
    backgroundColor: '#f0f0f0',
  },
  verBtnText: {
    fontSize: 14,
    color: '#4B6FFF',
    fontWeight: 'bold',
  },
});
