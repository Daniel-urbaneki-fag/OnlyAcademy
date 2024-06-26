import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TelaHome } from './src/pages/TelaHome';
import { TelaPerfilUsuario } from './src/pages/TelaPerfilUsuario';
import { TelaChat } from './src/pages/TelaChat';
import { PaymentScreen } from './src/pages/TelaPagamento';

import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const icons = {
  Home: require('./src/images/home.png'),
  Perfil: require('./src/images/user.png'),
  Chat: require('./src/images/chat.png'),
  Alert: require('./src/images/alert.png'),
};

export default function App() {
  const [is_payment_active, setIsPaymentActive] = useState(Boolean);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@payment_storage');
      if (value !== null) {
        if(value === 'true') {
          setIsPaymentActive(true)
        } else {
          setIsPaymentActive(false)
        }
      } else {
        setIsPaymentActive(false)
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <NavigationContainer>
      {is_payment_active ? (
        <Tab.Navigator
        initialRouteName="Perfil"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = icons.Home;
            } else if (route.name === 'Perfil') {
              iconName = icons.Perfil;
            } else if (route.name === 'Chat') {
              iconName = icons.Chat;
            } else if (route.name === 'Notification') {
              iconName = icons.Alert;
            } else {
              iconName = icons.Alert;
            }

            return <Image source={iconName} style={{ width: 30, height: 30, tintColor: focused ? '#cfd4ff' : '#FFFFFF' }} />;
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: { height: 100, paddingTop: 20, backgroundColor: '#5790df' },
        })}
      >
        <Tab.Screen name="Home" component={TelaHome} />
        <Tab.Screen name="Chat" component={TelaChat} />
        <Tab.Screen name="Perfil" component={TelaPerfilUsuario} />
        <Tab.Screen name="Notification" component={TelaPerfilUsuario} />
      </Tab.Navigator>
      ) : (
        <PaymentScreen />
      )} 
    </NavigationContainer>
  );
}
