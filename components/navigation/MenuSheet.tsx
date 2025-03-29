// components/MenuSheet.tsx
import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import MenuOptionGridItem from './MenuOptionGridItem';

const { height, width } = Dimensions.get('window');

interface Props {
  slideAnim: Animated.Value;
  onSelect: (path: string) => void;
}

const menuItems = [
  { title: 'Monitorización', icon: 'monitorizacion', path: '/' },
  { title: 'Comunicación', icon: 'comunicacion', path: '/comunicacion' },
  { title: 'Solicitudes', icon: 'solicitudes', path: '/solicitudes' },
  { title: 'Recordatorios', icon: 'recordatorios', path: '/recordatorios' },
  { title: 'Estadísticas', icon: 'estadisticas', path: '/estadisticas' },
  { title: 'Configuración', icon: 'configuracion', path: '/configuracion' },
];

export default function MenuSheet({ slideAnim, onSelect }: Props) {
  // Calculamos la opacidad basada en la posición de la animación
  const opacity = slideAnim.interpolate({
    inputRange: [height * 0.25, height],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View 
      style={[
        styles.sheet, 
        { 
          bottom: slideAnim,
          opacity 
        }
      ]}
    >
      <View style={styles.sheetHandle} />
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <MenuOptionGridItem
            key={index}
            title={item.title}
            icon={item.icon}
            onPress={() => onSelect(item.path)}
          />
        ))}
      </View>
      {/* Espacio adicional para el FAB */}
      <View style={styles.fabSpace} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 40,
    paddingTop: 20,
    elevation: 5,
    zIndex: 2,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 50,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fabSpace: {
    height: 100, // Espacio para el FAB
    width: '100%',
  }
});