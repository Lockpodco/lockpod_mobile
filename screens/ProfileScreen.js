import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Pressable, Image, Animated, TextInput, Button } from 'react-native';
import { changePassword } from "../services/AuthService";

const ProfileScreen = () => {
	const [currentPass, setCurrentPass] = React.useState('');
	const [newPass, setNewPass] = React.useState('');
	const [confirmNewPass, setConfirmNewPass] = React.useState('');

	function checkFieldCompletion() {
		if (currentPass === "" || newPass === "" || confirmNewPass === "") {
			Alert.alert("Error", "Please fill all the fields.");
			return false;
		}
		if (newPass !== confirmNewPass) {
			Alert.alert("Error", "New password does not match.");
			return false;
		}
		return true;
  	}

	const handlePasswordChange = async () => {
		if (!checkFieldCompletion) {
			return;
		}

		try {
			const response = await changePassword(currentPass, newPass);
			console.log(response);

			Alert.alert("Success", "Change Password Successful", [
				{ text: "OK", },
			]);

		} catch (error) {
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
					//secureTextEntry={true} uncomment to switch to password dots
				/>
				<TextInput
					onChangeText={setNewPass}
					value={newPass}
					placeholder="New Password"
					placeholderTextColor={"#808080"}
					//secureTextEntry={true}
				/>
				<TextInput
					onChangeText={setConfirmNewPass}
					value={confirmNewPass}
					placeholder="Confirm New Password"
					placeholderTextColor={"#808080"}
					//secureTextEntry={true}
				/>
				<Button
					onPress={handlePasswordChange}
					title="Change Password"
					color={"#1CB91B"}
				/>
			</View>
        </View>
    );
};

export default ProfileScreen;
