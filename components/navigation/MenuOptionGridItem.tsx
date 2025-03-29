// components/MenuOptionGridItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title: string;
  icon: any;
  onPress: () => void;
}

const iconMap: Record<string, any> = {
    monitorizacion: require('@/assets/images/monitorizacion.png'),
    comunicacion: require('@/assets/images/comunicacion.png'),
    solicitudes: require('@/assets/images/solicitudes.png'),
    recordatorios: require('@/assets/images/recordatorios.png'),
    estadisticas: require('@/assets/images/estadisticas.png'),
    configuracion: require('@/assets/images/configuracion.png'),
  };
  
export default function MenuOptionGridItem({ title, icon, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={onPress}>
      <View style={styles.icon}>
      <Image
        source={iconMap[icon]}
        style={{ width: 90, height: 90 }}
        resizeMode="contain"
        />

      </View>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    width: '47%',
    backgroundColor: 'transparent',
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#82808C',
    textAlign: 'center',
  },
});
