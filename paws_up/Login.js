import React, { useState, useContext } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import styles from './styles';
import { AuthContext } from './AuthContext';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setIsAuthenticated, setUsername , setUserId} = useContext(AuthContext); 

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://paws-up.onrender.com/login', { email, password });
            if (response.status === 200) {
                setIsAuthenticated(true); 
                setUsername(response.data.username);
                setUserId(response.data.userId);
                navigation.navigate('MainScreen');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error(error);
            setError('Usuario o contraseña incorrecto');
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
                    placeholder="Correo"
                    placeholderTextColor="white"
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="white"
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registro')}>
                    <Text style={styles.buttonText}>Registrate</Text>
                </TouchableOpacity>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
        </ImageBackground>
    );
}
