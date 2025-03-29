import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alerta from '@/components/Alert';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Video } from 'expo-av';

// Usuarios simulados
const mockUsers = [
  { email: 'juan@example.com', password: '123456' },
  { email: 'maria@example.com', password: 'password' },
  { email: 'admin@example.com', password: 'admin' },
];

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const navigation = useNavigation();

    useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
    }, []);

  const validarEmail = (correo: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  const handleLogin = async () => {
    if (!email || !password) {
      setAlerta({ message: 'Todos los campos son obligatorios.', type: 'error' });
      return;
    }

    if (!validarEmail(email)) {
      setAlerta({ message: 'El correo no es válido.', type: 'error' });
      return;
    }

    const user = mockUsers.find(
      (u) => u.email === email.trim() && u.password === password.trim()
    );

    if (!user) {
      const userExists = mockUsers.find((u) => u.email === email.trim());
      if (userExists) {
        setAlerta({ message: 'La contraseña es incorrecta.', type: 'error' });
      } else {
        setAlerta({ message: 'El usuario no existe.', type: 'error' });
      }
      return;
    }

    await AsyncStorage.setItem('token', 'mock-token');
    setAlerta({ message: 'Usuario autenticado correctamente.', type: 'success' });

    setTimeout(() => {
      router.replace('/(tabs)');
    }, 3000);
  };

  return (
    <View style={styles.container}>
        <Video
        source={require('@/assets/videos/Registro.mp4')} // o el path correcto
        rate={1.0}
        volume={1.0}
        isMuted
        resizeMode='cover'
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFillObject}
        />

    <View style={styles.overlay} />

      <Text style={styles.title}>Iniciar sesión</Text>
      {alerta && (
        <Alerta
          message={alerta.message}
          type={alerta.type}
          onClose={() => setAlerta(null)}
        />
      )}
      <TextInput
        placeholder="Correo"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: "white" },
  input: { backgroundColor: '#f1f1f1', padding: 15, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#4B6FFF', padding: 15, borderRadius: 8, marginTop: 10 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  link: { textAlign: 'center', marginTop: 20, color: 'white' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', // Opacidad encima del video
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  
});
