import {
  API_URL,
  checkResponse,
  handleError,
} from "../services/ServiceUniversals";

import { LockPod } from "../Models/LockPodModel";

// MARK: GetLockPods
export const fetchLockpods = async (): Promise<LockPod[]> => {
  try {
    console.log("\n");
    console.log("Attempting to retrieve lockpods");

    const response = await fetch(`${API_URL}/lockpods`, {
      method: "GET",
      headers: {
        "Content-Type": "applications/json",
      },
    });

    const data = await response.json();
    let lockpods: LockPod[] = [];

    data.map((lockpod: any) => {
      const convertedObj = Object.assign(new LockPod(), lockpod);
      lockpods.push(convertedObj);
    });
    return lockpods;
  } catch (error) {
    console.error("Error fetching lockpods:", error);
    throw error;
  }
};
