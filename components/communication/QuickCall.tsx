import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Contacto {
  id: string;
  nombre: string;
  telefono: string;
  icon: string;
}

export default function LlamadasRapidasCard() {
  const [contactos, setContactos] = useState<Contacto[]>([
    { id: '1', nombre: 'Ana', telefono: '5512345678', icon: 'call-outline' },
    { id: '2', nombre: 'Pablo', telefono: '5523456789', icon: 'call-outline' },
    { id: '3', nombre: 'Emergencia', telefono: '911', icon: 'alert-circle-outline' },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const agregarContacto = () => {
    if (!nombre.trim() || !telefono.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    if (!/^\d{10}$/.test(telefono)) {
      Alert.alert('Número inválido', 'El número debe tener 10 dígitos numéricos.');
      return;
    }

    const nuevo: Contacto = {
      id: Date.now().toString(),
      nombre,
      telefono,
      icon: 'call-outline',
    };

    setContactos([...contactos, nuevo]);
    setNombre('');
    setTelefono('');
    setMostrarFormulario(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Llamadas rápidas</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setMostrarFormulario(!mostrarFormulario)}
        >
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.buttonText}>Nuevo Contacto</Text>
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
            placeholder="Teléfono (10 dígitos)"
            style={styles.input}
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="number-pad"
            maxLength={10}
          />
          <TouchableOpacity style={styles.sendButton} onPress={agregarContacto}>
            <Text style={styles.sendButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.card}>
        <View style={styles.grid}>
          {contactos.map((contacto) => (
            <TouchableOpacity key={contacto.id} style={styles.contactItem}>
              <Ionicons
                name={contacto.icon}
                size={24}
                color={contacto.nombre === 'Emergencia' ? '#007bff' : '#4B6FFF'}
              />
              <Text style={styles.contactText}>{contacto.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    padding: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 6,
  },
  contactItem: {
    width: '23%',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  contactText: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
  },
});
