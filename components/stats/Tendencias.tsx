import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Componente de tarjeta de “Tendencias” bloqueada.
 * Muestra 2 métricas con opacidad reducida y un candado al centro.
 */
export default function TendenciasProCard() {
  return (
    <View style={styles.cardContainer}>
      {/* Métricas con apariencia “deshabilitada” */}
      <View style={styles.metricsContainer}>
    
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, styles.disabledText]}>
            Actividad Física
          </Text>
          <Text style={[styles.metricValue, styles.disabledText]}>
            +12%
          </Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, styles.disabledText]}>
            Calidad de sueño
          </Text>
          <Text style={[styles.metricValue, styles.disabledText]}>
            +3%
          </Text>
        </View>
      </View>
    
    
      {/* Capa central con candado y botón de “Desbloquear” */}
      <View style={styles.lockOverlay}>
        <Text style={styles.title}>Tendencias</Text>

        <Ionicons
          name="lock-closed-outline"
          size={48}
          color="#7C78FF"
          style={{ marginBottom: 8 }}
        />
        <Text style={styles.proTitle}>Función pro</Text>
        <TouchableOpacity
          style={styles.unlockButton}
          onPress={() => {
            // Lógica para desbloquear o suscribirse
          }}
        >
          <Text style={styles.unlockButtonText}>Desbloquear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 60,
    marginHorizontal: 16,
    marginVertical: 12,
    // Sombra (opcional)
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricsContainer: {
    // Ocupamos el mismo espacio que el overlay,
    // pero el overlay se posiciona sobre esta capa
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
  },
  disabledText: {
    opacity: 0.3, // Para dar la apariencia de estar “deshabilitado”
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Fondo semitransparente, si deseas un efecto de oscurecimiento
    // backgroundColor: 'rgba(255,255,255,0.9)',
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  unlockButton: {
    backgroundColor: '#7C78FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  unlockButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: "flex-start",
    marginLeft:16
  },
});
