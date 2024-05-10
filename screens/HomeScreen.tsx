import React, { useEffect } from "react";
import MapViewComponent from "../components/MapViewComponent";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { windowHeight, windowWidth } from "../Constants";

import { useUserProfileContext } from "../stores/UserProfileContext";

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

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { userProfile, profileDispatch } = useUserProfileContext();

  return (
    <View style={{ flex: 1 }}>
      <Text>{userProfile["first_name"] + " " + userProfile["last_name"]}</Text>
      <MapViewComponent />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.floatingButton}
        onPress={() => {
					navigation.navigate("ScanQR")
				}}
      >
        <Text>Scan Pod</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
