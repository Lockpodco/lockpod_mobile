import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signIn } from "../services/AuthService";

const SignInScreen = ({ navigation }) => {
  // MARK: Vars
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // MARK: handleSignIn
  const handleSignIn = async () => {
    if (email === "" || password === "") {
      Alert.alert("Please enter both email and password.");
      return;
    }

    try {
      const userId = await signIn(email, password);

      console.log(userId);

      Alert.alert("Login Successful!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  // MARK: Body
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

export default SignInScreen;
