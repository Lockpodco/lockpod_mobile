import React from "react";
import HomeScreen from "./screens/HomeScreen";
import ScanQR from "./screens/ScanQR";
import Settings from "./screens/Settings";
import Wallet from "./screens/Wallet";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNav() {
	return (
		<Drawer.Navigator>
			<Drawer.Screen
				name="Home"
				component={HomeScreen}
				options={{ title: "Lockpod" }}
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

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Lockpod"
					component={DrawerNav}
					options={{ headerShown: false }}
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
