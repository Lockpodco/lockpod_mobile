import rn, { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Constants } from "./constants";
import { useState, useRef, useEffect } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from "@expo-google-fonts/poppins";

export const DefaultSubmitButton = ({
  title,
  isActive,
	activeColor,
  horizontalLayout,
  onSubmit,
}: {
  title: string;
  isActive: boolean;
	activeColor: string;
  horizontalLayout: boolean;
  onSubmit: () => void;
}) => {
	const [fontsLoaded] = useFonts ({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_600SemiBold
	});
	if (!fontsLoaded) {
		return <AppLoading />
	}
  const styles = StyleSheet.create({
    spacer: {
      flex: 1,
    },

    primary: {
      backgroundColor: isActive
        ? activeColor
        : Constants.secondaryLight,

      flex: horizontalLayout ? 1 : 0,
      flexDirection: "row",
      alignItems: "center",

      height: 55,
      justifyContent: "center",

      padding: 10,
      marginHorizontal: 10,
      marginVertical: 5,

      borderRadius: Constants.defaultCornerRadius,
      borderWidth: isActive ? Constants.defaltStrokeWidth : 0,
      borderColor: Constants.baseDark,
    },

		text: {
			color: isActive ? "#FFFFFF" : Constants.baseDark,
			fontFamily: "Poppins_600SemiBold",
			fontSize: 24,
		},
  });

  return (
    <rn.TouchableOpacity onPress={onSubmit} style={styles.primary}>
      <rn.View style={styles.spacer}></rn.View>
      <rn.Text style={styles.text}>{title}</rn.Text>
      <rn.View style={styles.spacer}></rn.View>
    </rn.TouchableOpacity>
  );
};
