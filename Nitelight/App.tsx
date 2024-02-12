import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Appbar, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import your preferred icon library


import HomeScreen from './screens/HomeScreen';
import VenueScreen from './screens/VenueScreen';
import SafetyScreen from './screens/SafetyScreen';
import { create } from 'react-test-renderer';
import SplashScreen from 'react-native-splash-screen';
const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Venues"
              component={VenueScreen}
              options={{
                tabBarLabel: 'Venues',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="map-marker" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Safety"
              component={SafetyScreen}
              options={{
                tabBarLabel: 'Safety',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="shield" color={color} size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 

export default MyTabs;
