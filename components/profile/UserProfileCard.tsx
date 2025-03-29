import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UserProfileCardProps {
  name: string;
  email: string;
  imageUrl?: string;
  onEditPress?: () => void;
}

export default function UserProfileCard({ 
  name, 
  email, 
  imageUrl, 
  onEditPress = () => {} 
}: UserProfileCardProps) {
  // Determinar la fuente de la imagen basada en si hay una URL o no
  const imageSource = imageUrl 
    ? { uri: imageUrl } // Si hay URL, usarla como uri
    : require('@/assets/images/profile.jpg'); // Si no, usar la imagen local

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={imageSource}
            style={styles.profileImage} 
          />
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.emailText}>{email}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
        <Text style={styles.editText}>Editar Perfil</Text>
        <Ionicons name="pencil-outline" size={20} color="#7C78FF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#7C78FF',
    backgroundColor: '#e9ecf3',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    marginLeft: 20,
    flex: 1,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  editText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 8,
  },
});