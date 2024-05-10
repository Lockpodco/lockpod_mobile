import React from "react";

// Navigation
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Constants } from "./components/constants";

import { UserProfileProvider } from "./stores/UserProfileContext";
import { LockPodsProvider } from "./stores/LockPodsContext";

// pages
import AuthScreen from "./screens/Authentication/AuthScreen";
import ProfileCreationScreen from "./screens/Authentication/ProfileCreationScreen";
import HomeScreen from "./screens/HomeScreen";
import ScanQR from "./screens/ScanQR";
import ReserveScreen from "./screens/ReserveScreen";
import ProfileScreen from "./screens/MyAccount/ProfileScreen";
import ActivityScreen from "./screens/MyAccount/ActivityScreen";
import Wallet from "./screens/Payment/WalletScreen";
import SubscriptionsScreen from "./screens/Payment/SubscriptionsScreen";
import UserGuide from "./screens/Help/UserGuideScreen";
import SupportScreen from "./screens/Help/SupportScreen";
import ChangePasswordScreen from "./screens/MyAccount/ChangePasswordScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNav() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Lockpod"
        component={HomeScreen}
        options={{
          title: "Lockpod",
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Drawer.Screen
        name="Activity"
        component={ActivityScreen}
        options={{ title: "Activity" }}
      />
      <Drawer.Screen
        name="Wallet"
        component={Wallet}
        options={{ title: "Wallet" }}
      />
      <Drawer.Screen
        name="Subscriptions"
        component={SubscriptionsScreen}
        options={{ title: "Subscriptions" }}
      />
      <Drawer.Screen
        name="UserGuide"
        component={UserGuide}
        options={{ title: "User Guide" }}
      />
      <Drawer.Screen
        name="Support"
        component={SupportScreen}
        options={{ title: "Support" }}
      />
    </Drawer.Navigator>
  );
}

// MARK: Body
export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <LockPodsProvider>
        <UserProfileProvider>
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen
              name="Home"
              component={DrawerNav}
              options={{
                title: "Welcome",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{
                title: "Login",
              }}
            />
            <Stack.Screen
              name="ProfileCreation"
              component={ProfileCreationScreen}
              options={{ title: "Create Profile" }}
            />
            <Stack.Screen
              name="ScanQR"
              component={ScanQR}
              options={{
                title: "Scan Your Pod",
                headerBackTitle: "Back",
              }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePasswordScreen}
              options={{
                title: "Change Password",
                headerBackTitle: "Back",
              }}
            />
            <Stack.Screen
              name="Reserve"
              component={ReserveScreen}
              options={{ title: "Reserve a Pod" }}
            />
          </Stack.Navigator>
        </UserProfileProvider>
      </LockPodsProvider>
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
