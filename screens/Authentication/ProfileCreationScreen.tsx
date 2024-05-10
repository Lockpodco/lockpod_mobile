import React from "react";
import { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

import { UserProfile } from "../../Models/UserProfileModel";

import {
  useUserProfileContext,
  UpdateUserProfileActionType,
} from "../../stores/UserProfileContext";

import { Constants } from "../../components/constants";
import { StyledTextField } from "../../components/Forms/FormComponents";
import { StyledSubmitButton } from "../../components/Buttons";

const ProfileCreationScreen = ({ navigation }: { navigation: any }) => {
  // MARK: Vars
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  const { userProfile, profileDispatch } = useUserProfileContext();

  function checkFormCompletion(): boolean {
    return !(firstName === "" || lastName === "" || userName === "");
  }

  async function submitInformation() {
    const id = userProfile.user_id;
    const newProfile = new UserProfile(id, firstName, lastName, userName);

    profileDispatch!({
      type: UpdateUserProfileActionType.updateProfile,
      updatedProfile: newProfile,
    });

    await newProfile.saveChangesToDataBase();

    navigation.navigate("Home");
  }

  //   MARK: styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
    },

    bottom: {
      marginBottom: Constants.bottomOfPagePadding,
    },
  });

  // MARK: Body
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StyledTextField
          value={firstName}
          placeHolder={"first Name"}
          secureTextEntry={false}
          setValue={setFirstName}
        />

        <StyledTextField
          value={lastName}
          placeHolder={"last Name"}
          secureTextEntry={false}
          setValue={setLastName}
        />

        <StyledTextField
          value={userName}
          placeHolder={"username"}
          secureTextEntry={false}
          setValue={setUserName}
        />
      </View>

      <View style={styles.bottom}>
        <StyledSubmitButton
          title="continue"
          isActive={checkFormCompletion()}
          horizontalLayout={false}
          onSubmit={submitInformation}
        />
      </View>
    </View>
  );
};

export default ProfileCreationScreen;
