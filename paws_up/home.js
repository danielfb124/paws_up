import React, { useLayoutEffect, useContext } from 'react';
import { Image, View, ImageBackground, TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from './styles';
import { AuthContext } from './AuthContext';

export default function Home({ navigation }) {
    const { setIsAuthenticated, setUsername } = useContext(AuthContext);
    const handleGuestEntry = () => {
        setIsAuthenticated(false); 
        setUsername(null); 
        navigation.navigate('MainScreen');
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <ImageBackground 
            source={require('./assets/fondo_home.jpg')} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image 
                        source={require('./assets/logo.png')} 
                        style={styles.logo}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registro')}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleGuestEntry}>
                <Text style={styles.buttonText}>Invitado</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

