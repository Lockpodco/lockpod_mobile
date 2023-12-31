// subject to changes
const API_URL = "http://192.168.3.55:3000";

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
