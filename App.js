import React from "react";

// Navigation
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Constants } from "./components/constants";

import { UserProfileProvider } from "./stores/UserProfileContext";
import { LockPodsProvider } from "./stores/LockPodsContext";
import { StripeProvider } from "@stripe/stripe-react-native";

// pages
import AuthScreen from "./screens/Authentication/AuthScreen";
import ProfileCreationScreen from "./screens/Authentication/ProfileCreationScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import ScanQR from "./screens/ScanQR";
import ProfileScreen from "./screens/MyAccount/ProfileScreen";
import ActivityScreen from "./screens/MyAccount/ActivityScreen";
import Wallet from "./screens/Payment/WalletScreen";
import SubscriptionsScreen from "./screens/Payment/SubscriptionsScreen";
import UserGuide from "./screens/Help/UserGuideScreen";
import SupportScreen from "./screens/Help/SupportScreen";
import ChangePasswordScreen from "./screens/MyAccount/ChangePasswordScreen";

import { CheckoutScreen } from "./screens/Payment/PaymentScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// MARK: DrawerNav
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

import { BrowserRouter, Routes, Route } from "react-router-dom";

// MARK: Body
export default function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51P8o6YP66cGixuA1DgJxbs8E5LPceDnJN6j2pMZ5Ue8s96PU2crptzV2wlMmgmS59ZGAUOFt0bSf5OvsT9F44mK900TMKkp0VY"
      merchantIdentifier="merchant.com.{{LockPod}}"
    >
      <NavigationContainer theme={MyTheme}>
        <LockPodsProvider>
          <UserProfileProvider>
            <Stack.Navigator initialRouteName="Auth">
              <Stack.Screen
                name="Payment"
                component={CheckoutScreen}
                options={{
                  title: "hi",
                  headerShown: false,
                }}
              />
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
            </Stack.Navigator>
          </UserProfileProvider>
        </LockPodsProvider>
      </NavigationContainer>
    </StripeProvider>
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
