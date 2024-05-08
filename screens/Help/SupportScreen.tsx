import React from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text, Pressable } from "react-native";
import { Constants } from "../../components/constants";

const SupportScreen = () => {

	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [issue, setIssue] = React.useState("");

	const styles = StyleSheet.create({
		container: {
			flex: 1,
		},
		submit: {
			height: 50,
			marginLeft: 15,
			marginRight: 15,
			borderRadius: 15,
			alignSelf: "stretch",
			backgroundColor: Constants.baseDark,
			justifyContent: "center",
			alignItems: "center",
		},
	})

	return (
		<View style={styles.container}>
			<View>
				<Text>Let us know how we can help you!</Text>
			</View>
			<View>
				<TextInput
					onChangeText={setName}
					value={name}
					placeholder="Enter Name"
					placeholderTextColor={"#808080"}
					autoCapitalize="none"
				/>
				<TextInput
					onChangeText={setEmail}
					value={email}
					placeholder="example@gmail.com"
					placeholderTextColor={"#808080"}
					autoCapitalize="none"
				/>
				<TextInput
					onChangeText={setIssue}
					value={issue}
					placeholder="Type here..."
					placeholderTextColor={"#808080"}
					autoCapitalize="none"
				/>
			</View>
				<Pressable
					onPress={() => {
					}}
				>
					<View style={styles.submit}>
						<Text
						style={{
							color: "#FFFFFF",
							fontSize: 20,
						}}>
						Submit</Text>
					</View>
				</Pressable>
		</View>
	);
}

export default SupportScreen;
