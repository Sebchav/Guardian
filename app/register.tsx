import React, { useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { Video } from 'expo-av';

export default function RegisterScreen() {

    const navigation = useNavigation();
    
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);

  return (
    <View style={styles.container}>
        <Video
            source={require('@/assets/videos/Login.mp4')} // o el path correcto
            rate={1.0}
            volume={1.0}
            isMuted
            resizeMode='cover'
            shouldPlay
            isLooping
            style={StyleSheet.absoluteFillObject}
            />
    
        <View style={styles.overlay} />
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput placeholder="Nombre completo" style={styles.input} />
      <TextInput placeholder="Correo" style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry />
      <TextInput placeholder="Confirmar contraseña" style={styles.input} secureTextEntry />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: "white" },
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
