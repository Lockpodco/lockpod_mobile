// MARK: Vars
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerNewUserProfile } from "./ProfileService";

import {
  API_URL,
  checkResponse,
  handleError,
} from "../services/ServiceUniversals";

// checks whether an email is already in use in the database
async function checkUserExists(email: String) {
  try {
    const jsonData = await getUser(email);

    if (Object.keys(jsonData).length != 0) {
      console.log("Account found with email: " + email);
      console.log("bypassing account registration");
      return true;
    }

    return false;
  } catch (error) {
    handleError("Error Checking if Account Exists", error as Error);
  }
}

// MARK: User Registration
// registers a user using an email and password
export const register = async (email: String, password: String) => {
  try {
    console.log("\n");
    console.log("Attempting to register user: " + email);

    // checks to make sure the user does not already have an account
    if (await checkUserExists(email)) {
      return signIn(email, password);
    }

    // if the email is not already in use, register them and push them to the database
    console.log("registering user: " + email + ", password: " + password);

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        password: password,
      }),
    });

    checkResponse(response, "unable to register", "registration successful");

    const data = await response.json();
    const id = data["id"];

    await registerNewUserProfile(id);
    return id;
  } catch (error) {
    handleError("error in registartion <register>", error as Error);
  }
};

// MARK: User SignIn
export const signIn = async (email: String, password: String) => {
  try {
    console.log("\n");
    console.log("Attempting to login user: " + email);

    const jsonData = await getUser(email);

    if (Object.keys(jsonData).length != 0) {
      if (jsonData["password"] == password) {
        console.log("logged in user: " + email);
        return jsonData["id"];
      } else {
        throw new Error(
          "Incorrect Password, got: " +
            password +
            ", expected: " +
            jsonData["email"]
        );
      }
    } else {
      throw new Error("Unable to find account");
    }
  } catch (error) {
    handleError("error in Signing in <signIn>", error as Error);
  }
};

// MARK: get User
// posts a get method to the server for the provided email
async function getUser(email: String) {
  try {
    const response = await fetch(
      `${API_URL}/users?email=${email.toLowerCase()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "applications/json",
        },
      }
    );

    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    handleError("Error Getting user <getUser>", error as Error);
  }
}

// MARK: Storing User_ID Locally
const localUserIdKey = "localUserIdKey";

export const saveUserIdLocally = async (user_id: Number) => {
  try {
    const jsonData = JSON.stringify(user_id);
    console.log("Attempting to save user_id: ", jsonData);
    await AsyncStorage.setItem(localUserIdKey, jsonData);
  } catch (error) {
    handleError("error storing user_id", error as Error);
  }
};

export const removeUserIdLocally = async () => {
  try {
    await AsyncStorage.removeItem(localUserIdKey);
  } catch (error) {
    handleError("error removing user_id", error as Error);
  }
};

export const getUserIdLocally = async () => {
  try {
    const value = await AsyncStorage.getItem(localUserIdKey);
    return Number(value) ?? 0;
  } catch (error) {
    handleError("error retreiving user_id", error as Error);
  }
};
