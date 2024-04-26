import React from "react";
import HomeScreen from "./screens/HomeScreen";
import ScanQR from "./screens/ScanQR";
import ReserveScreen from "./screens/ReserveScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="ScanQR"
          component={ScanQR}
          options={{ title: "Scan Your Pod" }}
        />
        <Stack.Screen
          name="Reserve"
          component={ReserveScreen}
          options={{ title: "Reserve a Pod" }}
        />
        {/* You can add more screens to the navigator here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
