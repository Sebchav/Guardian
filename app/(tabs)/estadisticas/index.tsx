import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  Alert,
  Animated,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, router } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import ReportesDiarios from '@/components/stats/Reportes';
import TendenciasProCard from '@/components/stats/Tendencias';
import FloatingActionButton from '@/components/navigation/FloatingActionButton';
import MenuSheet from '@/components/navigation/MenuSheet';
import CustomHeader from '@/components/navigation/CustomHeader';

interface SemanaResumen {
  semana: string;
  pasos: number;
  ritmoCardiacoPromedio: number;
  horasSueno: number;
  actividadFisica: string;
  alertas: number;
}

interface MesResumen {
  mes: string;
  pasos: number;
  ritmoCardiacoPromedio: number;
  horasSueno: number;
  actividadFisica: string;
  alertas: number;
}

const semanasMock: SemanaResumen[] = [
  { semana: 'Semana 10 (Mar 18 - Mar 24)', pasos: 30500, ritmoCardiacoPromedio: 72, horasSueno: 49, actividadFisica: 'Alta', alertas: 1 },
  { semana: 'Semana 9 (Mar 11 - Mar 17)', pasos: 25000, ritmoCardiacoPromedio: 70, horasSueno: 45, actividadFisica: 'Moderada', alertas: 0 },
  { semana: 'Semana 8 (Mar 4 - Mar 10)', pasos: 20000, ritmoCardiacoPromedio: 75, horasSueno: 40, actividadFisica: 'Baja', alertas: 2 },
  { semana: 'Semana 7 (Feb 26 - Mar 3)', pasos: 32000, ritmoCardiacoPromedio: 68, horasSueno: 50, actividadFisica: 'Alta', alertas: 0 },
  { semana: 'Semana 6 (Feb 19 - Feb 25)', pasos: 27000, ritmoCardiacoPromedio: 73, horasSueno: 46, actividadFisica: 'Moderada', alertas: 1 },
  { semana: 'Semana 5 (Feb 12 - Feb 18)', pasos: 18000, ritmoCardiacoPromedio: 78, horasSueno: 42, actividadFisica: 'Baja', alertas: 3 },
  { semana: 'Semana 4 (Feb 5 - Feb 11)', pasos: 31000, ritmoCardiacoPromedio: 70, horasSueno: 48, actividadFisica: 'Alta', alertas: 0 },
  { semana: 'Semana 3 (Ene 29 - Feb 4)', pasos: 23000, ritmoCardiacoPromedio: 74, horasSueno: 44, actividadFisica: 'Moderada', alertas: 1 },
  { semana: 'Semana 2 (Ene 22 - Ene 28)', pasos: 26000, ritmoCardiacoPromedio: 72, horasSueno: 47, actividadFisica: 'Moderada', alertas: 2 },
  { semana: 'Semana 1 (Ene 15 - Ene 21)', pasos: 19500, ritmoCardiacoPromedio: 76, horasSueno: 39, actividadFisica: 'Baja', alertas: 3 },
];

const mesesMock: MesResumen[] = [
  { mes: 'Marzo 2025', pasos: 122000, ritmoCardiacoPromedio: 72, horasSueno: 200, actividadFisica: 'Moderada', alertas: 3 },
  { mes: 'Febrero 2025', pasos: 105000, ritmoCardiacoPromedio: 73, horasSueno: 195, actividadFisica: 'Alta', alertas: 2 },
  { mes: 'Enero 2025', pasos: 98000, ritmoCardiacoPromedio: 74, horasSueno: 190, actividadFisica: 'Moderada', alertas: 4 },
  { mes: 'Diciembre 2024', pasos: 89000, ritmoCardiacoPromedio: 75, horasSueno: 185, actividadFisica: 'Baja', alertas: 5 },
];

const metrics = [
  { key: 'pasos', label: 'Pasos' },
  { key: 'ritmoCardiacoPromedio', label: 'Ritmo Cardíaco' },
  { key: 'horasSueno', label: 'Horas de Sueño' },
  { key: 'alertas', label: 'Alertas' },
];

// Resumen de salud para la grid (estático en este ejemplo)
const resumenSalud = {
  ritmoCardiaco: 80,
  pasos: 4123,
  sueno: 6.5,
  actividad: 73,
};

const { height } = Dimensions.get('window');

export default function ReportesResumenesCard() {
  const [tipo, setTipo] = useState<'semanal' | 'mensual'>('semanal');
  const [indice, setIndice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [graphModalVisible, setGraphModalVisible] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('pasos');
  const [selectedGraphMonths, setSelectedGraphMonths] = useState<number[]>(
    mesesMock.map((_, idx) => idx).slice(0, 4)
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Inicializar la animación con un valor negativo para que salga desde abajo
  const slideAnim = useRef(new Animated.Value(-height)).current;
  const navigation = useNavigation();

  // Datos y resumen actual en función del tipo seleccionado
  const datos = tipo === 'semanal' ? semanasMock : mesesMock;
  const resumenActual = datos[indice];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ocultar la barra de navegación predeterminada
    });
  }, []);

  const seleccionarItem = (i: number) => {
    setIndice(i);
    setModalVisible(false);
  };

  const chartLabels =
    tipo === 'semanal'
      ? semanasMock.map((item: SemanaResumen) => item.semana.split(' ')[1])
      : selectedGraphMonths.map((i: number) => mesesMock[i].mes);

  const chartDataset =
    tipo === 'semanal'
      ? semanasMock.map((item: SemanaResumen) => item[selectedMetric as keyof SemanaResumen] as number)
      : selectedGraphMonths.map((i: number) => mesesMock[i][selectedMetric as keyof MesResumen] as number);

  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(124, 120, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#7C78FF',
    },
  };

  const toggleGraphMonth = (i: number) => {
    setSelectedGraphMonths((prev) => {
      if (prev.includes(i)) {
        return prev.filter((index) => index !== i);
      } else {
        if (prev.length < 4) {
          return [...prev, i];
        } else {
          Alert.alert('Máximo alcanzado', 'Solo puedes seleccionar 4 meses.');
          return prev;
        }
      }
    });
  };

  // Funciones del menú deslizante (FloatingActionButton)
  const openMenu = () => {
    setIsMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0, // El menú se posiciona en la parte inferior (0)
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -height, // Se oculta completamente debajo de la pantalla
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsMenuOpen(false));
  };

  const handleNavigate = (path: string) => {
    closeMenu();
    setTimeout(() => router.push(path), 300);
  };

  // Mensaje predictivo simulado
  const predictionMessage =
    tipo === 'semanal'
      ? "Predicción: En pocas semanas podría experimentar una disminución en su resistencia, aumentando el riesgo de caídas. Se recomienda revisar su rutina de ejercicio."
      : "Predicción: En los próximos meses, ajustar su rutina de ejercicio y mejorar la calidad del sueño podría prevenir complicaciones cardiovasculares.";

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerBackground}>
          <CustomHeader title="Estadísticas" />
        </View>
        
        <View style={styles.container}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Tabs para seleccionar resumen */}
            <View style={styles.tabs}>
              <TouchableOpacity
                onPress={() => {
                  setTipo('semanal');
                  setIndice(0);
                }}
                style={[styles.tab, tipo === 'semanal' && styles.tabActivo]}
              >
                <Text style={tipo === 'semanal' ? styles.tabTextActivo : styles.tabText}>
                  Resumen semanal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTipo('mensual');
                  setIndice(0);
                }}
                style={[styles.tab, tipo === 'mensual' && styles.tabActivo]}
              >
                <Text style={tipo === 'mensual' ? styles.tabTextActivo : styles.tabText}>
                  Resumen mensual
                </Text>
              </TouchableOpacity>
            </View>

            {/* Tarjeta de información */}
            <View style={styles.card}>
              <View style={styles.topRow}>
                <TouchableOpacity onPress={() => setIndice((prev) => Math.min(prev + 1, datos.length - 1))}>
                  <Ionicons name="arrow-back-circle-outline" size={24} color="#888" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Ionicons name="filter-outline" size={24} color="#888" />
                </TouchableOpacity>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.title}>
                  {tipo === 'semanal'
                    ? (resumenActual as SemanaResumen).semana
                    : (resumenActual as MesResumen).mes}
                </Text>
                <View style={styles.statRow}>
                  <Ionicons name="walk-outline" size={20} color="#7C78FF" style={styles.statIcon} />
                  <Text style={styles.statLabel}>Pasos:</Text>
                  <Text style={styles.statValue}>{resumenActual.pasos}</Text>
                </View>
                <View style={styles.statRow}>
                  <Ionicons name="heart-outline" size={20} color="#7C78FF" style={styles.statIcon} />
                  <Text style={styles.statLabel}>Ritmo Cardíaco:</Text>
                  <Text style={styles.statValue}>{resumenActual.ritmoCardiacoPromedio} ppm</Text>
                </View>
                <View style={styles.statRow}>
                  <Ionicons name="moon-outline" size={20} color="#7C78FF" style={styles.statIcon} />
                  <Text style={styles.statLabel}>Sueño:</Text>
                  <Text style={styles.statValue}>{resumenActual.horasSueno} hrs</Text>
                </View>
                <View style={styles.statRow}>
                  <Ionicons name="flame-outline" size={20} color="#7C78FF" style={styles.statIcon} />
                  <Text style={styles.statLabel}>Actividad Física:</Text>
                  <Text style={styles.statValue}>{resumenActual.actividadFisica}</Text>
                </View>
                <View style={styles.statRow}>
                  <Ionicons name="alert-circle-outline" size={20} color="#7C78FF" style={styles.statIcon} />
                  <Text style={styles.statLabel}>Alertas:</Text>
                  <Text style={styles.statValue}>{resumenActual.alertas}</Text>
                </View>
              </View>
            </View>

            {/* Sección de gráficas */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
              <Text style={styles.sectionTitle}>Graficas</Text>
              {tipo === 'mensual' && (
                <TouchableOpacity style={styles.selectGraphButton} onPress={() => setGraphModalVisible(true)}>
                  <Ionicons name="filter" size={24} color="#fff" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.metricContainer}>
              {metrics.map((metric) => (
                <TouchableOpacity
                  key={metric.key}
                  style={[styles.metricButton, selectedMetric === metric.key && styles.metricButtonSelected]}
                  onPress={() => setSelectedMetric(metric.key)}
                >
                  <Text style={[styles.metricText, selectedMetric === metric.key && styles.metricTextSelected]}>
                    {metric.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.chartContainer}>
              <LineChart
                data={{
                  labels: chartLabels,
                  datasets: [{ data: chartDataset }],
                }}
                width={Dimensions.get('window').width - 32}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chartStyle}
              />
            </View>

            {/* Sección de mensaje predictivo */}
            <View style={styles.predictionContainer}>
              <Ionicons name="information-circle-outline" size={24} color="#7C78FF" style={styles.predictionIcon} />
              <Text style={styles.predictionText}>{predictionMessage}</Text>
            </View>

            {/* Reportes diarios y Tendencias bloqueadas (Pro) */}
            <ReportesDiarios />
            <TendenciasProCard />

            {/* Espacio adicional para el FAB */}
            <View style={styles.fabSpacing} />
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Modal para selección de semana/mes */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
            Selecciona una {tipo === 'semanal' ? 'semana' : 'mes'}
          </Text>
          {datos.map((item: SemanaResumen | MesResumen, i: number) => (
            <TouchableOpacity key={i} style={styles.selectorItem} onPress={() => seleccionarItem(i)}>
              <Text style={{ fontSize: 16 }}>
                {tipo === 'semanal'
                  ? (item as SemanaResumen).semana
                  : (item as MesResumen).mes}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20 }}>
            <Text style={{ color: '#4B6FFF', textAlign: 'center' }}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {/* Modal para selección de meses (gráfico mensual) */}
      <Modal visible={graphModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
                Selecciona hasta 4 meses para el gráfico
              </Text>
              {mesesMock.map((item, i: number) => (
                <TouchableOpacity key={i} style={styles.selectorItem} onPress={() => toggleGraphMonth(i)}>
                  <Text style={{ fontSize: 16 }}>
                    {item.mes} {selectedGraphMonths.includes(i) && '✓'}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => setGraphModalVisible(false)} style={{ marginTop: 20 }}>
                <Text style={{ color: '#4B6FFF', textAlign: 'center' }}>Confirmar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* El backdrop solo se muestra cuando el menú está abierto */}
      {isMenuOpen && <Pressable style={styles.backdrop} onPress={closeMenu} />}
      
      {/* Controlar la visibilidad del MenuSheet */}
      {(isMenuOpen || slideAnim._value > -height) && 
        <MenuSheet slideAnim={slideAnim} onSelect={handleNavigate} />
      }
      
      <FloatingActionButton
        isMenuOpen={isMenuOpen}
        onPress={isMenuOpen ? closeMenu : openMenu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    backgroundColor: '#7C78FF',
    paddingTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#e9ecf3',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  fabSpacing: {
    height: 90, // Altura suficiente para el FAB
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActivo: {
    borderBottomColor: '#7C78FF',
  },
  tabText: {
    color: '#333',
  },
  tabTextActivo: {
    color: '#000',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoContainer: {
    padding: 12,
    backgroundColor: '#fdfdfd',
    borderRadius: 10,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    marginVertical: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  statIcon: {
    marginRight: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#444',
    flex: 1,
  },
  statValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  selectorItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  metricButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  metricButtonSelected: {
    backgroundColor: '#7C78FF',
  },
  metricText: {
    fontSize: 14,
    color: '#333',
  },
  metricTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectGraphButton: {
    backgroundColor: '#7C78FF',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: -7,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chartStyle: {
    borderRadius: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '80%',
    maxHeight: '60%',
  },
  predictionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    padding: 15,
    backgroundColor: '#e6f0ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cce0ff',
    marginBottom: 20,
  },
  predictionIcon: {
    marginRight: 10,
  },
  predictionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000055',
    zIndex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    rowGap: 12,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    textAlign: 'center',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  unit: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
  },
  gridCard: {
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
  },
});