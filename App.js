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
        <Stack.Navigator 
					initialRouteName="Auth"
					screenOptions={{
						headerStyle: styles.header,
						headerShadowVisible: false,
						headerBackTitleVisible: false,
						headerBackImage: () => (
							<View style={{paddingLeft: 35, paddingRight: 20}}>
								<Image source={require("./assets/arrowLeft.png")}  />
							</View>
						),
					}}
				>
          <Stack.Screen
            name="Home"
            component={DrawerNav}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{
							headerTitle: () => <Header title="Welcome" />,
            }}
          />
          <Stack.Screen
            name="ProfileCreation"
            component={ProfileCreationScreen}
            options={{
							headerTitle: () => <Header title="Create Profile" />,
            }}
          />
          <Stack.Screen
            name="ScanQR"
            component={ScanQR}
            options={{
							headerTitle: () => <Header title="Scan Your Pod" />,
            }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{
							headerTitle: () => <Header title="Change Password" />,
            }}
          />
        </Stack.Navigator>
      </UserProfileProvider>
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
	const profileIcon = require("./assets/profile.png")
	const activityIcon = require("./assets/activity.png")
	const walletIcon = require("./assets/wallet.png")
	const subsIcon = require("./assets/subs.png")
	const userGuideIcon = require("./assets/info.png")
	const supportIcon = require("./assets/support.png")
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
						<CustomDrawerItem props={props} goTo="Profile" title="Profile" icon={profileIcon}/>
						<CustomDrawerItem props={props} goTo="Activity" title="Activity" icon={activityIcon}/>
					</View>
				</View>
				<View style={styles.drawerSection}>
					<MediumText value="Payment & Plans" style={null} />
					<View style={styles.drawerItems}>
						<CustomDrawerItem props={props} goTo="Wallet" title="Wallet" icon={walletIcon}/>
						<CustomDrawerItem props={props} goTo="Subscriptions" title="Subscriptions" icon={subsIcon}/>
					</View>
				</View>
				<View style={styles.drawerSection}>
					<MediumText value="Help" style={null} />
					<View style={styles.drawerItems}>
						<CustomDrawerItem props={props} goTo="UserGuide" title="User Guide" icon={userGuideIcon}/>
						<CustomDrawerItem props={props} goTo="Support" title="Support" icon={supportIcon}/>
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

function CustomDrawerItem({props, goTo, title, icon}) {
	return (
		<View>
			<Pressable
				onPress={() => props.navigation.navigate(goTo)}
			>
				<View style={{flexDirection: "row", gap: 10}}>
					<Image source={icon}/>
					<MediumText value={title} style={null} />
				</View>
			</Pressable>
		</View>
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


