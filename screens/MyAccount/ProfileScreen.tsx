import React from "react";
import { View, StyleSheet, Text, Image, TextInput, Button, Alert } from 'react-native';

import { useUserProfileContext } from "../../stores/UserProfileContext";
import { removeUserIdLocally } from "../../services/AuthService";
import { changePassword, getUser } from "../../services/ProfileService";

const ProfileScreen = ({ navigation }: { navigation: any }) => {
	const [currentPass, setCurrentPass] = React.useState('');
	const [newPass, setNewPass] = React.useState('');
	const [confirmNewPass, setConfirmNewPass] = React.useState('');

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

			Alert.alert("Success", "Change Password Successful", [
				{ text: "OK", },
			]);

		} catch (error) {
			Alert.alert("Error", "Password change unsuccessful");
		}
	};

    return (
        <View >
			<View>
				<Text>Reset your password</Text>
				<TextInput
					onChangeText={setCurrentPass}
					value={currentPass}
					placeholder="Current Password"
					placeholderTextColor={"#808080"}
					autoCapitalize="none"
					//secureTextEntry={true} uncomment to switch to password dots
				/>
				<TextInput
					onChangeText={setNewPass}
					value={newPass}
					placeholder="New Password"
					placeholderTextColor={"#808080"}
					autoCapitalize="none"
					//secureTextEntry={true}
				/>
				<TextInput
					onChangeText={setConfirmNewPass}
					value={confirmNewPass}
					placeholder="Confirm New Password"
					placeholderTextColor={"#808080"}
					autoCapitalize="none"
					//secureTextEntry={true}
				/>
				<Button
					onPress={() => handlePasswordChange(newPass)}
					title="Change Password"
					color={"#1CB91B"}
				/>
			</View>
			<View>
				<Button
					onPress={() => {
						navigation.navigate("Auth");
						removeUserIdLocally();
					}}
					title="Log Out"
				/>
			</View>
        </View>
    );
};

export default ProfileScreen;
