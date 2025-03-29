import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileItemProps {
  name: string;
  imageSource: any;
  onPress?: () => void;
}

const ProfileItem = ({ name, imageSource, onPress }: ProfileItemProps) => {
  return (
    <TouchableOpacity style={styles.profileItem} onPress={onPress}>
      <View style={styles.profileImageContainer}>
        <Image 
          source={imageSource}
          style={styles.profileImage} 
        />
      </View>
      <Text style={styles.profileName}>{name}</Text>
      <Ionicons name="chevron-forward" size={20} color="#7C78FF" />
    </TouchableOpacity>
  );
};

interface AdditionalProfilesProps {
  onProfilePress?: (profileId: string) => void;
}

export default function AdditionalProfiles({ onProfilePress = () => {} }: AdditionalProfilesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Usar imágenes locales desde la carpeta de assets
  const profiles = [
    { 
      id: '1', 
      name: 'Juan García', 
      imageSource: require('@/assets/images/profile2.jpg')
    },
    { 
      id: '2', 
      name: 'Ana García', 
      imageSource: require('@/assets/images/profile3.jpg')
    }
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.headerContainer}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.headerTitleContainer}>
          <Ionicons name="people" size={24} color="#7C78FF" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Perfiles vinculados</Text>
        </View>
        <Ionicons 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={24} 
          color="#7C78FF" 
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.profilesContainer}>
          {profiles.map(profile => (
            <ProfileItem 
              key={profile.id}
              name={profile.name}
              imageSource={profile.imageSource}
              onPress={() => onProfilePress(profile.id)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profilesContainer: {
    marginTop: 16,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#7C78FF',
    marginRight: 12,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
});