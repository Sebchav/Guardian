// app/(tabs)/comunicacion.tsx
import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Animated,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useLayoutEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router'; // ✅ Usar router de expo-router
import FloatingActionButton from '@/components/navigation/FloatingActionButton';
import MenuSheet from '@/components/navigation/MenuSheet';
import MensajesRecientesCard from '@/components/communication/RecentMessages';
import LlamadasRapidasCard from '@/components/communication/QuickCall';

const { height } = Dimensions.get('window');

export default function ComunicacionScreen() {
  const insets = useSafeAreaInsets();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  useLayoutEffect(() => {
    // No se necesita navigation si usamos router.push
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
    setTimeout(() => router.push(path), 300); // ✅ Navegación correcta
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <MensajesRecientesCard />
        <LlamadasRapidasCard />
      </ScrollView>

      {isMenuOpen && <Pressable style={styles.backdrop} onPress={closeMenu} />}

      <MenuSheet slideAnim={slideAnim} onSelect={handleNavigate} />

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
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 40,
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
