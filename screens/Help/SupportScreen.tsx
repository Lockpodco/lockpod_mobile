import React from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text, Pressable } from "react-native";
import { Constants } from "../../components/constants";
import { PlainTextField } from "../../components/Forms/FormComponents";
import { DefaultSubmitButton } from "../../components/Buttons";
import { RegularText } from "../../components/Text";

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
		inputContainer: {
			marginTop: 30,
			marginBottom: 20,
		},
		text: {
			marginLeft: 20,
			fontSize: 15,
		},
		inputTitle: {
			marginLeft: 20,
		},
	})

	return (
		<View style={styles.container}>
			<View style={styles.greetContainer}>
					<RegularText
						value="Let us know how we can help you!"
						style={null}
					/>
			</View>
			<View style={styles.inputContainer}>
				<View>
					<RegularText
						value="Name"
						style={styles.inputTitle}
					/>
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
					<RegularText
						value="Email"
						style={styles.inputTitle}
					/>
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
					<RegularText
						value="Report Issue"
						style={styles.inputTitle}
					/>
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
