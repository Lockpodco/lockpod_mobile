import { Platform } from "react-native";

let localhost;
localhost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
// subject to changes
const API_URL = `http://${localhost}:3000`; //this opens same port as backend, which connects to database

//fetches the current lockpods in the database
export const fetchLockpods = async () => {
  try {
    const response = await fetch(`${API_URL}/lockpods`); //calls lockpods route from backend
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching lockpods:", error);
    throw error;
  }
};

// updates a lockpod's status in the database
export const updateLockpodStatus = async (lockpodId, status) => {
  console.log("Lockpod updated:", lockpodId);
  console.log("Update status to:", status);
  try {
    const response = await fetch(`${API_URL}/lockpods/status/${lockpodId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }), // Send status in the request body
    });
    return response;
  } catch (error) {
    console.error("Error updating lockpod:", error);
    throw error;
  }
};

// data is id?
export const fetchLockpodInfo = async (data) => {
  try {
    const response = await fetch(`${API_URL}/${data}`); //calls lockpods route from backend
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching lockpod info:", error);
    throw error;
  }
};
