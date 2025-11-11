// LoginScreen.tsx
// PURPOSE: Login screen for authentication
// WHY: Users need to login before accessing the app
// WHAT IT DOES: Provides login form with username and password

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

/**
 * # LOGIN SCREEN COMPONENT
 * WHY: Entry point for user authentication
 * WHAT: Form with username/password inputs and login button
 */
const LoginScreen = ({ navigation }: any) => {
  // # STATE MANAGEMENT
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * # HANDLE LOGIN
   * WHY: Authenticate user credentials with backend
   * HOW: POST request to /api/login endpoint
   */
  const handleLogin = async () => {
    // Validate inputs
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);

    try {
      // # API CALL: Send login credentials
      // NOTE: Android emulator uses 10.0.2.2 to access host machine's localhost
      // For physical device: Replace with your computer's IP (e.g., http://192.168.1.100:8080)
      // Find IP: Run 'ipconfig' in terminal and use IPv4 Address
      const response = await fetch('http://10.0.2.2:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();

      // # SUCCESS: Navigate to Dashboard
      Alert.alert('Success', 'Login successful!');
      navigation.replace('Dashboard'); // Replace = can't go back to login
    } catch (error) {
      Alert.alert('Error', 'Invalid username or password');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* # APP TITLE */}
        <Text style={styles.title}>Shopping App</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        {/* # USERNAME INPUT */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* # PASSWORD INPUT */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* # LOGIN BUTTON */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* # HINT FOR TESTING */}
        <Text style={styles.hint}>
          Default: admin / admin123
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

/**
 * # STYLES
 * WHY: React Native uses StyleSheet for styling
 * HOW: Similar to CSS but uses camelCase properties
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  hint: {
    marginTop: 20,
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
});

export default LoginScreen;
