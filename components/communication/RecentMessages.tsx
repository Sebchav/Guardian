import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Mensaje {
  id: string;
  nombre: string;
  texto: string;
}

export default function MensajesRecientesCard() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: '1',
      nombre: 'Ana',
      texto: '¿Cómo te sientes hoy? Recuerda tomar tu medicamen...',
    },
    {
      id: '2',
      nombre: 'Pablo',
      texto: 'Hola madre, ¿Necesitas algo más para hacer las comp...',
    },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState('');
  const [texto, setTexto] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const agregarMensaje = () => {
    if (nombre.trim() && texto.trim()) {
      const nuevo: Mensaje = {
        id: Date.now().toString(),
        nombre,
        texto: texto.length > 50 ? texto.slice(0, 50) + '...' : texto,
      };
      setMensajes((prev) => [...prev, nuevo]);
      setNombre('');
      setTexto('');
      setMostrarFormulario(false);
    }
  };

  // Scroll al final automáticamente cuando se agregue un mensaje
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [mensajes]);

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Mensajes Recientes</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setMostrarFormulario(!mostrarFormulario)}
        >
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.buttonText}>Nuevo Mensaje</Text>
        </TouchableOpacity>
      </View>

      {mostrarFormulario && (
        <View style={styles.form}>
          <TextInput
            placeholder="Nombre"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            placeholder="Mensaje"
            style={[styles.input, { height: 60 }]}
            value={texto}
            onChangeText={setTexto}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={agregarMensaje}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.card}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: 10 }}
          ref={scrollRef}
        >
          {mensajes.map((mensaje) => (
            <View key={mensaje.id} style={styles.messageRow}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={20} color="#888" />
              </View>
              <View style={styles.messageContent}>
                <Text style={styles.name}>{mensaje.nombre}</Text>
                <Text style={styles.text}>{mensaje.texto}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#7C78FF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    gap: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  form: {
    marginTop: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    gap: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  sendButton: {
    backgroundColor: '#4B6FFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    height: 200, // 👈 Altura fija
    overflow: 'hidden',
  },
  scroll: {
    padding: 12,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 2,
  },
  text: {
    color: '#555',
    fontSize: 13,
  },
});
