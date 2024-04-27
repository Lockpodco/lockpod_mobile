// MARK: Vars
const API_URL = "http://localhost:3000";
import AsyncStorage from "@react-native-async-storage/async-storage";

// MARK: Convenience Functions
function handleError(title, error) {
  console.log(title, ": ", error);
  throw error;
}

// checks whether an email is already in use in the database
async function checkUserExists(email) {
  try {
    const jsonData = await getUser(email);

    if (Object.keys(jsonData).length != 0) {
      console.log("Account found with email: " + email);
      console.log("bypassing account registration");
      return true;
    }

    return false;
  } catch (error) {
    handleError("Error Checking if Account Exists", error);
  }
}

// MARK: Registration

// registers a user using an email and password
export const register = async (email, password) => {
  try {
    console.log("\n");
    console.log("Attempting to register user: " + email);

    // checks to make sure the user does not already have an account
    let hasAccount = await checkUserExists(email);

    if (hasAccount) {
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

    const data = await response.json();

    if (!response.ok) {
      // Convert non-2xx HTTP responses into errors:
      const errorData = await response.json();
      throw new Error(errorData.message || "Unable to register.");
    } else {
      console.log("registration successful");

      registerNewUserProfile(data["id"]);
    }

    return data["id"];
  } catch (error) {
    handleError("error in registartion <register>", error);
  }
};

// MARK: Profile Registration
// this creates a new, blank user profile, linked to a specific user_id
const registerNewUserProfile = async (user_id) => {
  try {
    console.log("\n");
    console.log("Attempting to create a new user Profle, id: " + user_id);

    const response = await fetch(`${API_URL}/userProfiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Convert non-2xx HTTP responses into errors:
      throw new Error(data.message || "Unable to create profile.");
    } else {
      console.log(
        "profile registration successful [id:" +
          data["id"] +
          ", user_id:" +
          user_id +
          "]"
      );
    }

    return data;
  } catch (error) {
    handleError(
      "erorr in registering new profile <registerNewUserProfile>",
      error
    );
  }
};

// MARK: signIn
export const signIn = async (email, password) => {
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
    handleError("error in Signing in <signIn>", error);
  }
};

// MARK: Get Profile
export const getUserProfile = async (user_id) => {
  try {
    console.log("\n");
    console.log("Attempting to retrieve userProfile for id:" + user_id);

    const response = await fetch(`${API_URL}/userProfiles?user_id=${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "applications/json",
      },
    });

    let jsonData = await response.json();

    // if the user has signed in, but for some reason does not have an profile
    // create one here with their user_id, and then return that
    if (Object.keys(jsonData).length == 0) {
      jsonData = await registerNewUserProfile(user_id);
    }

    return jsonData;
  } catch (error) {
    handleError("error getting userProfile <getUserProfile>", error);
  }
};

// MARK: get User
// posts a get method to the server for the provided email
async function getUser(email) {
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
    handleError("Error Getting user <getUser>", error);
  }
}

// MARK: Get User_ID Locally
const localUserIdKey = "localUserIdKey";

export const saveUserIdLocally = async (user_id) => {
  try {
    const jsonData = JSON.stringify(user_id);
    await AsyncStorage.setItem(localUserIdKey, jsonData);
  } catch (error) {
    handleError("error storing user_id", error);
  }
};

export const getUserIdLocally = async () => {
  try {
    const value = await AsyncStorage.getItem(localUserIdKey);
    return Number(value) ?? 0;
  } catch (error) {
    handleError("error retreiving user_id", error);
  }
};
