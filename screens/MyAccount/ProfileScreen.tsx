import React from "react";
import {
	View,
	StyleSheet,
	Text,
	Image,
	TextInput,
	Button,
	Alert,
	Pressable,
	Switch,
} from "react-native";

import { windowHeight, windowWidth } from "../../Constants";
import { useUserProfileContext } from "../../stores/UserProfileContext";
import { removeUserIdLocally } from "../../services/AuthService";
import { changePassword, getUser } from "../../services/ProfileService";
import { Constants } from "../../components/constants";
import { MediumText, RegularHeading } from "../../components/Text";
import { DefaultSubmitButton } from "../../components/Buttons";

const ProfileScreen = ({ navigation }: { navigation: any }) => {
	const [currentPass, setCurrentPass] = React.useState("");
	const [newPass, setNewPass] = React.useState("");
	const [confirmNewPass, setConfirmNewPass] = React.useState("");

	const { userProfile, profileDispatch } = useUserProfileContext();

	const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "space-between",
		},
		topContainer: {
			marginTop: 40,
			alignItems: "center",
			justifyContent: "center",
			gap: 40,
		},
		pfp: {
			height: 100,
			width: 100,
		},
		userDetailsContainer: {
			marginTop: 70,
			gap: 18,
		},
		userDetails: {
			flexDirection: "row",
			justifyContent: "space-between",
		},
		icon: {
			height: 23,
			alignSelf: "center",
		},
		left: {
			marginLeft: 20,
			flexDirection: "row",
			gap: 10,
		},
		right: {
			marginRight: 10,
			flexDirection: "row",
		},
		switch: {
			width: 44,
			marginRight: 22,
		},
		arrow: {
			height: 17,
			alignSelf: "center",
		},
		logOutButton: {
			paddingBottom: Constants.bottomOfPagePadding,
		},
	});

	return (
		<View style={styles.container}>
			<View>
				<View style={styles.topContainer}>
					<Image
						style={styles.pfp}
						source={require("../../assets/Default_pfp.svg.png")}
					/>
					<RegularHeading
						value={userProfile["first_name"] + " " + userProfile["last_name"]}
						style={null}
					/>
				</View>
				<View style={styles.userDetailsContainer}>
					<Pressable style={styles.userDetails}>
						<View style={styles.left}>
							<Image
								style={styles.icon}
								source={require("../../assets/mail.png")}
							/>
							<MediumText value="Email" style={null} />
						</View>
						<View style={styles.right}>
							<MediumText value="name@gmail.com" style={null} />
							<Image
								style={styles.arrow}
								source={require("../../assets/arrowRight.png")}
							/>
						</View>
					</Pressable>
					<Pressable
						style={styles.userDetails}
						onPress={() => {
							navigation.navigate("ChangePassword");
						}}
					>
						<View style={styles.left}>
							<Image
								style={styles.icon}
								source={require("../../assets/lock.png")}
							/>
							<MediumText value="Password" style={null} />
						</View>
						<View style={styles.right}>
							<Image
								style={styles.arrow}
								source={require("../../assets/arrowRight.png")}
							/>
						</View>
					</Pressable>
					<Pressable style={styles.userDetails}>
						<View style={styles.left}>
							<Image
								style={styles.icon}
								source={require("../../assets/phone.png")}
							/>
							<MediumText value="Phone" style={null} />
						</View>
						<View style={styles.right}>
							<MediumText value="000-000-0000" style={null} />
							<Image
								style={styles.arrow}
								source={require("../../assets/arrowRight.png")}
							/>
						</View>
					</Pressable>
					<View style={styles.userDetails}>
						<View style={styles.left}>
							<Image
								style={styles.icon}
								source={require("../../assets/bell.png")}
							/>
							<MediumText value="Notifications" style={null} />
						</View>
						<View style={styles.right}>
							<Switch
								trackColor={{ false: Constants.secondaryDark, true: Constants.lightAccent }}
								onValueChange={toggleSwitch}
								value={isEnabled}
								style={styles.switch}
							/>
						</View>
					</View>
					<Pressable style={styles.userDetails}>
						<View style={styles.left}>
							<Image
								style={styles.icon}
								source={require("../../assets/legal.png")}
							/>
							<MediumText value="Privacy & Legal" style={null} />
						</View>
						<View style={styles.right}>
							<Image
								style={styles.arrow}
								source={require("../../assets/arrowRight.png")}
							/>
						</View>
					</Pressable>
				</View>
			</View>
			<View style={styles.logOutButton}>
				<DefaultSubmitButton
					title="Log Out"
					isActive={true}
					activeColor={Constants.baseDark}
					horizontalLayout={false}
					onSubmit={() => {
						navigation.navigate("Auth");
						removeUserIdLocally();
					}}
				/>
			</View>
		</View>
	);
};

export default ProfileScreen;
