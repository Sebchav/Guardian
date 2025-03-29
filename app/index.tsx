import { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function Index() {

  useEffect(() => {
    const checkSession = async () => {
      const token = await AsyncStorage.getItem('token'); // O puede ser isLoggedIn, userId, etc.
      if (token) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    };
    checkSession();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4B6FFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
