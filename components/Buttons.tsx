import rn, { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Constants } from "./constants";
import { useState, useRef, useEffect } from "react";

// MARK: StyledSubmitButton
export const StyledSubmitButton = ({
  title,
  isActive,
  horizontalLayout,
  onSubmit,
}: {
  title: string;
  isActive: boolean;
  horizontalLayout: boolean;
  onSubmit: () => void;
}) => {
  const styles = StyleSheet.create({
    spacer: {
      flex: 1,
    },

    primary: {
      backgroundColor: isActive
        ? Constants.lightAccent
        : Constants.secondaryLight,

      flex: horizontalLayout ? 1 : 0,
      flexDirection: "row",
      alignItems: "center",

      height: 70,
      justifyContent: "center",

      padding: 10,
      marginHorizontal: 5,
      marginVertical: 5,

      borderRadius: Constants.defaultCornerRadius,
      borderWidth: isActive ? Constants.defaltStrokeWidth : 0,
      borderColor: Constants.baseDark,
    },
  });

  return (
    <rn.TouchableOpacity onPress={onSubmit} style={styles.primary}>
      <rn.View style={styles.spacer}></rn.View>
      <rn.Text>{title}</rn.Text>
      <rn.View style={styles.spacer}></rn.View>
    </rn.TouchableOpacity>
  );
};
