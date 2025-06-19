import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, FlatList, Dimensions, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { AuthContext } from './AuthContext';
import { useIsFocused } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MainScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchAnimals();
    }
  }, [isFocused]);

  useEffect(() => {
    const backAction = () => {
      if (isAuthenticated) {
        Alert.alert("¡Espera!", "¿Estás seguro de que quieres cerrar la sesión?", [
          {
            text: "Cancelar",
            onPress: () => null,
            style: "cancel"
          },
          { text: "SÍ", onPress: () => logout() }
        ]);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isAuthenticated]);

  const fetchAnimals = async () => {
    try {
      const response = await fetch('https://paws-up.onrender.com/animals');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const renderItem = ({ item }) => {
    /*if (!item.image_data || item.image_data.length === 0) {
      return (
        <Text style={styles.descriptionText}>No se pudo renderizar el animal con id {item.id} porque no tiene imágenes.</Text>
      );
    }*/
   let images = [];

try {
  // Si image_data ya es array, úsalo directamente. Si es string, parsea.
  images = typeof item.image_data === 'string' ? JSON.parse(item.image_data) : item.image_data;
} catch (e) {
  console.warn('No se pudo parsear image_data:', item.image_data);
  images = [];
}

if (!images || images.length === 0) {
  return (
    <Text style={styles.descriptionText}>No se pudo renderizar el animal con id {item.id} porque no tiene imágenes.</Text>
  );
}

const firstImage = images[0];

    return (
      <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { itemId: item.id })}>
        <View style={styles.card}>
          <Image 
            source={{ uri: firstImage }} 
            style={styles.image} 
            resizeMode="cover" 
          />
          <View style={styles.infoContainer}>
            <Text style={styles.titleText}>{item.animal_type} - {item.breed}</Text>

            <Text style={styles.subtitleText}>
            
            <Text style={styles.boldText}>Ubicación:</Text> {item.exact_location}
            </Text>
            <Text style={styles.subtitleText}>
            <Text style={styles.boldText}>Sexo:</Text> {item.sexing}
            </Text>

            <Text style={styles.descriptionText}>
            <Text style={styles.boldText}>Descripción:</Text> {item.state_description}
            </Text>
          
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={require('./assets/fondo_home.jpg')} style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
       {isAuthenticated ? (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Post_animal')}>
          <Text style={styles.buttonText}>Publicar un animal</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Debes iniciar sesión para usar esta funcionalidad')}>
          <Text style={styles.buttonText}>Publicar un animal</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};

const DrawerContent = (props) => {
  const { isAuthenticated, username, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const handleLogout = () => {
    logout();
    navigation.navigate('Home');
  };
  return (
    <DrawerContentScrollView {...props}>
      {isAuthenticated ? (
        <View style={styles.userContainer}>
          <View style={styles.userInfo}>
            <Image source={require('./assets/user_icon.png')} style={styles.userIcon} />
            <Text style={styles.username}>{username}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.navigate('Registro')}>
            <Text style={styles.loginButtonText}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      )}
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Drawer.Navigator initialRouteName="Menú" drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Menú" component={MainScreen} />
    </Drawer.Navigator>
  );
};

export default App;
