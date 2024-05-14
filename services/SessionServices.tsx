import { API_URL, checkResponse, handleError } from "./ServiceUniversals";
import { LockpodSession } from "../Models/SessionModel";
import { UserProfile } from "../Models/UserProfileModel";

// MARK: Create Session
// this method should simply create a reservation at the current time
// for the given user and lockpod
// and should return the id of the newly created session
export const createSession = async (
  user_id: number,
  lockpod_id: number
): Promise<number | undefined> => {
  try {
    return 0;
  } catch (error) {
    handleError("Error creating session", error as Error);
    return undefined;
  }
};

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
    // const jsonData = response.json()
    // const lockpodSession: LockpodSession = Object.assign(new LockpodSession(), jsonData);
    // return lockpodSession;
  } catch (error) {
    handleError("Error creating session", error as Error);
    return undefined;
  }
};

// MARK: endSession
// this method should take in an active session, set the end time to now
// and then store it in the currentUser's 'sessionHistory' var
export const endSession = async (
  activeSession: LockpodSession,
  profile: UserProfile
) => {
  try {
    // set the endTime of the activeSession
    // add the id of the active Session to the userProfile's session History
  } catch (error) {
    handleError("Error creating session", error as Error);
    return undefined;
  }
};
