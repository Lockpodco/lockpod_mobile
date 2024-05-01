import React from "react";
import { useState, useRef, useEffect } from "react";
import { View, Button, StyleSheet, Text, Alert } from "react-native";

import {
  register,
  signIn,
  getUserProfile,
  getUserIdLocally,
  saveUserIdLocally,
} from "../services/AuthService";
import { useUserProfileContext } from "../stores/UserProfileContext";

import { Constants } from "../components/constants";
import { StyledTextField } from "../components/Forms/FormComponents";
import { StyledSubmitButton } from "../components/Buttons";

const AuthScreen = ({ navigation }: { navigation: any }) => {
  // MARK: Vars
  const [signInSection, setSignIn] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // calls useContext on the userProfileStore context that was created globally
  const { userProfile, profileDispatch } = useUserProfileContext();

  function checkFieldCompletion(): boolean {
    if (!signInSection) {
      if (password !== confirmPassword) {
        return false;
      }
    }
    return !(email === "" || password === "");
  }

  useEffect(() => {
    if (userProfile == null) {
      checkSignInStatus();
    }
  });

  // MARK: Methods
  const checkSignInStatus = async () => {
    const id = await getUserIdLocally();
    // user is already signed in and their id has been persisted in local storage
    if (id != 0) {
      console.log("user already signed in with id: " + id);
      await postAuthentication(id!);
    }
  };

  const postAuthentication = async (user_id: Number) => {
    try {
      const userProfile = await getUserProfile(user_id);
      await saveUserIdLocally(user_id);

      profileDispatch({
        type: "loadProfile",
        payload: userProfile,
      });

      if (userProfile["first_name"] != null) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("ProfileCreation");
      }
    } catch (error) {
      Alert.alert("Login Failed", (error as Error).message);
    }
  };

  //
  const handleSignIn = async () => {
    if (!checkFieldCompletion()) {
      Alert.alert("Please enter both email and password.");
      return;
    }

    try {
      const user_id = await signIn(email, password);
      await postAuthentication(user_id);
    } catch (error) {
      Alert.alert("Login Failed", (error as Error).message);
    }
  };

  const handleRegister = async () => {
    if (!checkFieldCompletion) {
      Alert.alert("Please correct your information.");
    }

    try {
      const userId = await register(email, password);
      await postAuthentication(userId);
    } catch (error) {
      Alert.alert("Registration Failed", (error as Error).message);
    }
  };

  async function submit() {
    if (signInSection) {
      await handleSignIn();
    } else {
      await handleRegister();
    }
  }

  // MARK: Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      flexDirection: "column",
      paddingTop: 10,
      alignItems: "center",
    },

    top: {
      flex: 1,
      width: "100%",
    },

    bottom: {
      flex: 0.25,
      width: "100%",
      marginBottom: Constants.bottomOfPagePadding,
    },

    errorMessage: {
      color: Constants.red,
      fontWeight: "bold",
      fontSize: 15,
      padding: 15,
    },

    hStack: {
      flexDirection: "row",
    },
  });

  // MARK: Body
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {signInSection ? (
          // signin screen
          <View>
            <StyledTextField
              value={email}
              placeHolder="email"
              secureTextEntry={false}
              setValue={setEmail}
            />
            <StyledTextField
              value={password}
              placeHolder="password"
              secureTextEntry={true}
              setValue={setPassword}
            />
          </View>
        ) : (
          // register screen
          <View>
            <StyledTextField
              value={email}
              placeHolder="email"
              secureTextEntry={false}
              setValue={setEmail}
            />
            <StyledTextField
              value={password}
              placeHolder="password"
              secureTextEntry={true}
              setValue={setPassword}
            />
            <StyledTextField
              value={confirmPassword}
              placeHolder="confirm password"
              secureTextEntry={true}
              setValue={setConfirmPassword}
            />
          </View>
        )}
      </View>

      {/* submit button */}
      <View style={styles.bottom}>
        <StyledSubmitButton
          title={signInSection ? "login" : "register"}
          isActive={checkFieldCompletion()}
          horizontalLayout={false}
          onSubmit={() => {
            submit();
          }}
        />

        {/* Toggle between signin and register */}
        <View style={styles.hStack}>
          <StyledSubmitButton
            title="register"
            isActive={!signInSection}
            horizontalLayout={true}
            onSubmit={() => {
              setSignIn(false);
            }}
          />
          <StyledSubmitButton
            title="log in"
            isActive={signInSection}
            horizontalLayout={true}
            onSubmit={() => {
              setSignIn(true);
            }}
          />
        </View>
      </View>

      {/* submit */}
    </View>
  );
};

export default AuthScreen;
