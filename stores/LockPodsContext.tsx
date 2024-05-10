// this holds onto a list of all lockpods to be used throughout the app
// this will attempt to load once the user is signed in
// eventually it should only hold the lockpods associated with your 'area'
// (university, city, etc.) however, right now it simply downloads all the lockpods

import { LockPod } from "../Models/LockPodModel";
import { createContext, useContext, useReducer } from "react";

// MARK: LockPods Store
interface LockPodsContextType {
  lockPods: LockPod[];
  lockPodsDispatch?: React.Dispatch<UpdateLockPodsAction>;
}

const emptyList: LockPod[] = [];
const emptyContext: LockPodsContextType = {
  lockPods: emptyList,
  lockPodsDispatch: undefined,
};

const LockPodsContext = createContext<LockPodsContextType>(emptyContext);

export const LockPodsProvider = ({ children }: { children: any }) => {
  const [lockPods, lockPodsDispatch] = useReducer(lockPodsReducer, emptyList);

  return (
    <LockPodsContext.Provider value={{ lockPods, lockPodsDispatch }}>
      {children}
    </LockPodsContext.Provider>
  );
};

// MARK: Action
// the only way users can change lockpods is to update either its inReservation status
// or to update its inSession status
// it shouldn't be updating the entire list of lockpds
export enum UpdateLockPodsActionType {
  updateLockPod = "updateLockPod",
  setLockPods = "setLockPods",
}

interface UpdateLockPodsAction {
  type: UpdateLockPodsActionType;
  updatedLockPod: LockPod | undefined;
  updatedLockPods: LockPod[] | undefined;
}

// MARK: Reducer
function lockPodsReducer(lockPods: LockPod[], action: UpdateLockPodsAction) {
  switch (action.type) {
    case UpdateLockPodsActionType.updateLockPod: {
      const newLockPod: LockPod = action.updatedLockPod!;

      const updatingIndex = lockPods.findIndex(
        (lockPod) => lockPod.id == newLockPod.id
      );

      if (updatingIndex != -1) {
        let copyArr = lockPods;
        copyArr[updatingIndex] = newLockPod;
        return copyArr;
      } else {
        return lockPods;
      }
    }
    case UpdateLockPodsActionType.setLockPods: {
      return action.updatedLockPods!;
    }
    default: {
      console.log(
        "unkown action type caught in lockPodsReducer: " + action.type
      );
    }
  }
  return lockPods;
}

export const useLockPodsContext = () => useContext(LockPodsContext);
