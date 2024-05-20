import React from "react";
import { useState, useRef, useEffect } from "react";
import { View, Button, StyleSheet, Text, Alert } from "react-native";

import {
	register,
	signIn,
	getUserProfile,
	getUserIdLocally,
	saveUserIdLocally,
} from "../../services/AuthService";
import {
	useUserProfileContext,
	UpdateUserProfileActionType,
} from "../../stores/UserProfileContext";

import { Constants } from "../../components/constants";
import {
	PlainTextField,
} from "../../components/Forms/FormComponents";
import {
	DefaultSubmitButton,
} from "../../components/Buttons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { MediumText, RegularText, SemiBoldText } from "../../components/Text";

const AuthScreen = ({ navigation }: { navigation: any }) => {
	// MARK: Vars
	const [signInSection, setSignIn] = useState(true);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// calls useContext on the userProfileStore context that was created globally
	const { userProfile, profileDispatch } = useUserProfileContext();


	function checkFieldCompletion(): boolean {
		if (!signInSection) {
			if (password !== confirmPassword) {
				return false;
			}
		}
		return !(email === "" || password === "");
	}

	useEffect(() => {
		if (userProfile == null) {
			checkSignInStatus();
		}
	});

	// MARK: Methods
	const checkSignInStatus = async () => {
		const id = await getUserIdLocally();
		// user is already signed in and their id has been persisted in local storage
		if (id != 0) {
			console.log("user already signed in with id: " + id);
			await postAuthentication(id!);
		}
	};

	const postAuthentication = async (user_id: Number) => {
		try {
			const userProfile = await getUserProfile(user_id);
			await saveUserIdLocally(user_id);

			profileDispatch!({
				type: UpdateUserProfileActionType.loadProfile,
				updatedProfile: userProfile,
			});

			if (userProfile["first_name"] != null) {
				navigation.navigate("Home");
			} else {
				navigation.navigate("ProfileCreation");
			}
		} catch (error) {
			Alert.alert("Login Failed", (error as Error).message);
		}
	};

	//
	const handleSignIn = async () => {
		if (!checkFieldCompletion()) {
			Alert.alert("Please enter both email and password.");
			return;
		}

		try {
			const user_id = await signIn(email, password);
			await postAuthentication(user_id);
		} catch (error) {
			Alert.alert("Login Failed", (error as Error).message);
		}
	};

	const handleRegister = async () => {
		if (!checkFieldCompletion) {
			Alert.alert("Please correct your information.");
		}

		try {
			const userId = await register(email, password);
			await postAuthentication(userId);
		} catch (error) {
			Alert.alert("Registration Failed", (error as Error).message);
		}
	};

	async function submit() {
		if (signInSection) {
			await handleSignIn();
		} else {
			await handleRegister();
		}
	}

	// MARK: Styles
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			width: "100%",
			flexDirection: "column",
			paddingTop: 10,
			alignItems: "center",
		},

		top: {
			flex: 0.75,
			width: "100%",
		},

		bottom: {
			flex: 0.25,
			width: "100%",
			marginBottom: Constants.bottomOfPagePadding,
		},

		errorMessage: {
			color: Constants.red,
			fontWeight: "bold",
			fontSize: 15,
			padding: 15,
		},

		hStack: {
			flex: 1,
			flexDirection: "column",
		},

		inputTitle: {
			marginLeft: 20,
		},

		center: {
			alignSelf: "center",
		}
	});

	// MARK: Body
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				{signInSection ? (
					// signin screen
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
						<RegularText
							value="Password"
							style={styles.inputTitle}
						/>
						<PlainTextField
							value={password}
							placeHolder="Enter password"
							height={0}
							multiline={false}
							secureTextEntry={true}
							setValue={setPassword}
						/>
						{/* submit button */}
						<DefaultSubmitButton
							title="Login"
							isActive={checkFieldCompletion()}
							activeColor={Constants.lightAccent}
							horizontalLayout={false}
							onSubmit={() => {
								submit();
							}}
						/>
					</View>
				) : (
					// register screen
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
						<RegularText
							value="Password"
							style={styles.inputTitle}
						/>
						<PlainTextField
							value={password}
							placeHolder="Enter password"
							height={0}
							multiline={false}
							secureTextEntry={true}
							setValue={setPassword}
						/>
						<RegularText
							value="Password Confirmation"
							style={styles.inputTitle}
						/>
						<PlainTextField
							value={confirmPassword}
							placeHolder="Confirm password"
							height={0}
							multiline={false}
							secureTextEntry={true}
							setValue={setConfirmPassword}
						/>
						{/* submit button */}
						<DefaultSubmitButton
							title="Register"
							isActive={checkFieldCompletion()}
							activeColor={Constants.lightAccent}
							horizontalLayout={false}
							onSubmit={() => {
								submit();
							}}
						/>
					</View>
				)}
			</View>

			<View style={styles.bottom}>
				{/* Toggle between signin and register */}
				<View style={styles.hStack}>
					<DefaultSubmitButton
						title="Log in"
						isActive={signInSection}
						activeColor={Constants.baseDark}
						horizontalLayout={false}
						onSubmit={() => {
							setSignIn(true);
						}}
					/>
					<SemiBoldText
						value="-or-"
						style={styles.center}
					/>
					<DefaultSubmitButton
						title="Register"
						isActive={!signInSection}
						activeColor={Constants.baseDark}
						horizontalLayout={false}
						onSubmit={() => {
							setSignIn(false);
						}}
					/>
				</View>
			</View>

			{/* submit */}
		</View>
	);
};

export default AuthScreen;
