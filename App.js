import React from "react";
// Navigation
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Constants } from "./components/constants";

import { UserProfileProvider } from "./stores/UserProfileContext";

// pages
import HomeScreen from "./screens/HomeScreen";
import AuthScreen from "./screens/AuthScreen";
import ProfileCreationScreen from "./screens/ProfileCreationScreen";
import ScanQR from "./screens/ScanQR";

const Stack = createStackNavigator();

// MARK: Body
export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <UserProfileProvider>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="ProfileCreation"
            component={ProfileCreationScreen}
            options={{ title: "Create Profile" }}
          />
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
        </Stack.Navigator>
      </UserProfileProvider>
    </NavigationContainer>
  );
}

// MARK: Styles
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Constants.lightAccent,
    background: Constants.baseLight,
  },
};
