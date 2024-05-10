const API_URL = "http://localhost:3000";

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
