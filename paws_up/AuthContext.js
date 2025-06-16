import React, { createContext, useState } from 'react';
import {  Alert } from 'react-native';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const logout = () => {
    Alert.alert(
      "Sesión finalizada",
      "Has cerrado la sesión exitosamente.",
      [
        { text: "OK", onPress: () => {
          setIsAuthenticated(false);
          setUsername(null);
          setUserId(null);
        }}
      ]
    );
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, username, setUsername, userId, setUserId,logout}}>
      {children}
    </AuthContext.Provider>
  );
};