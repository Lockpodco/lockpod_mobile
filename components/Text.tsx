import { useFonts } from "expo-font";
import { StyleSheet, Text } from "react-native";
import { Constants } from "./constants";
import { useCallback, useEffect, useState } from "react";

const defaultStyles = StyleSheet.create({
  regularFont: {
    fontFamily: "Poppins_400Regular",
    fontSize: Constants.defaultFontSize,
    color: Constants.baseDark,
  },

  mediumFont: {
    fontFamily: "Poppins_500Medium",
    fontSize: Constants.defaultFontSize,
    color: Constants.baseDark,
  },

  semiBoldFont: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: Constants.semiBoldFontSize,
    color: Constants.baseDark,
  },

  headingFont: {
    fontFamily: "Poppins_500Medium",
    fontSize: Constants.headingFontSize1,
    color: Constants.baseDark,
  },
});

export const RegularText = ({
  value,
  style,
}: {
  value: string;
  style: Object | null;
}) => {
  return (
    <Text style={[defaultStyles.regularFont, style === null ? {} : style]}>
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
    <Text style={[defaultStyles.mediumFont, style === null ? {} : style]}>
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
    <Text style={[defaultStyles.semiBoldFont, style === null ? {} : style]}>
      {value}
    </Text>
  );
};

export const RegularHeading = ({
  value,
  style,
}: {
  value: string;
  style: Object | null;
}) => {
  return (
    <Text style={[defaultStyles.headingFont, style === null ? {} : style]}>
      {value}
    </Text>
  );
};
