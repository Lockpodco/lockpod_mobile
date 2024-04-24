import React, { useEffect } from "react";
import MapViewComponent from "../components/MapViewComponent";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { windowHeight, windowWidth } from "../Constants";
import { useNavigation } from "@react-navigation/native";
<<<<<<< HEAD

import { useUserProfileContext } from "../stores/UserProfileContext";
=======
>>>>>>> 9076cc6 (stashing)

// MARK: Styling
// SCANQR Button Styling
const styles = StyleSheet.create({
  floatingButton: {
    height: windowWidth / 15,
    width: windowWidth / 8,
    borderRadius: windowWidth / 8,
    backgroundColor: "pink",
    position: "absolute",
    bottom: "15%",
    right: "36%",
    justifyContent: "center",
    alignItems: "center",
  },
});
<<<<<<< HEAD
=======

// MARK: HomeScreen
>>>>>>> 9076cc6 (stashing)
const HomeScreen = () => {
  const { navigate } = useNavigation();

  const { userProfile, profileDispatch } = useUserProfileContext();

  return (
    <View style={{ flex: 1 }}>
<<<<<<< HEAD
      <Text>{userProfile["first_name"] + " " + userProfile["last_name"]}</Text>
=======
>>>>>>> 9076cc6 (stashing)
      <MapViewComponent />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.floatingButton}
        onPress={() => navigate("ScanQR")}
      >
        <Text>Scan Pod</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
