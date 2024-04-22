import React from "react";
import HomeScreen from "./screens/HomeScreen";
import ScanQR from "./screens/ScanQR";
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
          options={{title: "Scan Your Pod"}}
        />
        {/* You can add more screens to the navigator here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
