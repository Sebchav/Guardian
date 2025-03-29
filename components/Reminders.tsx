import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Recordatorio {
  id: string;
  titulo: string;
  horario: string;
  frecuencia: string;
}

export default function RecordatoriosCard() {
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([
    {
      id: '1',
      titulo: 'Medicamento: Presión arterial',
      horario: 'Todos los días, 14:00',
      frecuencia: 'diario',
    },
    {
      id: '2',
      titulo: 'Cita médica: Dr. Carrasco',
      horario: 'Una vez, 10:30',
      frecuencia: 'una vez',
    },
    {
      id: '3',
      titulo: 'Ejercicio Diario',
      horario: 'Todos los días, 9:00',
      frecuencia: 'diario',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [titulo, setTitulo] = useState('');
  const [frecuencia, setFrecuencia] = useState<'diario' | 'una vez'>('diario');
  const [hora, setHora] = useState(new Date());
  const [mostrarHoraPicker, setMostrarHoraPicker] = useState(false);

  const guardarRecordatorio = () => {
    if (!titulo.trim()) return;

    const horaFormateada = hora.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const horario = frecuencia === 'diario'
      ? `Todos los días, ${horaFormateada}`
      : `Una vez, ${horaFormateada}`;

    if (editandoId) {
      setRecordatorios((prev) =>
        prev.map((r) =>
          r.id === editandoId ? { ...r, titulo, horario, frecuencia } : r
        )
      );
    } else {
      const nuevo: Recordatorio = {
        id: Date.now().toString(),
        titulo,
        horario,
        frecuencia,
      };
      setRecordatorios([...recordatorios, nuevo]);
    }

    setTitulo('');
    setFrecuencia('diario');
    setEditandoId(null);
    setModalVisible(false);
  };

  const editarRecordatorio = (recordatorio: Recordatorio) => {
    setTitulo(recordatorio.titulo);
    setFrecuencia(recordatorio.frecuencia as 'diario' | 'una vez');
    const partes = recordatorio.horario.split(', ');
    const horaParte = partes[1];
    const [h, m] = horaParte.split(':');
    const fecha = new Date();
    fecha.setHours(Number(h));
    fecha.setMinutes(Number(m));
    setHora(fecha);
    setEditandoId(recordatorio.id);
    setModalVisible(true);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Mis recordatorios</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setTitulo('');
            setFrecuencia('diario');
            setHora(new Date());
            setEditandoId(null);
            setModalVisible(true);
          }}
        >
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.buttonText}>Nuevo Recordatorio</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {recordatorios.map((item) => (
          <View key={item.id} style={styles.recordatorioItem}>
            <View style={styles.iconCircle}>
              <Ionicons name="notifications-outline" size={24} color="#4caf50" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.subtitulo}>{item.horario}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => editarRecordatorio(item)}
            >
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Nuevo Recordatorio</Text>
          <TextInput
            placeholder="Título del recordatorio"
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
          />

          <Text style={styles.label}>Frecuencia:</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.freqOption, frecuencia === 'diario' && styles.freqSelected]}
              onPress={() => setFrecuencia('diario')}
            >
              <Text>Todos los días</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.freqOption, frecuencia === 'una vez' && styles.freqSelected]}
              onPress={() => setFrecuencia('una vez')}
            >
              <Text>Una vez</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.timePickerButton}
            onPress={() => setMostrarHoraPicker(true)}
          >
            <Text>Seleccionar Hora</Text>
          </TouchableOpacity>

          {mostrarHoraPicker && (
            <DateTimePicker
              value={hora}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setMostrarHoraPicker(false);
                if (selectedDate) setHora(selectedDate);
              }}
            />
          )}

          <TouchableOpacity style={styles.saveButton} onPress={guardarRecordatorio}>
            <Text style={styles.saveText}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: 24 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  button: {
    flexDirection: 'row',
    backgroundColor: '#7C78FF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    gap: 6,
  },
  buttonText: { color: '#fff', fontWeight: '500' },
  card: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  recordatorioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#d0f0d0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titulo: { fontWeight: 'bold', fontSize: 15 },
  subtitulo: { fontSize: 13, color: '#555' },
  editButton: {
    backgroundColor: '#7C78FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editText: { color: '#fff', fontWeight: '600' },
  modalContent: { padding: 20, paddingTop: 40, gap: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  label: { fontWeight: '500' },
  row: { flexDirection: 'row', gap: 12 },
  freqOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  freqSelected: {
    borderColor: '#4B6FFF',
    backgroundColor: '#E0E7FF',
  },
  timePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4B6FFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontWeight: 'bold' },
  cancelText: { color: '#4B6FFF', textAlign: 'center', marginTop: 12 },
});