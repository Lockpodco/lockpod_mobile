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
		greetContainer: {
			marginTop: 30,
			alignItems: "center",
		},
		greetText: {
			fontSize: 15,
		},
		inputContainer: {
			marginTop: 30,
			marginBottom: 20,
			gap: 20,
		},
		text: {
			marginLeft: 20,
			marginBottom: 4,
			fontSize: 15,
		},
		smallInput: {
			height: 40,
			marginLeft: 20,
			paddingLeft: 10,
			marginRight: 20,
			borderWidth: 1,
			borderRadius: 5,
			fontSize: 15,
		},
		largeInput: {
			textAlignVertical: "top",
			height: 100,
			paddingTop: 8,
			marginLeft: 20,
			paddingLeft: 10,
			marginRight: 20,
			borderWidth: 1,
			borderRadius: 5,
			fontSize: 15,
		},
	})

	return (
		<View style={styles.container}>
			<View style={styles.greetContainer}>
				<Text style={styles.greetText}>Let us know how we can help you!</Text>
			</View>
			<View style={styles.inputContainer}>
				<View>
					<Text style={styles.text}>Name</Text>
					<TextInput
						style={styles.smallInput}
						onChangeText={setName}
						value={name}
						placeholder="Enter Name"
						placeholderTextColor={"#808080"}
						autoCapitalize="none"
					/>
				</View>
				<View>
					<Text style={styles.text}>Email</Text>
					<TextInput
						style={styles.smallInput}
						onChangeText={setEmail}
						value={email}
						placeholder="example@gmail.com"
						placeholderTextColor={"#808080"}
						autoCapitalize="none"
					/>
				</View>
				<View>
					<Text style={styles.text}>Report Issue</Text>
					<TextInput
						style={styles.largeInput}
						onChangeText={setIssue}
						value={issue}
						placeholder="Type here..."
						placeholderTextColor={"#808080"}
						autoCapitalize="none"
						multiline={true}
					/>
				</View>
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
