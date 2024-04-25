// MARK: Vars
const API_URL = "http://localhost:3000";

// MARK: Convenience functions
function handleError(title, error) {
  console.log(title, ": ", error);
  throw error;
}

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed!");
    }

    const data = await response.json();
    // You should receive a token and user details here if login is successful
    // Save the token in your app's state or in persistent storage
    return data;
  } catch (error) {
    console.error("AuthService login error:", error);
    throw error;
  }
};

// MARK: Registration
// Register new users via email and password
async function checkUserExists(email) {
  try {
    const response = await fetch(`${API_URL}/users?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "applications/json",
      },
    });

    if (response["size"] != null) {
      // return await response.json();
      return;
    } else {
      return null;
    }
  } catch (error) {
    handleError("Error Checking if Account Exists", error);
  }
}

export const register = async (email, password) => {
  try {
    // checks to make sure the user does not already have an account
    let priorAccount = await checkUserExists(email);

    if (priorAccount != null) {
      console.log("Accont found with email: " + email);
      console.log(priorAccount);
      return;
    }

    console.log("pushing user: " + email + " password:" + password);

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }

    // if (!response.ok) {
    //   // Convert non-2xx HTTP responses into errors:
    //   const errorData = await response.json();
    //   throw new Error(errorData.message || "Unable to register.");
    // }

    // const data = await response.json();
    // return data;
  } catch (error) {
    handleError("AuthService register error", error);
  }
};
