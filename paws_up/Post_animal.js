import React, { useState ,useContext} from 'react';
import { Button, Image, View, Platform, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity, Dimensions, ImageBackground, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import styles from './styles';
import { AuthContext } from './AuthContext';

export default function PostAnimal({ navigation }) {
  const [images, setImages] = useState([]);
  const { userId } = useContext(AuthContext);
  const [animalData, setAnimalData] = useState({
    animal_type: '',
    breed: '',
    sexing: '',
    state_description: '',
    exact_location: ''
  });
  const [scale, setScale] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [breedsOptions, setBreedsOptions] = useState([]);

  const dogBreeds = [
    'Labrador Retriever', 'Golden Retriever', 'Pastor Alemán', 'Bulldog Francés', 'Bulldog Inglés',
    'Poodle', 'Chihuahua', 'Rottweiler', 'Beagle', 'Husky Siberiano', 'Pug', 'Dálmata', 'Shih Tzu',
    'Cocker Spaniel', 'Bóxer', 'Doberman', 'Border Collie', 'Desconocida'
  ];

  const catBreeds = [
    'Mestizo', 'Persa', 'Siamés', 'Angora', 'Maine Coon', 'Bengala', 'Esfinge', 'Azul Ruso',
    'Ragdoll', 'British Shorthair', 'Abisinio', 'Scottish Fold', 'Oriental', 'Desconocida'
  ];

  const onZoomEvent = React.useRef((event) => {
    setScale(event.nativeEvent.scale);
  });

  const onZoomStateChange = React.useRef((event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setScale(1);
    }
  });

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Lo siento, necesitamos permisos de cámara para hacer esto funcionar!');
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImages([...images, ...result.assets.map(asset => asset.uri)]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Lo siento, necesitamos permisos de cámara para hacer esto funcionar!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImages([...images, ...result.assets.map(asset => asset.uri)]);
    }
  };

  const submitData = async () => {
    let formData = new FormData();

    images.forEach((image, index) => {
      let uriParts = image.split('.');
      let fileType = uriParts[uriParts.length - 1];

      formData.append('image', {
        uri: image,
        name: `photo${index}.${fileType}`,
        type: `image/${fileType}`,
      });
    });

    for (let key in animalData) {
      formData.append(key, animalData[key]);
    }
    formData.append('user_id', userId);

    try {
      const response = await axios.post('https://paws-up.onrender.com/postAnimal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      Alert.alert('Publicado correctamente', 'Tu publicación ha sido creada exitosamente.', [
        {text: 'OK', onPress: () => navigation.navigate('MainScreen', { newPost: true })}
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const getAddressSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]); 
      return;
    }

    try {
      const mapboxAccessToken = 'sk.eyJ1IjoiZGFuaWVsZmIxMjQiLCJhIjoiY20ybHpoMHI1MGdrdjJscHdzaDd1OWw1ZSJ9.Lv022kbg8LPlDGu8pQn-SA'; 
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxAccessToken}&country=CO`
      );

      const results = response.data.features.map(feature => feature.place_name);
      setSuggestions(results); 
    } catch (error) {
      console.error('Error al obtener sugerencias de dirección:', error);
    }
  };

  return (
    <ImageBackground source={require('./assets/fondo_home.jpg')} style={styles.postAnimalContainer}>
      <ScrollView contentContainerStyle={styles.postAnimalScrollView}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Selecciona una imagen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Toma una foto</Text>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.map((image, index) => (
            <View key={index} style={styles.postAnimalImageContainer}>
              <PinchGestureHandler
                onGestureEvent={onZoomEvent.current}
                onHandlerStateChange={onZoomStateChange.current}
              >
                <Image source={{ uri: image }} style={[styles.postAnimalImage, { transform: [{ scale: scale }] }]} />
              </PinchGestureHandler>
              <Text style={styles.postAnimalImageIndex}>{index + 1} / {images.length}</Text>
            </View>
          ))}
        </ScrollView>

        <Picker
          selectedValue={animalData.animal_type}
          style={styles.input} 
          onValueChange={(itemValue) => {
            setAnimalData({ ...animalData, animal_type: itemValue, breed: '' });
            if (itemValue === 'Perro') {
              setBreedsOptions(dogBreeds);
            } else if (itemValue === 'Gato') {
              setBreedsOptions(catBreeds);
            } else {
              setBreedsOptions([]);
            }
          }}
        >
          <Picker.Item label="Selecciona el tipo de animal" value="" />
          <Picker.Item label="Perro" value="Perro" />
          <Picker.Item label="Gato" value="Gato" />
        </Picker>

        <Picker
          selectedValue={animalData.breed}
          style={styles.input} 
          onValueChange={(itemValue) => setAnimalData({ ...animalData, breed: itemValue })}
          enabled={breedsOptions.length > 0}
        >
          <Picker.Item label="Selecciona la raza" value="" />
          {breedsOptions.map((breed, index) => (
            <Picker.Item key={index} label={breed} value={breed} />
          ))}
        </Picker>

        <Picker
          selectedValue={animalData.sexing}
          style={styles.input} 
          onValueChange={(itemValue) => setAnimalData({ ...animalData, sexing: itemValue })}
        >
          <Picker.Item label="Selecciona el sexo" value="" />
          <Picker.Item label="Macho" value="Macho" />
          <Picker.Item label="Hembra" value="Hembra" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Descripción del estado"
          placeholderTextColor="white"
          onChangeText={(text) => setAnimalData({ ...animalData, state_description: text })}
        />

        <View style={{ position: 'relative' }}></View>
        <TextInput
          style={styles.input}
          placeholder="Ubicación exacta"
          placeholderTextColor="white"
          value={animalData.exact_location} 
          onChangeText={(text) => {
            setAnimalData({ ...animalData, exact_location: text });
            getAddressSuggestions(text); 
          }}
        />
        
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <ScrollView nestedScrollEnabled style={{ maxHeight: 150 }}>
              {suggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setAnimalData({ ...animalData, exact_location: suggestion }); 
                    setSuggestions([]); 
                  }}
                  style={styles.suggestionItem}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={submitData}>
          <Text style={styles.buttonText}>Enviar datos</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}
