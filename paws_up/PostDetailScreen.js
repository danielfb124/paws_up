import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, Linking, SafeAreaView, ImageBackground, Modal, Button, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PaginationDot from 'react-native-animated-pagination-dot';
import axios from 'axios';
import styles from './styles';
import { AuthContext } from './AuthContext';

const PostDetailScreen = ({ route }) => {
  const { itemId } = route.params;
  const [postDetails, setPostDetails] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`https://paws-up.onrender.com/animals/${itemId}`);
        const json = await response.json();
        setPostDetails(json);

        if (json.exact_location) {
          getGeocoding(json.exact_location); 
        }
      } catch (error) {
        console.error('Error al obtener los detalles del animal:', error);
      }
    };

    fetchPostDetails();
  }, [itemId]);

  const getGeocoding = async (address) => {
    try {
      const mapboxAccessToken = 'sk.eyJ1IjoiZGFuaWVsZmIxMjQiLCJhIjoiY20ybHpoMHI1MGdrdjJscHdzaDd1OWw1ZSJ9.Lv022kbg8LPlDGu8pQn-SA'; 
      const formattedAddress = `${address}, Colombia`; 
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(formattedAddress)}.json?access_token=${mapboxAccessToken}&country=CO&limit=10`
      );
  
      const { features } = response.data;
      if (features.length > 0) {
        const [longitude, latitude] = features[0].geometry.coordinates;
        const mapImageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${longitude},${latitude})/${longitude},${latitude},14/600x600?access_token=${mapboxAccessToken}`;
        setImageUrl(mapImageUrl);
      } else {
        Alert.alert('No se pudo encontrar la ubicación.');
      }
    } catch (error) {
      console.error('Error obteniendo geocodificación de Mapbox:', error);
    }
  };
  

  const enviarMensaje = async () => {
    if (!isAuthenticated) {
      Alert.alert('Debes iniciar sesión para enviar un mensaje.');
      return;
    }

    try {
      const response = await fetch(`https://paws-up.onrender.com/obtenerCelular/${postDetails.user_id}`);
      const data = await response.json();

      if (response.ok && data.celular) {
        const mensaje = encodeURIComponent('Hola, estoy interesado en el animal que publicaste.');
        const celularFormateado = data.celular.replace(/\D/g, '');
        const whatsappUrl = `https://wa.me/+${celularFormateado}?text=${mensaje}`;
        Linking.openURL(whatsappUrl);
      } else {
        Alert.alert('No se pudo obtener el número de teléfono. Intenta más tarde.');
      }
    } catch (error) {
      console.error('Error al obtener el número de teléfono:', error);
      Alert.alert('Hubo un error al intentar enviar el mensaje. Verifica tu conexión a Internet.');
    }
  };

  const handleNextImage = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % postDetails.image_data.length);
  };

  const handlePreviousImage = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? postDetails.image_data.length - 1 : prevIndex - 1
    );
  };

  const renderThumbnailItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => setSelectedIndex(index)} activeOpacity={0.7}>
      <Image
        source={{ uri: item }}
        style={[styles.thumbnailImage, selectedIndex === index && styles.selectedThumbnail]}
      />
    </TouchableOpacity>
  );

  if (!postDetails) {
    return <Text>Cargando detalles...</Text>;
  }

  return (
    <ImageBackground source={require('./assets/fondo_home.jpg')} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container2}>
        <View style={styles.contentContainer}>
          <View style={styles.thumbnailContainer}>
            <FlatList
              data={postDetails.image_data}
              renderItem={renderThumbnailItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailListContainer}
            />
          </View>

          <View style={styles.mainImageContainer}>
            <View style={styles.imageAndArrowContainer}>
              <TouchableOpacity onPress={handlePreviousImage} style={styles.arrowButton}>
                <Ionicons name="chevron-back" size={30} style={styles.arrowIcon} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsModalVisible(true)} activeOpacity={0.9}>
                <Image source={{ uri: postDetails.image_data[selectedIndex] }} style={styles.mainImage} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleNextImage} style={styles.arrowButton}>
                <Ionicons name="chevron-forward" size={30} style={styles.arrowIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.paginationContainer}>
              <PaginationDot
                activeDotColor={styles.paginationDot.activeDotColor}
                inactiveDotColor={styles.paginationDot.inactiveDotColor}
                curPage={selectedIndex}
                maxPage={postDetails.image_data.length}
              />
            </View>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <View style={styles.textBackground}>
            <Text style={styles.titleText}>
              {postDetails.animal_type ? postDetails.animal_type : 'Tipo desconocido'} - 
              {postDetails.breed ? postDetails.breed : 'Raza desconocida'}
            </Text>
            <Text style={styles.subtitleText}>
              Ubicación: {postDetails.exact_location ? postDetails.exact_location : 'Ubicación desconocida'}
            </Text>
            <Text style={styles.subtitleText}>
              Sexo: {postDetails.sexing ? postDetails.sexing : 'No especificado'}
            </Text>
            <Text style={styles.descriptionText}>
              Descripción: {postDetails.state_description ? postDetails.state_description : 'Sin descripción'}
            </Text>
          </View>

          <TouchableOpacity style={styles.messageButton} onPress={enviarMensaje}>
            <Text style={styles.messageButtonText}>Enviar mensaje</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mapContainer}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.mapImage}
            />
          ) : (
            <Text>Cargando mapa...</Text>
          )}
        </View>

        {}
        <Modal visible={isModalVisible} transparent={true} onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <FlatList
              data={postDetails.image_data}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.modalImage} />
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              initialScrollIndex={selectedIndex}
              extraData={selectedIndex}
              getItemLayout={(data, index) => ({
                length: Dimensions.get('window').width,
                offset: Dimensions.get('window').width * index,
                index,
              })}
            />
            <Button title="Cerrar" onPress={() => setIsModalVisible(false)} />
          </View>
        </Modal>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default PostDetailScreen;
