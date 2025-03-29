// components/ConfigToggleOption.tsx
import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { ReactNode } from 'react';

// Definición de la interfaz para las props
interface ConfigToggleOptionProps {
  iconComponent: ReactNode;
  iconBgColor: string;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

// Componente para las opciones de configuración con toggle
function ConfigToggleOption({ 
  iconComponent, 
  iconBgColor, 
  label, 
  value, 
  onValueChange 
}: ConfigToggleOptionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          {iconComponent}
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D1D1D6', true: '#D1D1D6' }}
        thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
        ios_backgroundColor="#D1D1D6"
        style={styles.switch}
      />
    </View>
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
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
});

export default ConfigToggleOption;