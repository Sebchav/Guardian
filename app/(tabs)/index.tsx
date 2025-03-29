import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import FloatingActionButton from '@/components/navigation/FloatingActionButton';
import MenuSheet from '@/components/navigation/MenuSheet';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import EstadoActualCard from '@/components/monitoring/ActualCard';
import ResumenSaludCard from '@/components/monitoring/HealthCard';
import DatosSaludCard from '@/components/monitoring/HealthDataCard';
import DispositivosConectadosCard from '@/components/monitoring/DevicesConnectedCard';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const navigation = useNavigation();

useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Monitorización', 
    });
  }, []);

  const openMenu = () => {
    setIsMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: height * 0.25,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsMenuOpen(false));
  };

  const handleNavigate = (path: string) => {
    closeMenu();
    setTimeout(() => router.push(path), 300);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 30 }} // 👈 espacio para no tapar contenido
      >
        <EstadoActualCard />
        <ResumenSaludCard />
        <DatosSaludCard />
        <DispositivosConectadosCard />
      </ScrollView>
  
      {/* Backdrop cuando se abre el menú */}
      {isMenuOpen && <Pressable style={styles.backdrop} onPress={closeMenu} />}
  
      <MenuSheet slideAnim={slideAnim} onSelect={handleNavigate} />
  
      {/* FAB siempre visible, fijo en pantalla */}
      <FloatingActionButton
        isMenuOpen={isMenuOpen}
        onPress={isMenuOpen ? closeMenu : openMenu}
      />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecf3',
    paddingHorizontal: 20, // ✅ Agregado para que los componentes internos tengan espacio
    paddingTop: 20, // opcion
    marginBottom: 40, // opcion
  },
  title: {
    fontSize: 24,
    marginBottom: 200,
    fontWeight: 'bold',
    color: '#333',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000055',
    zIndex: 1,
  },
  
});
