import React from "react";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Constants } from "../../components/constants";
import { removeUserIdLocally } from "../../services/AuthService";
import { useUserProfileContext } from "../../stores/UserProfileContext";
import { changePassword, getUser } from "../../services/ProfileService";

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
      const a = await changePassword(email, newPassword);

      Alert.alert("Success", "Change Password Successful", [{ text: "OK" }]);
			setCurrentPass("")
			setNewPass("")
			setConfirmNewPass("")
    } catch (error) {
      Alert.alert("Error", "Password change unsuccessful");
    }
  };
  const styles = StyleSheet.create({
		confirm: {
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      marginLeft: 15,
      marginRight: 15,
      borderRadius: 15,
      backgroundColor: Constants.baseDark,
		},
		confirmText: {
			color: "#FFFFFF",
			fontSize: 20,
		},
		inputContainer: {
			marginTop: 20,
			marginBottom: 20,
			gap: 20,
		},
		text: {
			justifyContent: "center",
			height: 40,
			marginLeft: 20,
			paddingLeft: 10,
			marginRight: 20,
			borderWidth: 1,
			borderRadius: 5,
			fontSize: 15,
		},
  });
  return (
    <View>
      <View style={styles.inputContainer}>
					<TextInput
						style={styles.text}
						onChangeText={setCurrentPass}
						value={currentPass}
						placeholder="Current Password"
						placeholderTextColor={"#808080"}
						autoCapitalize="none"
						//secureTextEntry={true} uncomment to switch to password dots
					/>
					<TextInput
						style={styles.text}
						onChangeText={setNewPass}
						value={newPass}
						placeholder="New Password"
						placeholderTextColor={"#808080"}
						autoCapitalize="none"
						//secureTextEntry={true}
					/>
					<TextInput
						style={styles.text}
						onChangeText={setConfirmNewPass}
						value={confirmNewPass}
						placeholder="Confirm New Password"
						placeholderTextColor={"#808080"}
						autoCapitalize="none"
						//secureTextEntry={true}
					/>
      </View>
			<Pressable
          onPress={() => handlePasswordChange(newPass)}
			>
				<View style={styles.confirm}>
          <View>
            <Text style={styles.confirmText}>Confirm</Text>
          </View>
				</View>
			</Pressable>
    </View>
  );
};

export default ChangePasswordScreen;
