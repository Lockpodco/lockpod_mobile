import React from "react";
import HomeScreen from "./screens/HomeScreen";
import AuthScreen from "./screens/AuthScreen";
import ScanQR from "./screens/ScanQR";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./screens/SignInScreen";
import RegistrationScreen from "./screens/RegistrationScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ title: "Welcome" }}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
