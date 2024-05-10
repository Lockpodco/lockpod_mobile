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

// MARK: Update LockPod Status
export const updateLockPodStatus = async (
  id: number,
  isReserved: boolean,
  inSession: boolean
) => {
  try {
    console.log("\n");
    console.log("attempting to update status of lockpod: " + id);

    const response = await fetch(`${API_URL}/lockpods/setStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        isReserved: isReserved,
        inSession: inSession,
      }),
    });

    checkResponse(
      response,
      "failed to update lockpod",
      "successfully updated lockpod"
    );
    return;
  } catch (error) {
    console.error("Error fetching lockpods", error);
    throw error;
  }
};
