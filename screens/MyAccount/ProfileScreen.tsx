import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Button,
  Alert,
  Pressable,
} from "react-native";

import { windowHeight, windowWidth } from "../../Constants";
import { useUserProfileContext } from "../../stores/UserProfileContext";
import { removeUserIdLocally } from "../../services/AuthService";
import { changePassword, getUser } from "../../services/ProfileService";
import { Constants } from "../../components/constants";

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const [currentPass, setCurrentPass] = React.useState("");
  const [newPass, setNewPass] = React.useState("");
  const [confirmNewPass, setConfirmNewPass] = React.useState("");

  const { userProfile, profileDispatch } = useUserProfileContext();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
    },
    topContainer: {
      marginTop: 30,
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
    },
    pfp: {
      height: 100,
      width: 100,
    },
    userName: {
      fontSize: 30,
    },
    userDetailsContainer: {
			marginTop: 40,
      gap: 15,
    },
    userDetails: {
      flexDirection: "row",
			justifyContent: "space-between",
    },
    left: {
      fontSize: 20,
      marginLeft: 20,
    },
    right: {
      fontSize: 20,
      marginRight: 20,
    },
    logout: {
      color: "#FFFFFF",
      fontSize: 20,
    },
    logoutButton: {
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 50,
      borderRadius: 15,
      backgroundColor: Constants.baseDark,
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topContainer}>
          <Image
            style={styles.pfp}
            source={require("../../assets/Default_pfp.svg.png")}
          />
          <Text style={styles.userName}>
            {userProfile["first_name"] + " " + userProfile["last_name"]}
          </Text>
        </View>
        <View style={styles.userDetailsContainer}>
          <Pressable style={styles.userDetails}>
            <Text style={styles.left}>Email</Text>
            <Text style={styles.right}>name@gmail.com</Text>
          </Pressable>
          <Pressable
            style={styles.userDetails}
            onPress={() => {
              navigation.navigate("ChangePassword");
            }}
          >
            <Text style={styles.left}>Password</Text>
          </Pressable>
          <Pressable style={styles.userDetails}>
            <Text style={styles.left}>Phone</Text>
            <Text style={styles.right}>000-000-0000</Text>
          </Pressable>
          <View style={styles.userDetails}>
            <Text style={styles.left}>Notifications</Text>
          </View>
          <Pressable style={styles.userDetails}>
            <Text style={styles.left}>Privacy & Legal</Text>
          </Pressable>
        </View>
      </View>
      <View style={{}}>
        <Pressable
          onPress={() => {
            navigation.navigate("Auth");
            removeUserIdLocally();
          }}
        >
          <View style={styles.logoutButton}>
            <Text style={styles.logout}>Log Out</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;
