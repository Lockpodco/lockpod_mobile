import React from "react";
import MapViewComponent from "../components/MapViewComponent";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { windowHeight, windowWidth } from "../Constants";
import { useRoute } from "@react-navigation/native";

const styles = StyleSheet.create({});
const ReserveScreen = () => {
  const route = useRoute();
  const { lockpodId, status } = route.params; // Extract props from route.params

  return (
    <View style={{ flex: 1 }}>
      <Text>Hi!</Text>
      <Text>Lockpod {lockpodId}</Text>
    </View>
  );
};

export default ReserveScreen;
