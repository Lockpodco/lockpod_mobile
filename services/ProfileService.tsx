import { UserProfile } from "../Models/UserProfileModel";
import { API_URL, checkResponse, handleError } from "./ServiceUniversals";

// MARK: Profile Registration
// this creates a new, blank user profile, linked to a specific user_id
// it is called after a new user registers with the app
// or when they sign in and it is detected that they do not have a profile
export const registerNewUserProfile = async (user_id: Number) => {
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

    checkResponse(
      response,
      "unable to create profile",
      "profile registration successful [id:" +
        data["id"] +
        ", user_id:" +
        user_id +
        "]"
    );

    return data;
  } catch (error) {
    handleError(
      "erorr in registering new profile <registerNewUserProfile>",
      error as Error
    );
  }
};

// MARK: Get UserProfile
export const getUserProfile = async (
  user_id: Number
): Promise<UserProfile | undefined> => {
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

    return Object.assign(new UserProfile(), jsonData);
  } catch (error) {
    handleError("error getting userProfile <getUserProfile>", error as Error);
  }
};

// MARK: getUser
export const getUser = async (id: Number) => {
  try {
    console.log("\n");
    console.log("Attempting to retrieve user with id:" + id);

    const response = await fetch(`${API_URL}/users?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "applications/json",
      },
    });

    let jsonData = await response.json();

    return jsonData;
  } catch (error) {
    handleError("error getting user <getUser>", error as Error);
  }
};

export const changePassword = async (email: string, newPassword: string) => {
  try {
    console.log("\n");
    console.log("attempting to change password to: " + newPassword);

    const response = await fetch(`${API_URL}/users/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        password: newPassword,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      // Convert non-2xx HTTP responses into errors:
      // const errorData = await response.json();
      throw new Error(data.message || "Unable to change password");
    } else {
      console.log("password change successful");
    }
  } catch (error) {
    handleError("error changing password <changePassword>", error as Error);
  }
};
