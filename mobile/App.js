// App.js
// PURPOSE: Main entry point for React Native app
// WHY: Sets up navigation between screens
// WHAT IT DOES: Configures navigation stack with Login and Dashboard screens

import 'react-native-gesture-handler'; // MUST be at the top!
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AdminScreen from './src/screens/AdminScreen';

/**
 * # NAVIGATION STACK
 * WHY: React Navigation manages screen navigation
 * HOW: Stack navigator (screens stack on top of each other)
 */
const Stack = createStackNavigator();

/**
 * # MAIN APP COMPONENT
 * WHY: Root component that wraps entire app
 * WHAT: Navigation container with screen stack
 */
export default function App() {
  return (
    <>
      {/* # STATUS BAR: Controls phone's status bar appearance */}
      <StatusBar style="light" />
      
      {/* 
        # NAVIGATION CONTAINER
        WHY: Provides navigation context to all screens
      */}
      <NavigationContainer>
        {/* 
          # STACK NAVIGATOR
          WHY: Allows navigation between screens
          initialRouteName: First screen to show
        */}
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false, // Hide default header
          }}
        >
          {/* # LOGIN SCREEN */}
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
          />
          
          {/* # DASHBOARD SCREEN */}
          <Stack.Screen 
            name="Dashboard" 
            component={DashboardScreen}
          />

          {/* # ADMIN SCREEN */}
          <Stack.Screen 
            name="Admin" 
            component={AdminScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

/**
 * # HOW NAVIGATION WORKS
 * 
 * 1. User starts at Login screen (initialRouteName)
 * 2. LoginScreen calls: navigation.replace('Dashboard')
 *    - replace: Can't go back (login screen removed from stack)
 * 3. DashboardScreen can call: navigation.replace('Login') to logout
 * 
 * Navigation Methods:
 * - navigate('ScreenName'): Go to screen (can go back)
 * - replace('ScreenName'): Replace current screen (can't go back)
 * - goBack(): Go to previous screen
 */
