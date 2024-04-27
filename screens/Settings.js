import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Pressable, Image, Animated, TextInput, Button } from 'react-native';

const Settings = () => {
	const [oldPass, oldPassword] = React.useState('');
	const [newPass, newPassword] = React.useState('');
	const [retypeNewPass, retypeNewPassword] = React.useState('');

    return (
        <View >
			<View>
				<Text>Reset your password</Text>
				<TextInput
					onChangeText={oldPassword}
					value={oldPass}
					placeholder="Old Password"
					placeholderTextColor={"#808080"}
					//secureTextEntry={true} uncomment to switch to password dots
				/>
				<TextInput
					onChangeText={newPassword}
					value={newPass}
					placeholder="New Password"
					placeholderTextColor={"#808080"}
					//secureTextEntry={true}
				/>
				<TextInput
					onChangeText={retypeNewPassword}
					value={retypeNewPass}
					placeholder="Retype New Password"
					placeholderTextColor={"#808080"}
					//secureTextEntry={true}
				/>
				<Button
					//onPress={}
					title="Change Password"
				/>
			</View>
        </View>
    );
};

export default Settings;
