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

import ArrowRight from "../../assets/arrowRight.svg"
import MailIcon from "../../assets/profileIcons/mail.svg"
import LockIcon from "../../assets/profileIcons/lock.svg"
import PhoneIcon from "../../assets/profileIcons/phone.svg"
import BellIcon from "../../assets/profileIcons/bell.svg"
import LegalIcon from "../../assets/profileIcons/legal.svg"

const ProfileScreen = ({ navigation }: { navigation: any }) => {
	const [currentPass, setCurrentPass] = React.useState("");
	const [newPass, setNewPass] = React.useState("");
	const [confirmNewPass, setConfirmNewPass] = React.useState("");

	const { userProfile, profileDispatch } = useUserProfileContext();

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
					<UserDetails leftText="Email" rightText="name@gmail.com" LeftComponent={MailIcon} RightComponent={ArrowRight} onPress={null}/>
					<UserDetails leftText="Password" rightText="" LeftComponent={LockIcon} RightComponent={ArrowRight} 
						onPress={() => navigation.navigate("ChangePassword")} />
					<UserDetails leftText="Phone" rightText="000-000-0000" LeftComponent={PhoneIcon} RightComponent={ArrowRight} onPress={null}/>
					<UserDetails leftText="Notification" rightText="" LeftComponent={BellIcon} RightComponent={NotificationSwitch} onPress={null}/>
					<UserDetails leftText="Privacy & Legal" rightText="" LeftComponent={LegalIcon} RightComponent={ArrowRight} onPress={null}/>
				</View>
			</View>
			<View style={{paddingBottom: Constants.bottomOfPagePadding}}>
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

function NotificationSwitch() {
	const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
	return (
		<Switch
			trackColor={{ false: Constants.secondaryDark, true: Constants.lightAccent }}
			onValueChange={toggleSwitch}
			value={isEnabled}
		/>
		);
}

function UserDetails({leftText, rightText, LeftComponent, RightComponent, onPress}: 
	{leftText: string, rightText: string, LeftComponent: any, RightComponent: any, onPress: any}) {
	return (
		<View>
			<Pressable style={styles.userDetails} onPress={onPress}>
				<View style={styles.left}>
					<LeftComponent width={24} height={24} />
					<MediumText value={leftText} style={null} />
				</View>
				<View style={styles.right}>
					<MediumText value={rightText} style={null} />
					<RightComponent width={24} height={24} />
				</View>
			</Pressable>
		</View>
	);
}

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
	left: {
		marginLeft: 20,
		flexDirection: "row",
		gap: 10,
		alignItems: "center"
	},
	right: {
		marginRight: 20,
		flexDirection: "row",
		alignItems: "center",
		gap: 20
	},
});

export default ProfileScreen;
