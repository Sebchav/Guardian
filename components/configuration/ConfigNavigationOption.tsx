// components/configuration/ConfigNavigationOption.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ReactNode } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface ConfigNavigationOptionProps {
    iconComponent: ReactNode;
    iconBgColor: string;
    label: string;
    onPress?: () => void; // Añadir el signo de interrogación para hacerlo opcional
  }

// Componente para las opciones de configuración con navegación
function ConfigNavigationOption({ 
  iconComponent, 
  iconBgColor, 
  label, 
  onPress 
}: ConfigNavigationOptionProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftContent}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          {iconComponent}
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.goText}>Ir</Text>
        <Ionicons name="chevron-forward" size={18} color="#999" style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  goText: {
    fontSize: 16,
    color: '#999',
    marginRight: 4,
  },
  arrowIcon: {
    marginTop: 1, // Pequeño ajuste para alinear verticalmente
  }
});

export default ConfigNavigationOption;