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

const { height } = Dimensions.get('window');

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
  return (
    <Animated.View style={[styles.sheet, { top: slideAnim }]}>
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height * 0.65,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 40,
    paddingTop: 20,
    elevation: 20,
    zIndex: 2,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 50,
    height: 6,
    borderRadius: 3,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
