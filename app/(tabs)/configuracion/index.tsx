import React, {useState, useRef, useLayoutEffect} from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  SafeAreaView,
  Animated,
  Dimensions,
  Pressable,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '@/components/navigation/CustomHeader';
import DispositivosConectadosCard from '@/components/monitoring/DevicesConnectedCard';
import ConfigToggleOption from '@/components/configuration/ConfigToggleOption';
import ConfigNavigationOption from '@/components/configuration/ConfigNavigationOption';
import FloatingActionButton from '@/components/navigation/FloatingActionButton';
import MenuSheet from '@/components/navigation/MenuSheet';
import UserProfileCard from '@/components/profile/UserProfileCard';

const { height } = Dimensions.get('window');

export default function ConfiguracionScreen() {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [highContrastEnabled, setHighContrastEnabled] = useState(false);
  const [largeTextEnabled, setLargeTextEnabled] = useState(false);
  const [showProfiles, setShowProfiles] = useState(false); // Estado para ver/ocultar perfiles
  
  // Estados para el menú flotante
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Inicializar la animación con un valor que asegure que el menú esté completamente fuera de la pantalla
  const slideAnim = useRef(new Animated.Value(-height)).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Ocultar la barra de navegación predeterminada
    });
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/login');
  };

  const confirmLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí, salir', onPress: handleLogout },
      ]
    );
  };

  // Funciones para el menú flotante
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

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerBackground}>
          <CustomHeader title="Configuración" />
        </View>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <UserProfileCard 
              name="María Garcia"
              email="mariagar32@gmail.com"
              onEditPress={() => console.log('Editar perfil presionado')}
            />

            {/* Botón para ver/ocultar otros perfiles */}
            <TouchableOpacity 
              style={styles.profilesButton} 
              onPress={() => setShowProfiles(!showProfiles)}
            >
              <Text style={styles.profilesButtonText}>
                {showProfiles ? 'Ocultar perfiles' : 'Ver perfiles'}
              </Text>
            </TouchableOpacity>

            {showProfiles && (
              <View style={styles.profilesContainer}>
                <View style={styles.profileItem}>
                  <Image 
                    source={require('@/assets/images/profile2.jpg')} 
                    style={styles.profileImage} 
                  />
                  <Text style={styles.profileName}>Juan Pérez</Text>
                </View>
                <View style={styles.profileItem}>
                  <Image 
                    source={require('@/assets/images/profile3.jpg')} 
                    style={styles.profileImage} 
                  />
                  <Text style={styles.profileName}>Pedro López</Text>
                </View>
              </View>
            )}

            <DispositivosConectadosCard />
            
            <Text style={styles.sectionTitle}>Preferencias</Text>
            
            <ConfigToggleOption 
              iconComponent={<Ionicons name="notifications" size={24} color="white" />}
              iconBgColor="#4A86FF"
              label="Notificaciones"
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
            
            <ConfigToggleOption 
              iconComponent={<Ionicons name="color-palette" size={24} color="white" />}
              iconBgColor="#6FCF97"
              label="Modo de alto contraste"
              value={highContrastEnabled}
              onValueChange={setHighContrastEnabled}
            />
            
            <ConfigToggleOption 
              iconComponent={<Text style={{fontSize: 28, color: 'white', fontWeight: 'bold'}}>T</Text>}
              iconBgColor="#8A7CFE"
              label="Texto grande"
              value={largeTextEnabled}
              onValueChange={setLargeTextEnabled}
            />
            
            <Text style={styles.sectionTitle}>Seguridad</Text>
            
            <ConfigNavigationOption 
              iconComponent={<Ionicons name="lock-closed" size={24} color="white" />}
              iconBgColor="#E74C3C"
              label="Cambiar contraseña"
            />
            
            <ConfigNavigationOption 
              iconComponent={<Ionicons name="help-circle" size={24} color="white" />}
              iconBgColor="#4CAF50"
              label="Ayuda y soporte"
            />
            
            <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
              <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>

            {/* Añadir espacio adicional al final para evitar que el FAB cubra contenido */}
            <View style={styles.fabSpacing} />
          </ScrollView>
        </View>
      </SafeAreaView>

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
    backgroundColor: '#7C78FF', // El mismo color que el FAB para consistencia
    paddingTop: 40, // Espacio adicional para el statusbar
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e9ecf3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#D9534F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profilesButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#7C78FF',
    borderRadius: 10,
    alignItems: 'center',
  },
  profilesButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profilesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  profileItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  profileName: {
    fontSize: 12,
    color: '#333',
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
  // Espacio adicional al final del ScrollView para evitar que el FAB tape contenido
  fabSpacing: {
    height: 90,
  },
});
