import { Platform } from "react-native";

let localhost;
localhost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
// subject to changes
const API_URL = `http://${localhost}:3000`; //this opens same port as backend, which connects to database

// MARK: ReserveLockpod
export const reserveLockpod = async (req) => {
  console.log("data in reserveLockpod: ", JSON.stringify(req));
  try {
    const response = await fetch(`${API_URL}/reservations`, {
      method: "POST",
      // This header was necessary for post to work
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    return response;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

// MARK: endReservation
export const endReservation = async (req) => {
  console.log("data in endReservation: ", JSON.stringify(req));
  try {
    const response = await fetch(`${API_URL}/reservations`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    return response;
  } catch (error) {
    console.error("Error ending reservation: ", error);
    throw error;
  }
};

