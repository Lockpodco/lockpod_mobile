const API_URL = "http://localhost:3000";

// MARK: Convenience Functions
function handleError(title: string, error: Error) {
  console.log(title, ": ", error);
  throw error;
}

// MARK: updateProfileInformation
export const updateProfileInformation = async (
  user_id: Number,
  firstName: string,
  lastName: string,
  userName: string
) => {
  console.log("\n");
  console.log("attempting to update userProfile with id: " + user_id);

  const response = await fetch(`${API_URL}/userProfiles/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user_id,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    // Convert non-2xx HTTP responses into errors:
    throw new Error(data.message || "Unable to create profile.");
  } else {
    console.log("profle update successful");
  }

  try {
  } catch (error) {
    handleError(
      "error in updating profile information <updateProfileInformation>",
      error as Error
    );
  }
};
