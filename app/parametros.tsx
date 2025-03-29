import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import CustomHeader from '@/components/navigation/CustomHeader';
import ParameterToggle from '@/components/parametro/Parametro';
import FloatingActionButton from '@/components/navigation/FloatingActionButton';
import MenuSheet from '@/components/navigation/MenuSheet';

const { height } = Dimensions.get('window');

export default function ParametrosScreen() {
  const [glucosaEnabled, setGlucosaEnabled] = useState(true);
  const [presionEnabled, setPresionEnabled] = useState(false);
  const [oxigenacionEnabled, setOxigenacionEnabled] = useState(false);
  const [ecgEnabled, setEcgEnabled] = useState(false);
  const [composicionEnabled, setComposicionEnabled] = useState(false);
  
  // Estados para el menú flotante
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Inicializar la animación con un valor que asegure que el menú esté completamente fuera de la pantalla
  const slideAnim = useRef(new Animated.Value(-height)).current;

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
        <Stack.Screen 
          options={{
            headerShown: false,
          }}
        />
        <View style={styles.headerBackground}>
          <CustomHeader 
            title="Parámetros" 
            showBackButton={true}
            profileImageUrl=""
          />
        </View>
        
        <View style={styles.container}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <ParameterToggle
              icon={<Ionicons name="water" size={24} color="#4CAF50" />}
              title="Glucosa"
              isEnabled={glucosaEnabled}
              onToggle={setGlucosaEnabled}
              showInputField={glucosaEnabled}
              inputPlaceholder="Nivel de glucosa en sangre:"
            />

            <ParameterToggle
              icon={<Ionicons name="heart" size={24} color="#F44336" />}
              title="Presión Arterial"
              isEnabled={presionEnabled}
              onToggle={setPresionEnabled}
            />

            <ParameterToggle
              icon={<Ionicons name="pulse" size={24} color="#2196F3" />}
              title="Oxigenación"
              isEnabled={oxigenacionEnabled}
              onToggle={setOxigenacionEnabled}
            />

            <ParameterToggle
              icon={<Ionicons name="fitness" size={24} color="#9C27B0" />}
              title="Electrocardiograma"
              isEnabled={ecgEnabled}
              onToggle={setEcgEnabled}
            />

            <ParameterToggle
              icon={<Ionicons name="body" size={24} color="#FF9800" />}
              title="Composición Corporal"
              isEnabled={composicionEnabled}
              onToggle={setComposicionEnabled}
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
  fabSpacing: {
    height: 90, // Altura suficiente para el FAB
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