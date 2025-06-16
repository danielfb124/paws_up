// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home';
import Login from './Login';
import Registro from './registro';
import MainScreen from './MainScreen';
import PostAnimal from './Post_animal';
import ChatScreen from './ChatScreen'; 
import { AuthProvider } from './AuthContext';
import PostDetailScreen from './PostDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ title: 'Iniciar sesión' }} 
          />
          <Stack.Screen 
            name="Registro" 
            component={Registro} 
            options={{ title: 'Registrarse' }} 
          />
          <Stack.Screen 
            name="MainScreen" 
            component={MainScreen} 
            options={{ title: 'Publicaciones',
            headerLeft: null
            }} 
          />
          <Stack.Screen 
            name="Post_animal" 
            component={PostAnimal} 
            options={{ title: 'Crear Publicación' }} 
          />
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen} 
            options={{ title: 'Chat' }}
          />
            <Stack.Screen 
            name="PostDetail" 
            component={PostDetailScreen}  
            options={{ title: 'Detalle de Publicación' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
