// this holds onto a copy of the user to be used throughout the app
// once a user has signedIn they will receive a userId, a 'Token', that will give them access to this store

import { createContext, useContext, useState, useReducer } from "react";

// this will act as the "UserProfileStore".
// All components past the authentication screens will be wrapped in a Context provider that will read and write to this context object
const UserProfileContext = createContext();

// This is a standard wrapper object: it will provide access to the context object above
export const UserProfileProvider = ({ children }) => {
  const [userProfile, profileDispatch] = useReducer(userProfileReducer, null);

  return (
    <UserProfileContext.Provider value={{ userProfile, profileDispatch }}>
      {children}
    </UserProfileContext.Provider>
  );
};

// this function updates the profile in some way
// it takes in the current Profile and the action to be done, and returns the new state (updated Profile)
function userProfileReducer(profile, action) {
  switch (action.type) {
    case "loadProfile": {
      return action.payload;
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
