import React from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text, Pressable } from "react-native";
import { Constants } from "../../components/constants";
import { PlainTextField } from "../../components/Forms/FormComponents";
import { DefaultSubmitButton } from "../../components/Buttons";

const SupportScreen = () => {

	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [issue, setIssue] = React.useState("");

	const styles = StyleSheet.create({
		container: {
			flex: 1,
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
		},
		text: {
			marginLeft: 20,
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
					<PlainTextField 
						value={name}
						placeHolder="Enter Name"
						height={0}
						multiline= { false }
						secureTextEntry= { false }
						setValue={setName}
					/>
				</View>
				<View>
					<Text style={styles.text}>Email</Text>
					<PlainTextField 
						value={email}
						placeHolder="example@gmail.com"
						height={0}
						multiline={false}
						secureTextEntry={false}
						setValue={setEmail}
					/>
				</View>
				<View>
					<Text style={styles.text}>Report Issue</Text>
					<PlainTextField 
						value={issue}
						placeHolder="Type here..."
						height={100}
						multiline={true}
						secureTextEntry={false}
						setValue={setIssue}
					/>
				</View>
			</View>
			<DefaultSubmitButton 
				title="Submit"
				isActive={true}
				activeColor={Constants.baseDark}
				horizontalLayout={false}
				onSubmit={() => {}}
			/>
		</View>
	);
}

export default SupportScreen;
