import rn, { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { Constants } from "../constants";
import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import { useFonts } from "expo-font";

export const PlainTextField = ({
	value,
	placeHolder,
	height,
	multiline,
	secureTextEntry,
	setValue,
}: {
	value: string;
	placeHolder: string;
	height: number | null;
	multiline: boolean;
	secureTextEntry: boolean;
	setValue: Dispatch<SetStateAction<string>>;
}) => {
	// MARK: Vars
	const touchableFieldRef = useRef(null);

	const h: number | null = height == null ? 55 : height;

	const styles = StyleSheet.create({
		container: {
			borderRadius: Constants.defaultCornerRadius,
			borderWidth: Constants.defaltStrokeWidth,
			borderColor: Constants.baseDark,

			height: h,

			marginLeft: 10,
			marginRight: 10,
			marginTop: 5,
			marginBottom: 5,
		},
		textField: {
			fontFamily: "Poppins_400Regular",
			fontSize: 16,
			padding: 12,
			paddingTop: 12,
			textAlignVertical: "top",
		},

		center: {
			justifyContent: "center",
		},

		flexStart: {
			justifyContent: "flex-start",
		},
	});

	// MARK: Body
	return (
		<TouchableWithoutFeedback>
			<rn.View style={[styles.container, multiline == true ? styles.flexStart : styles.center]}>
				<rn.TextInput
					value={value}
					style={[styles.textField]}
					placeholder={placeHolder}
					onChangeText={setValue}
					ref={touchableFieldRef}
					selectionColor={Constants.lightAccent}
					secureTextEntry={secureTextEntry}
					multiline={multiline}
					autoCapitalize="none"
				/>
			</rn.View>
		</TouchableWithoutFeedback>
	);
};
