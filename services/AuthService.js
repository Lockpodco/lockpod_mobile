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
    return data["id"];
  } catch (error) {
    console.error("AuthService login error:", error);
    throw error;
  }
};

// MARK: Registration
// checks whether an email is already in use in the database
async function checkUserExists(email) {
  try {
    const response = await fetch(`${API_URL}/users?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "applications/json",
      },
    });

    const jsonData = await response.json();

    if (Object.keys(jsonData).length != 0) {
      console.log("Account found with email: " + email);
      console.log("bypassing account registration");
      return true;
    }

    return false;
  } catch (error) {
    handleError("Error Checking if Account Exists", error);
  }
}

// registers a user using an email and password
export const register = async (email, password) => {
  try {
    console.log("\n");
    console.log("Attempting to register user: " + email);

    // checks to make sure the user does not already have an account
    let hasAccount = await checkUserExists(email);

    if (hasAccount) {
      return;
    }

    // if the email is not already in use, register them and push them to the database
    console.log("registering user: " + email + ", password: " + password);

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

    const data = await response.json();

    if (!response.ok) {
      // Convert non-2xx HTTP responses into errors:
      const errorData = await response.json();
      throw new Error(errorData.message || "Unable to register.");
    } else {
      console.log("registration successful");
    }

    return data;
  } catch (error) {
    handleError("AuthService register error", error);
  }
};
