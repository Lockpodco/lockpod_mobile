import React from "react";
import {
  Alert,
  StyleSheet,
  View,
} from "react-native";
import { Constants } from "../../components/constants";
import { removeUserIdLocally } from "../../services/AuthService";
import { useUserProfileContext } from "../../stores/UserProfileContext";
import { changePassword, getUser } from "../../services/ProfileService";
import { PlainTextField } from "../../components/Forms/FormComponents";
import { DefaultSubmitButton } from "../../components/Buttons";

const ChangePasswordScreen = ({ navigation }: { navigation: any }) => {
  const [currentPass, setCurrentPass] = React.useState("");
  const [newPass, setNewPass] = React.useState("");
  const [confirmNewPass, setConfirmNewPass] = React.useState("");

  const { userProfile, profileDispatch } = useUserProfileContext();

  function checkFieldCompletion(password: string) {
    if (currentPass === "" || newPass === "" || confirmNewPass === "") {
      Alert.alert("Error", "Please fill all the fields.");
      return false;
    }
    if (currentPass !== password) {
      Alert.alert("Error", "Incorrect password");
      return false;
    }
    if (newPass !== confirmNewPass) {
      Alert.alert("Error", "New password does not match.");
      return false;
    }
    return true;
  }

  const handlePasswordChange = async (newPassword: string) => {
    const user = await getUser(userProfile["user_id"]);
    const password = user["password"];
    const email = user["email"];
    if (!checkFieldCompletion(password)) {
      return;
    }
    try {
      const result = await changePassword(email, newPassword);

      Alert.alert("Success", "Change Password Successful", [{ text: "OK" }]);
			setCurrentPass("")
			setNewPass("")
			setConfirmNewPass("")
    } catch (error) {
      Alert.alert("Error", "Password change unsuccessful");
    }
  };

  const styles = StyleSheet.create({
		inputContainer: {
			marginTop: 20,
			marginBottom: 20,
			gap: 20,
		},
  });

  return (
    <View>
      <View style={styles.inputContainer}>
					<PlainTextField 
						value={currentPass}
						placeHolder="Current Password"
						height={null}
						multiline= { false }
						secureTextEntry= { false }
						setValue={setCurrentPass}
					/>
					<PlainTextField 
						value={newPass}
						placeHolder="New Password"
						height={null}
						multiline= { false }
						secureTextEntry= { false }
						setValue={setNewPass}
					/>
					<PlainTextField 
						value={confirmNewPass}
						placeHolder="Confirm New Password"
						height={null}
						multiline= { false }
						secureTextEntry= { false }
						setValue={setConfirmNewPass}
					/>
      </View>
			<DefaultSubmitButton
				title="Confirm"
				isActive={true}
				activeColor={Constants.baseDark}
  			horizontalLayout={false}
  			onSubmit={() => handlePasswordChange(newPass)}
			/>

    </View>
  );
};

export default ChangePasswordScreen;
