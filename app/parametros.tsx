import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import CustomHeader from '@/components/navigation/CustomHeader';
import ParameterToggle from '@/components/parametro/Parametro';

export default function ParametrosScreen() {
  const [glucosaEnabled, setGlucosaEnabled] = useState(true);
  const [presionEnabled, setPresionEnabled] = useState(false);
  const [oxigenacionEnabled, setOxigenacionEnabled] = useState(false);
  const [ecgEnabled, setEcgEnabled] = useState(false);
  const [composicionEnabled, setComposicionEnabled] = useState(false);

  return (
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
      
      <ScrollView style={styles.container}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    padding: 20,
  },
}); 