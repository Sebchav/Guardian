import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

interface CustomHeaderProps {
  title: string;
  profileImageUrl?: string;
  showBackButton?: boolean;
}

export default function CustomHeader({ 
  title, 
  profileImageUrl = '', 
  showBackButton = false 
}: CustomHeaderProps) {
  const handleProfilePress = () => {
    router.push('/profile' as any);
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
        <Image 
          source={
            profileImageUrl 
              ? { uri: profileImageUrl } 
              : require('@/assets/images/profile.jpg')
          } 
          style={styles.profileImage} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }
});