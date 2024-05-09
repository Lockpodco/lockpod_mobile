// this holds onto a copy of the user to be used throughout the app
// once a user has signedIn they will receive a userId, a 'Token', that will give them access to this store

import { createContext, useContext, useState, useReducer } from "react";
// import { UserProfileInterface } from "./Schemas";

// MARK: UserProfile
export class UserProfile {
  id: Number = 0;
  user_id: Number = 0;
  first_name: String = "";
  last_name: String = "";
  username: String = "";
}

interface UserProfileContextType {
  userProfile: UserProfile;
  profileDispatch?: React.Dispatch<UpdateUserProfileAction>;
}

// MARK: UserProfileStore
// this will act as the "UserProfileStore".
// All components past the authentication screens will be wrapped in a Context provider that will read and write to this context object
const emptyContext: UserProfileContextType = {
  userProfile: new UserProfile(),
  profileDispatch: undefined,
};
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
  loadProfile = "loadProfile",
}

interface UpdateUserProfileAction {
  type: UpdateUserProfileActionType;
  updatedProfile: UserProfile;
}

// this function updates the profile in some way
// it takes in the current Profile and the action to be done, and returns the new state (updated Profile)
function userProfileReducer(
  profile: UserProfile,
  action: UpdateUserProfileAction
) {
  switch (action.type) {
    case UpdateUserProfileActionType.loadProfile: {
      // const target = new UserProfile;
      // const returnedTarget = Object.assign(target, action.payload);

      // console.log(returnedTarget);

      return action.updatedProfile;
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
