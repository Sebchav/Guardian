import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  isMenuOpen: boolean;
  onPress: () => void;
}

export default function FloatingActionButton({ isMenuOpen, onPress }: Props) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.fab} onPress={onPress}>
        <Ionicons
          name={isMenuOpen ? 'chevron-down-outline' : 'chevron-up-outline'}
          size={32}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center', // ✅ Flex centering
    justifyContent: 'center',
    zIndex: 10,
  },
  fab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#7C78FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
