import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface NeedOptionProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

const NeedOption = ({ icon, title, onPress }: NeedOptionProps) => (
  <TouchableOpacity style={styles.needOption} onPress={onPress}>
    <View style={styles.iconContainer}>
      {icon}
    </View>
    <Text style={styles.needTitle}>{title}</Text>
  </TouchableOpacity>
);

export default function FrequentNeedsCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Necesidades Frecuentes</Text>
      <View style={styles.optionsGrid}>
        <NeedOption
          icon={<Ionicons name="medical" size={24} color="#7C78FF" />}
          title="Compra de medicamentos"
          onPress={() => router.push('/nueva-solicitud' as any)}
        />
        <NeedOption
          icon={<Ionicons name="nutrition" size={24} color="#FFD700" />}
          title="Compra de alimentos"
          onPress={() => router.push('/nueva-solicitud' as any)}
        />
        <NeedOption
          icon={<Ionicons name="medical-outline" size={24} color="#4CAF50" />}
          title="Visita al médico"
          onPress={() => router.push('/nueva-solicitud' as any)}
        />
        <NeedOption
          icon={<Ionicons name="home" size={24} color="#7C78FF" />}
          title="Ayuda en casa"
          onPress={() => router.push('/nueva-solicitud' as any)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  needOption: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  needTitle: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    marginTop: 4,
  },
}); 