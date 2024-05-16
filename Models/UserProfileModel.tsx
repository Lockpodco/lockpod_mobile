import { API_URL, checkResponse } from "../services/ServiceUniversals";

// MARK: UserProfile
export class UserProfile {
  id: number = 0;
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  activeReservations: number[] = [];
  activeSessions: number[] = [];
  // reservationHistory: number[] = [];

  public constructor(
    user_id: number = 0,
    firstName: string = "",
    lastName: string = "",
    username: string = ""
  ) {
    this.user_id = user_id;
    this.first_name = firstName;
    this.last_name = lastName;
    this.username = username;
  }

  // this pushes the changeson a given userProfile object
  // to the remote Database
  async saveChangesToDataBase() {
    await updateUserProfile(this);
  }
}

// MARK: updateProfile
// this takes in a new profile object, and updates the existing data in the database
// it will automatically be called anytime a user updates the UserProfile
// using the provided dispatch function
const updateUserProfile = async (updatedProfile: UserProfile) => {
  console.log("\n");
  console.log(
    "attempting to update userProfile with id: " + updatedProfile.user_id
  );

  const body = JSON.stringify({
    user_id: updatedProfile.user_id,
    firstName: updatedProfile.first_name,
    lastName: updatedProfile.last_name,
    userName: updatedProfile.username,
    activeReservations: updatedProfile.activeReservations.toString(),
  });

  const response = await fetch(`${API_URL}/userProfiles/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  checkResponse(
    response,
    "unable to create Profile",
    "profile update Successful"
  );

  return;
};
