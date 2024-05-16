import { windowHeight, windowWidth } from "../../Constants";

import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Constants } from "../../components/constants";

// context
import { useUserProfileContext } from "../../stores/UserProfileContext";

// screens
import MapViewComponent from "./MapViewComponent";
import ReservationsScreen from "./ReservationsScreen";

// MARK: HomeScreen
const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { userProfile, profileDispatch } = useUserProfileContext();

  const [onMapScreen, setOnMapScreen] = useState(false);

  // MARK: Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },

    mainContentContainer: {
      flex: 0.9,
    },

    tabBarContainer: {
      flex: 0.1,
      flexDirection: "row",
    },
  });

  const TabBarElement = ({
    isMap,
    title,
  }: {
    isMap: boolean;
    title: string;
  }) => {
    const styles = StyleSheet.create({
      tabBarElement: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        borderBottomColor: onMapScreen == isMap ? "black" : "transparent",
        borderBottomWidth: 4,

        backgroundColor: Constants.baseLight,
      },
    });

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.tabBarElement}
        onPress={() => {
          setOnMapScreen(isMap);
        }}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  };

  // MARK: Body
  return (
    <View style={styles.container}>
      <View style={styles.tabBarContainer}>
        <TabBarElement isMap={true} title="Map" />
        <TabBarElement isMap={false} title="Reservations" />
      </View>

      <View style={styles.mainContentContainer}>
        {onMapScreen ? (
          <MapViewComponent navigation={navigation} />
        ) : (
          <ReservationsScreen></ReservationsScreen>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
