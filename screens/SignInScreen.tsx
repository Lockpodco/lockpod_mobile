import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import { StyledTextField } from "../components/Forms/FormComponents";
import { StyledSubmitButton } from "../components/Buttons";

import { signIn, getUserProfile } from "../services/AuthService";
import { useUserProfileContext } from "../stores/UserProfileContext";

export const SignInScreen = () => {
  // MARK: Vars
  const [signedIn, setSignedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // calls useContext on the userProfileStore context that was created globally
  const { userProfile, profileDispatch } = useUserProfileContext();

  function checkFieldCompletion(): boolean {
    return !(email === "" || password === "");
  }

  // MARK: Post Authentication
  // this function runs once a user is authenticated; regardless of if they signed in or registered
  const postAuthentication = async (user_id: Number) => {
    try {
      const userProfile = await getUserProfile(user_id);

      profileDispatch({
        type: "loadProfile",
        payload: userProfile,
      });

      setSignedIn(true);
    } catch (error) {
      Alert.alert("Login Failed", (error as Error).message);
    }
  };

  // MARK: handleSignIn
  const handleSignIn = async () => {
    if (!checkFieldCompletion()) {
      Alert.alert("Please enter both email and password.");
      return;
    }

    try {
      const user_id = await signIn(email, password);

      await postAuthentication(user_id);

      // navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Login Failed", (error as Error).message);
    }
  };

  function getUserId() {
    return signedIn ? userProfile["user_id"] : "not signed in";
  }

  // MARK: Body
  return (
    <View>
      <StyledTextField
        value={email}
        placeHolder="email"
        secureTextEntry={false}
        setValue={setEmail}
      />
    </View>
  );
};
