import React from "react";
import { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

import {
  useUserProfileContext,
  UpdateUserProfileActionType,
  UserProfile,
} from "../../stores/UserProfileContext";
import { updateProfileInformation } from "../../services/ProfileService";

import { Constants } from "../../components/constants";
import { PlainTextField } from "../../components/Forms/FormComponents";
import { DefaultSubmitButton } from "../../components/Buttons";

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
    const id = userProfile["user_id"];
    const newProfile: UserProfile = await updateProfileInformation(
      id,
      firstName,
      lastName,
      userName
    );

    profileDispatch!({
      type: UpdateUserProfileActionType.loadProfile,
      updatedProfile: newProfile,
    });

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
				<PlainTextField
          value={firstName}
          placeHolder={"first Name"}
					height={null}
					multiline={false}
          secureTextEntry={false}
          setValue={setFirstName}
				/>

				<PlainTextField
          value={lastName}
          placeHolder={"last name"}
					height={null}
					multiline={false}
          secureTextEntry={false}
          setValue={setLastName}
				/>

				<PlainTextField
          value={userName}
          placeHolder={"username"}
					height={null}
					multiline={false}
          secureTextEntry={false}
          setValue={setUserName}
				/>
      </View>

      <View style={styles.bottom}>
				<DefaultSubmitButton 
          title="Continue"
          isActive={checkFormCompletion()}
					activeColor={Constants.darkAccent}
          horizontalLayout={false}
          onSubmit={submitInformation}
				/>
      </View>
    </View>
  );
};

export default ProfileCreationScreen;
