import rn, { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Constants } from "./constants";
import { useState, useRef, useEffect } from "react";

// MARK: StyledSubmitButton
export const StyledSubmitButton = ({
  title,
  isActive,
  horizontal,
  onSubmit,
}: {
  title: string;
  isActive: boolean;
  horizontal: boolean;
  onSubmit: () => void;
}) => {
  const styles = StyleSheet.create({
    primary: {
      backgroundColor: isActive
        ? Constants.lightAccent
        : Constants.secondaryLight,
      flex: horizontal ? 1 : 0,
      minHeight: 60,
      maxHeight: 90,
      justifyContent: "center",

      padding: 10,
      marginHorizontal: 10,
      marginVertical: 5,

      borderRadius: Constants.defaultCornerRadius,
      borderWidth: isActive ? Constants.defaltStrokeWidth : 0,
      borderColor: Constants.baseDark,
    },
  });

  return (
    <rn.View style={styles.primary}>
      <rn.Button onPress={onSubmit} title={title} color={Constants.baseDark} />
    </rn.View>
  );
};
