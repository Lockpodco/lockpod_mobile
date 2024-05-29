import React from "react";

// Navigation
import { NavigationContainer, DefaultTheme, DrawerActions, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { Constants } from "./components/constants";

import { UserProfileProvider } from "./stores/UserProfileContext";

// pages
import AuthScreen from "./screens/Authentication/AuthScreen";
import ProfileCreationScreen from "./screens/Authentication/ProfileCreationScreen";
import HomeScreen from "./screens/HomeScreen";
import ScanQR from "./screens/ScanQR";
import ProfileScreen from "./screens/MyAccount/ProfileScreen";
import ActivityScreen from "./screens/MyAccount/ActivityScreen";
import Wallet from "./screens/Payment/WalletScreen";
import SubscriptionsScreen from "./screens/Payment/SubscriptionsScreen";
import UserGuide from "./screens/Help/UserGuideScreen";
import SupportScreen from "./screens/Help/SupportScreen";
import ChangePasswordScreen from "./screens/MyAccount/ChangePasswordScreen";
import { Button, Image, Pressable, StyleSheet, View } from "react-native";
import { MediumText, RegularHeading } from "./components/Text";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNav() {
	const navigation = useNavigation()
  return (
    <Drawer.Navigator
			drawerContent={CustomDrawerContent}
			screenOptions={{
				headerStyle: styles.header,
				headerShadowVisible: false,
				headerLeft: () => (
					<Pressable 
						onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
						style={{ paddingLeft: 35, paddingRight: 20 }}
						>
						<Image 
							source={require("./assets/arrowLeft.png")}
						/>
					</Pressable>
				)
			}}
		>
      <Drawer.Screen
        name="Lockpod"
        component={HomeScreen}
        options={{
					headerTitle: () => <Header title="Lockpod" />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ 
					headerTitle: () => <Header title="Profile" />,
				}}
      />
      <Drawer.Screen
        name="Activity"
        component={ActivityScreen}
        options={{ 
					headerTitle: () => <Header title="Activity" />,
				}}
      />
      <Drawer.Screen
        name="Wallet"
        component={Wallet}
        options={{ 
					headerTitle: () => <Header title="Wallet" />,
				}}
      />
      <Drawer.Screen
        name="Subscriptions"
        component={SubscriptionsScreen}
        options={{ 
					headerTitle: () => <Header title="Subscriptions" />,
				}}
      />
      <Drawer.Screen
        name="UserGuide"
        component={UserGuide}
        options={{ 
					headerTitle: () => <Header title="User Guide" />,
				}}
      />
      <Drawer.Screen
        name="Support"
        component={SupportScreen}
        options={{ 
					headerTitle: () => <Header title="Support" />,
				}}
      />
    </Drawer.Navigator>
  );
}

// MARK: Body
export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
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
        </Stack.Navigator>
      </UserProfileProvider>
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
			<View style={styles.container}>
				<Pressable
					onPress={() => props.navigation.navigate("Lockpod")}
				>
					<RegularHeading value="Lockpod" style={{color: Constants.darkAccent}}/>
				</Pressable>
				<View style={styles.drawerSection}>
					<MediumText value="Account" style={null} />
					<View style={styles.drawerItems}>
						<Pressable
							onPress={() => props.navigation.navigate("Profile")}
							>
							<MediumText value="Profile" style={null} />
						</Pressable>
						<Pressable
							onPress={() => props.navigation.navigate("Activity")}
							>
							<MediumText value="Activity" style={null} />
						</Pressable>
					</View>
				</View>
				<View style={styles.drawerSection}>
					<MediumText value="Payment & Plans" style={null} />
					<View style={styles.drawerItems}>
						<Pressable
							onPress={() => props.navigation.navigate("Wallet")}
							>
							<MediumText value="Wallet" style={null} />
						</Pressable>
						<Pressable
							onPress={() => props.navigation.navigate("Subscriptions")}
							>
							<MediumText value="Subscriptions" style={null} />
						</Pressable>
					</View>
				</View>
				<View style={styles.drawerSection}>
					<MediumText value="Help" style={null} />
					<View style={styles.drawerItems}>
						<Pressable
							onPress={() => props.navigation.navigate("UserGuide")}
							>
							<MediumText value="User Guide" style={null} />
						</Pressable>
						<Pressable
							onPress={() => props.navigation.navigate("Support")}
							>
							<MediumText value="Support" style={null} />
						</Pressable>
					</View>
				</View>
			</View>
    </DrawerContentScrollView>
  );
}

function Header({title}) {
	return (
		<MediumText 
			value={title}
			style={null}
		/>
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

const styles = StyleSheet.create({
	header: {
		backgroundColor: Constants.baseLight,
	},
	container: {
		flex: 1,
		paddingVertical: Constants.bottomOfPagePadding,	
		paddingLeft: 16,
		gap: 40,
	},
	drawerSection: {
		gap: 10,
	},
	drawerItems: {
		paddingLeft: 16,
		gap: 10,
	}
});


