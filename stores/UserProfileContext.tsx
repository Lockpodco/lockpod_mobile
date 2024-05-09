// this holds onto a copy of the user to be used throughout the app
// once a user has signedIn they will receive a userId, a 'Token', that will give them access to this store

import { createContext, useContext, useReducer } from "react";
import { UserProfile } from "../Models/UserProfileModel";

// MARK: UserProfileStore
interface UserProfileContextType {
  userProfile: UserProfile;
  profileDispatch?: React.Dispatch<UpdateUserProfileAction>;
}

// empty context is the initial value for the UserProfileContext
// it has no dispatch function and an empty Profile
const emptyContext: UserProfileContextType = {
  userProfile: new UserProfile(),
  profileDispatch: undefined,
};

// this will act as the "UserProfileStore".
// All components past the authentication screens will be wrapped in a Context provider that will read and write to this context object
const UserProfileContext = createContext<UserProfileContextType>(emptyContext);

// This is a standard wrapper object: it will provide access to the context object above
export const UserProfileProvider = ({ children }: { children: any }) => {
  const [userProfile, profileDispatch] = useReducer(
    userProfileReducer,
    new UserProfile()
  );

  return (
    <UserProfileContext.Provider value={{ userProfile, profileDispatch }}>
      {children}
    </UserProfileContext.Provider>
  );
};

// the types of actions that can be passed into the dispatch function
export enum UpdateUserProfileActionType {
  updateProfile = "loadProfile",
}

// the action that is passed into the Dispatch function
interface UpdateUserProfileAction {
  type: UpdateUserProfileActionType;
  updatedProfile: UserProfile;
}

// MARK: Reducer
// this function updates the profile in some way
// it takes in the current Profile and the action to be done, and returns the new state (updated Profile)
function userProfileReducer(
  profile: UserProfile,
  action: UpdateUserProfileAction
) {
  switch (action.type) {
    case UpdateUserProfileActionType.updateProfile: {
      const updatedProfile = action.updatedProfile;
      return updatedProfile;
    }
    default: {
      console.log(
        "unkown action type caught in userProfileReducer: " + action.type
      );
      return profile;
    }
  }
}

// this subscribes the child view to the UserProfileContext object
// they can listen for updates, and set the User using SetUser
export const useUserProfileContext = () => useContext(UserProfileContext);
