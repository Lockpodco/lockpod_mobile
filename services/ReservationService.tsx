import axios from "axios";
import {
  API_URL,
  checkResponse,
  handleError,
} from "../services/ServiceUniversals";
import { LockpodReservation } from "../Models/ReservationModel";
import { UserProfile } from "../Models/UserProfileModel";

// MARK: createReservation
// duration is measured in minutes
// this adds a new reservation to the database and returns its id
// it should be added to the current userProfile's 'active Reservation' argument seperatley
// whenever it is called
export const createReservation = async (
  user_id: number,
  lockpod_id: number,
  duration: number
): Promise<number | undefined> => {
  try {
    console.log("\n");
    console.log(
      `Attempting to create a new reservation for user=${user_id}, lockpod=${lockpod_id}`
    );

    const startTime: Date = new Date();
    const minutesInms = duration * 60 * 1000;
    const expectedArrival: Date = new Date(startTime.getTime() + minutesInms);

    const response = await fetch(`${API_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        lockpod_id: lockpod_id,
        start_time: startTime,
        end_time: expectedArrival,
      }),
    });

    const data = await response.json();

    const id = data["id"];

    console.log(
      `successfully created a reservation (${id}) for user=${user_id}, lockpod=${lockpod_id}}`
    );

    return id;
  } catch (error) {
    handleError("Error creating Reservation", error as Error);
  }
};

// TODO
// MARK: GetReservation
// gets the reservation associated with the given id
// should return an instance of the LockpodReservation object
export const getReservation = async (
  reservationId: number
): Promise<LockpodReservation | null> => {
  try {
    const response = await axios.get<JSON>(
      `${API_URL}/reservations?reservationId=${reservationId}`
    );

    const data = response.data;

    if (Object.values(data).length == 0) {
      return null;
    }

    const reservation = Object.assign(new LockpodReservation(), data);

    reservation.updateDates();

    return reservation;
  } catch (error) {
    handleError("Failed to fetch reservation", error as Error);
    return null;
  }
};

// TODO
// MARK: ExtendReservation
// adds the poassed duration (in minutes) and extends the reservation by that much
// and sets the var 'hasBeenExtended' to true
// if the 'hasBeenExtended' is true at the begining, it should not extend the reservation
export const extendReservation = async (
  id: number,
  initialEndTime: Date,
  duration: number
) => {
  try {
    console.log("\n");
    console.log(`attempting to extend reservation: ${id}`);

    const hourTime = 60 * 60 * 1000;
    const minuteTime = 60 * 1000;
    const newEndTime: Date = new Date(
      initialEndTime.getTime() + 7 * hourTime + minuteTime * duration
    );

    const route = `${API_URL}/reservations/extend?reservationId=${id}&endTime=${newEndTime}`;

    const _ = await axios.post(route);

    console.log("successfully extended the reservatin");
  } catch (error) {
    handleError("Error extending the resrevation", error as Error);
    return undefined;
  }
};

// TODO
// MARK: endReservation
// this gets called whether the user cancelled their reservation, or
// arrived and is now attempting to unlock the pod
// it removes the reservation from the userProfile's active reservations var
// and adds it to the 'reservation' history var in the UserProfile
export const endReservation = async (
  reservationId: number,
  endMethod: string
): Promise<void> => {
  try {
    console.log("\n");
    console.log(
      `attempting to end reservation: ${reservationId}, with: ${endMethod}`
    );

    const _ = await axios.post(
      `${API_URL}/reservations/cancel?reservationId=${reservationId}&endMethod=${endMethod}`
    );

    console.log(`Successfully ended reservation ID: ${reservationId}`);
  } catch (error) {
    handleError("Failed to end reservation", error as Error);
    throw error;
  }
};

// Get all active reservations given an user id
export const getUserReservations = async (
  userId: number
): Promise<LockpodReservation[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/reservations?user_id=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user reservations:", error);
    throw error;
  }
};

// MARK: End Reservation
// Function to end a reservation
// export const endReservation = async (
//   userId: number,
//   lockpodId: number
// ): Promise<void> => {
//   try {
//     // Fetch the user's reservations
//     const reservations = await getUserReservations(userId);

//     // Find the reservation with the matching lockpodId
//     const reservation = reservations.find(
//       (res) => res.lockpod_id === lockpodId
//     );

//     if (reservation) {
//       const reservationId = reservation.id;

//       // Delete the reservation
//       await axios.delete(`${API_URL}/reservations/${reservationId}`);

//       // Fetch user profile
//       const response = await axios.get(`${API_URL}/userProfiles/${userId}`);
//       const userProfile = response.data as UserProfile;

//       // Update the user profile
//       userProfile.activeReservations = userProfile.activeReservations.filter(
//         (id) => id !== reservationId
//       );
//       // userProfile.reservationHistory.push(reservationId);

//       // Save changes to the user profile
//       // await updateUserProfile(userProfile);

//       console.log(`Successfully ended reservation with ID: ${reservationId}`);
//     } else {
//       console.log(`No active reservation found for lockpodId: ${lockpodId}`);
//     }
//   } catch (error) {
//     console.error("Failed to end reservation:", error);
//     throw error;
//   }
// };

// export default async (reservationId: number, userProfile: UserProfile) => {
//   try {
//   } catch (error) {
//     handleError("Error ending the reservation", error as Error);
//   }
// };
