import rn, { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Constants } from "../constants";
import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";

export const StyledTextField = ({
  value,
  placeHolder,
  secureTextEntry,
  setValue,
}: {
  value: string;
  placeHolder: string;
  secureTextEntry: boolean;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  // MARK: Vars
  const touchableFieldRef = useRef(null);
  const [focus, setFocus] = useState(false);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Constants.secondaryLight,

      borderRadius: Constants.defaultCornerRadius,
      borderWidth: Constants.defaltStrokeWidth,
      borderColor: focus ? Constants.baseDark : Constants.secondaryLight,

      marginLeft: 10,
      marginRight: 10,
      marginTop: 5,
      marginBottom: 5,
    },

    textField: {
      fontSize: 15,
      padding: 20,
    },
  });

  // MARK: Body
  return (
    <TouchableWithoutFeedback onPress={() => setFocus(true)}>
      <rn.View style={styles.container}>
        <rn.TextInput
          value={value}
          style={styles.textField}
          placeholder={placeHolder}
          onChangeText={setValue}
          ref={touchableFieldRef}
          selectionColor={Constants.lightAccent}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          secureTextEntry={secureTextEntry}
        />
      </rn.View>
    </TouchableWithoutFeedback>
  );
};
