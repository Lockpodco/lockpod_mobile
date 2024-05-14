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

    // console.

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
  id: number
): Promise<LockpodReservation | undefined> => {
  try {
  } catch (error) {
    handleError("Error getting the reservation", error as Error);
    return undefined;
  }
};

// TODO
// MARK: ExtendReservation
// adds the poassed duration (in minutes) and extends the reservation by that much
// and sets the var 'hasBeenExtended' to true
// if the 'hasBeenExtended' is true at the begining, it should not extend the reservation
export const extendReservation = async (id: number, duration: number) => {
  try {
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
export default async (reservationId: number, userProfile: UserProfile) => {
  try {
  } catch (error) {
    handleError("Error ending the reservation", error as Error);
  }
};
