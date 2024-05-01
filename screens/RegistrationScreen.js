import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { register } from "../services/AuthService";

const RegistrationScreen = ({ navigation }) => {
  // MARK: Vars
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function checkFieldCompletion() {
    if (email === "" || password === "" || confirmPassword === "") {
      Alert.alert("Error", "Please fill all the fields.");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return false;
    }
    return true;
  }

  // MARK: handleRegister
  const handleRegister = async () => {
    if (!checkFieldCompletion) {
      return;
    }

    try {
      const userId = await register(email, password);
      console.log(userId);

      Alert.alert("Success", "Registration Successful", [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
    } catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  // MARK: Body
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
