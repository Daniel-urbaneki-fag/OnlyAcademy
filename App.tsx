import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TelaHome } from './src/pages/TelaHome';
import { TelaPerfilUsuario } from './src/pages/TelaPerfilUsuario';
import { TelaChat } from './src/pages/TelaChat';

const Tab = createBottomTabNavigator();

const icons = {
  Home: require('./src/images/home.png'),
  Perfil: require('./src/images/user.png'),
  Chat: require('./src/images/chat.png'),
  Alert: require('./src/images/alert.png'),
};

export default function App() {
  return (
    <NavigationContainer>
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
            }

            return <Image source={iconName} style={{ width: 30, height: 30, tintColor: focused ? '#FFFFFF' : '#FFFFFF' }} />;
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: { height: 100, paddingBottom: 30, backgroundColor: '#5790DF', borderTopLeftRadius: 30, borderTopRightRadius: 30 },
        })}
      >
        <Tab.Screen name="Home" component={TelaHome} />
        <Tab.Screen name="Chat" component={TelaChat} />
        <Tab.Screen name="Perfil" component={TelaPerfilUsuario} />
        <Tab.Screen name="Notification" component={TelaPerfilUsuario} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
