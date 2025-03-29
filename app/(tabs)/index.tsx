// app/index.tsx (o monitorización.tsx)
import React, { useRef, useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  Pressable,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FloatingActionButton from '@/components/navigation/FloatingActionButton';
import MenuSheet from '@/components/navigation/MenuSheet';
import CustomHeader from '@/components/navigation/CustomHeader';
import EstadoActualCard from '@/components/monitoring/ActualCard';
import ResumenSaludCard from '@/components/monitoring/HealthCard';
import DatosSaludCard from '@/components/monitoring/HealthDataCard';
import ConfigNavigationOption from '@/components/configuration/ConfigNavigationOption';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Inicializar la animación con un valor negativo para que salga desde abajo
  const slideAnim = useRef(new Animated.Value(-height)).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ocultar la barra de navegación predeterminada
    });
  }, []);

  const openMenu = () => {
    setIsMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0, // El menú se posiciona en la parte inferior (0)
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -height, // Se oculta completamente debajo de la pantalla
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsMenuOpen(false));
  };

  const handleNavigate = (path: string) => {
    closeMenu();
    setTimeout(() => router.push(path), 300);
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header personalizado con título y foto de perfil */}
        <View style={styles.headerBackground}>
          <CustomHeader title="Monitorización" />
        </View>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <EstadoActualCard />
            <ResumenSaludCard />
            <DatosSaludCard />

            <Text style={styles.sectionTitle}>Configuración avanzada</Text>
                
            <ConfigNavigationOption 
              iconComponent={<Ionicons name="heart-half" size={24} color="white" />}
              iconBgColor="#FFD700"
              label="Parámetros"
            />
            
            {/* Espacio adicional para el FAB */}
            <View style={styles.fabSpacing} />
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* El backdrop solo se muestra cuando el menú está abierto */}
      {isMenuOpen && <Pressable style={styles.backdrop} onPress={closeMenu} />}
      
      {/* Controlar la visibilidad del MenuSheet */}
      {(isMenuOpen || slideAnim._value > -height) && 
        <MenuSheet slideAnim={slideAnim} onSelect={handleNavigate} />
      }
      
      <FloatingActionButton
        isMenuOpen={isMenuOpen}
        onPress={isMenuOpen ? closeMenu : openMenu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    backgroundColor: '#7C78FF',
    paddingTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#e9ecf3',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  fabSpacing: {
    height: 90,
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