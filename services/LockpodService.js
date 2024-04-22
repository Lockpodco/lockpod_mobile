// subject to changes
const API_URL = "http://localhost:3000";

//fetches the current lockpods in the database
export const fetchLockpods = async () => {
  try {
    const response = await fetch(`${API_URL}/lockpods`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching lockpods:", error);
    throw error;
  }
};
