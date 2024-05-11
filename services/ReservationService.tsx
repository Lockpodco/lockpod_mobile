import {
  API_URL,
  checkResponse,
  handleError,
} from "../services/ServiceUniversals";

// MARK: createReservation
// duration is measured in minutes
// this adds a new reservation to the database and returns its id
// it should be added to the current userProfile's 'active Reservation' argument seperatley
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

// MARK: ReserveLockpod
export const reserveLockpod = async (req: any) => {
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
export const endReservation = async (req: any) => {
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
