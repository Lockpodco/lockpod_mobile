import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";

import { signIn, getUserProfile } from "../services/AuthService";
import { useUserProfileContext } from "../stores/UserProfileContext";

const SignInScreen = ({ navigation }) => {
  // MARK: Vars
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // calls useContext on the userProfileStore context that was created globally
  const { userProfile, profileDispatch } = useUserProfileContext();

  // MARK: Post Authentication
  // this function runs once a user is authenticated; regardless of if they signed in or registered
  const postAuthentication = async (user_id) => {
    try {
      const userProfile = await getUserProfile(user_id);

      profileDispatch({
        type: "loadProfile",
        payload: userProfile,
      });

      setSignedIn(true);
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  // MARK: handleSignIn
  const handleSignIn = async () => {
    if (email === "" || password === "") {
      Alert.alert("Please enter both email and password.");
      return;
    }

    try {
      const user_id = await signIn(email, password);

      await postAuthentication(user_id);

      Alert.alert("Login Successful!");

      // navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  function getUserId() {
    return signedIn ? userProfile["user_id"] : "not signed in";
  }

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
      <Text>welcome, {getUserId()}</Text>
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
