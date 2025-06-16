import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import styles from './styles';
export default function Registro({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [celular, setCelular] = useState('');

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Por favor, introduce un correo electrónico válido.');
      return;
    }

    try {
      const response = await axios.post('https://paws-up.onrender.com/register', { nombre, email, contraseña,celular });
      console.log(response.data);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
        source={require('./assets/fondo_home.jpg')} 
        style={styles.background}
        resizeMode="cover"
    >
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="white"
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo"
                placeholderTextColor="white"
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="white"
                secureTextEntry
                onChangeText={setContraseña}
            />
             <TextInput
                style={styles.input}
                placeholder="Celular"
                placeholderTextColor="white"
                onChangeText={setCelular}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
    );
}

