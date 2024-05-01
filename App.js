import React from "react";

// Navigation
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Constants } from "./components/constants";

import { UserProfileProvider } from "./stores/UserProfileContext";

// pages
import HomeScreen from "./screens/HomeScreen";
import Settings from "./screens/Settings";
import Wallet from "./screens/Wallet";
import AuthScreen from "./screens/AuthScreen";
import ProfileCreationScreen from "./screens/ProfileCreationScreen";
import ScanQR from "./screens/ScanQR";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNav() {
	return (
		<Drawer.Navigator>
			<Drawer.Screen
				name="Home"
				component={HomeScreen}
				options={{ 
					title: "Lockpod", 
				}}
			/>
			<Drawer.Screen 
				name="Settings"
				component={Settings}
				options={{ title: "Settings"}}
			/>
			<Drawer.Screen 
				name="Wallet"
				component={Wallet}
				options={{ title: "Wallet"}}
			/>
		</Drawer.Navigator>
	);
}

// MARK: Body
export default function App() {
	//return (
	//	<NavigationContainer>
	//		<Stack.Navigator>
	//			<Stack.Screen
	//				name="Lockpod"
	//				component={DrawerNav}
	//				options={{ headerShown: false }}
	//			/>
	//			<Stack.Screen
	//				name="ScanQR"
	//				component={ScanQR}
	//				options={{title: "Scan Your Pod"}}
	//			/>
	//		</Stack.Navigator>
	//	</NavigationContainer>
	//);
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
