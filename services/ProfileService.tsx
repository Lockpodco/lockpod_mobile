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

export const getUser = async (id: Number) => {
  try {
    console.log("\n");
    console.log("Attempting to retrieve user with id:" + id);

    const response = await fetch(`${API_URL}/users?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "applications/json",
      },
    });

    let jsonData = await response.json();

    return jsonData;
  } catch (error) {
    handleError("error getting user <getUser>", error as Error);
  }
};

export const changePassword = async (email: string, newPassword: string) => {
	try {
		console.log("\n");
		console.log("attempting to change password to: " + newPassword);

		const response = await fetch(`${API_URL}/users/update`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email.toLowerCase(),
				password: newPassword,
			}),
		});
		const data = await response.json();

		if (!response.ok) {
			// Convert non-2xx HTTP responses into errors:
			// const errorData = await response.json();
			throw new Error(data.message || "Unable to change password");
		} else {
		console.log("password change successful");
		}
	} catch (error) {
		handleError("error changing password <changePassword>", error as Error);
	}
};
