import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
} from 'react-native';

import { TelaHome } from './src/pages/TelaHome';
import { TelaPerfilUsuario } from './src/pages/TelaPerfilUsuario';
import { TelaChat } from './src/pages/TelaChat';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = "";

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'user' : 'user';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'comments' : 'comments';
          }

          return <Icon name="home" size={30} color="#000000" />;
        },
      })}
      
      >
        <Tab.Screen
          name="Home"
          component={TelaHome}
        />
        <Tab.Screen
          name="Perfil"
          component={TelaPerfilUsuario}
        />
        <Tab.Screen
          name="Chat"
          component={TelaChat}
        />
      </Tab.Navigator>
    </NavigationContainer >
    );
}

const styles = StyleSheet.create({

});
