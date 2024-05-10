import {
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { StyleSheet, Text } from "react-native";
import { Constants } from "./constants";

const getFonts = () => {
	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_600SemiBold,
	});
	if (!fontsLoaded) {
		return <AppLoading />;
	}
};

const defaultStyles = StyleSheet.create({
	regularFont: {
		fontFamily: "Poppins_400Regular",
		fontSize: 16,
		color: Constants.baseDark,
	},

	mediumFont: {
		fontFamily: "Poppins_500Medium",
		fontSize: 16,
		color: Constants.baseDark,
	},

	semiBoldFont: {
		fontFamily: "Poppins_600SemiBold",
		fontSize: 24,
		color: Constants.baseDark,
	},

	text: {},
});

export const RegularText = ({
	value,
	style,
}: {
	value: string;
	style: Object | null;
}) => {
	return (
		<Text
			style={[
				defaultStyles.regularFont,
				style === null ? defaultStyles.text : style,
			]}
		>
			{value}
		</Text>
	);
};

export const MediumText = ({
	value,
	style,
}: {
	value: string;
	style: Object | null;
}) => {
	return (
		<Text
			style={[
				defaultStyles.mediumFont,
				style === null ? defaultStyles.text : style,
			]}
		>
			{value}
		</Text>
	);
};

export const SemiBoldText = ({
	value,
	style,
}: {
	value: string;
	style: Object | null;
}) => {
	return (
		<Text
			style={[
				defaultStyles.semiBoldFont,
				style === null ? defaultStyles.text : style,
			]}
		>
			{value}
		</Text>
	);
};
