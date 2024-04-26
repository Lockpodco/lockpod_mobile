import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { register } from "../services/AuthService";

const RegistrationScreen = ({ navigation }) => {
  // MARK: Vars
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (email === "" || password === "" || confirmPassword === "") {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      // Call the register function from AuthService
      await register(email, password);
      Alert.alert("Success", "Registration Successful", [
        { text: "OK" /*onPress: () => navigation.navigate("SignInScreen")*/ },
      ]);
    } catch (error) {
      // If there's an error (e.g., user already exists), show an alert
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default RegistrationScreen;
