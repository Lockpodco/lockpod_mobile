import React, { useCallback, useEffect, useState } from "react";

// Navigation
import {
  NavigationContainer,
  DefaultTheme,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Constants } from "./components/constants";

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

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
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import ArrowLeft from "./assets/arrowLeft.svg";
import ProfileIcon from "./assets/drawerIcons/profile.svg";
import ActivityIcon from "./assets/drawerIcons/activity.svg";
import WalletIcon from "./assets/drawerIcons/wallet.svg";
import CalendarIcon from "./assets/drawerIcons/calendar.svg";
import InfoIcon from "./assets/drawerIcons/info.svg";
import SupportIcon from "./assets/drawerIcons/support.svg";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
SplashScreen.preventAutoHideAsync();

// MARK: Body
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'Poppins_400Regular': Poppins_400Regular,
          'Poppins_500Medium': Poppins_500Medium,
          'Poppins_600SemiBold': Poppins_600SemiBold,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <NavigationContainer theme={MyTheme} onReady={onLayoutRootView}>
      <UserProfileProvider>
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{
            headerStyle: styles.header,
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <View style={{ paddingLeft: 35, paddingRight: 20 }}>
                <ArrowLeft width={24} height={24} />
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

function DrawerNav() {
  const navigation = useNavigation();
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
            <ArrowLeft width={24} height={24} />
          </Pressable>
        ),
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

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Pressable onPress={() => props.navigation.navigate("Lockpod")}>
          <RegularHeading
            value="Lockpod"
            style={{ color: Constants.darkAccent }}
          />
        </Pressable>
        <View style={styles.drawerSection}>
          <MediumText value="Account" style={null} />
          <View style={styles.drawerItems}>
            <CustomDrawerItem
              props={props}
              goTo="Profile"
              title="Profile"
              Icon={ProfileIcon}
            />
            <CustomDrawerItem
              props={props}
              goTo="Activity"
              title="Activity"
              Icon={ActivityIcon}
            />
          </View>
        </View>
        <View style={styles.drawerSection}>
          <MediumText value="Payment & Plans" style={null} />
          <View style={styles.drawerItems}>
            <CustomDrawerItem
              props={props}
              goTo="Wallet"
              title="Wallet"
              Icon={WalletIcon}
            />
            <CustomDrawerItem
              props={props}
              goTo="Subscriptions"
              title="Subscriptions"
              Icon={CalendarIcon}
            />
          </View>
        </View>
        <View style={styles.drawerSection}>
          <MediumText value="Help" style={null} />
          <View style={styles.drawerItems}>
            <CustomDrawerItem
              props={props}
              goTo="UserGuide"
              title="User Guide"
              Icon={InfoIcon}
            />
            <CustomDrawerItem
              props={props}
              goTo="Support"
              title="Support"
              Icon={SupportIcon}
            />
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

function Header({ title }) {
  return <MediumText value={title} style={null} />;
}

function CustomDrawerItem({ props, goTo, title, Icon }) {
  return (
    <View>
      <Pressable onPress={() => props.navigation.navigate(goTo)}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Icon width={24} height={24} />
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
  },
});
