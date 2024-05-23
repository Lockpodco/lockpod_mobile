import axios from "axios";
import { API_URL, checkResponse, handleError } from "./ServiceUniversals";
import { LockpodSession } from "../Models/SessionModel";
import { UserProfile } from "../Models/UserProfileModel";

// TODO
// MARK: Create Session
// this method should simply create a ssession at the current time
// for the given user and lockpod
// and should return the id of the newly created session
export const createSession = async (
  user_id: number,
  lockpod_id: number
): Promise<number | undefined> => {
  try {
    console.log("attempting to create a new seession");
    const response = await axios.post(
      `${API_URL}/sessions`,
      {
        userId: user_id,
        lockpodId: lockpod_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    console.log("Successfully created a new session");

    return data["id"];
  } catch (error) {
    handleError("Error creating session", error as Error);
    return undefined;
  }
};

// TODO
// MARK: get Session
// this method should return the sessio associated with the given id
// the return is of type LockpodSession, so you need to convert the JSON data
// to that typescript object and return it
// the isActive peram, which is not in the database, is simpyl whether or not the endTime
// is not null
export const getSession = async (
  id: number
): Promise<LockpodSession | undefined> => {
  try {
    const response = await axios.get<LockpodSession>(
      `${API_URL}/sessions?id=${id}`
    );
    const data = response.data;
    const lockpodSession: LockpodSession = Object.assign(
      new LockpodSession(),
      data
    );

    lockpodSession.updateDates();
    return lockpodSession;
  } catch (error) {
    handleError("Error creating session", error as Error);
    return undefined;
  }
};

// TODO
// MARK: endSession
// this method should take in an active session, set the end time to now
// and then store it in the currentUser's 'sessionHistory' var
export const endSession = async (id: number) => {
  try {
    // Set end_time of activeSession
    const response = await axios.put(
      `${API_URL}/sessions`,
      {
        sessionId: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const sessionId = response.data;

    console.log(`Successfully ended session with ID: ${sessionId}`);
    return sessionId;
  } catch (error) {
    handleError("Error ending session", error as Error);
    return undefined;
  }
};
