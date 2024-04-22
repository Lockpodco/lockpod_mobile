import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { login } from '../services/AuthService';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (email === '' || password === '') {
      Alert.alert('Please enter both email and password.');
      return;
    }

    try {
      // Calling the login service with email and password
      const response = await login(email, password);
      Alert.alert('Login Successful!');
      // Here you would navigate to your app's main screen or dashboard
      navigation.navigate('HomeScreen'); // replace 'HomeScreen' with your home screen's name
    } catch (error) {
      // If there's an error (e.g., incorrect credentials), show an alert
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default SignInScreen;
