// MARK: Vars
const API_URL = "http://localhost:3000";

// MARK: Convenience functions
function handleError(title, error) {
  console.log(title, ": ", error);
  throw error;
}

// posts a get method to the server for the provided email
async function getUser(email) {
  try {
    const response = await fetch(`${API_URL}/users?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "applications/json",
      },
    });

    const jsonData = await response.json();

    return jsonData;
  } catch (error) {
    handleError("Error Getting user <getUser>", error);
  }
}

// checks whether an email is already in use in the database
async function checkUserExists(email) {
  try {
    const jsonData = await getUser(email);

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

// MARK: Registration
// registers a user using an email and password
export const register = async (email, password) => {
  try {
    console.log("\n");
    console.log("Attempting to register user: " + email);

    // checks to make sure the user does not already have an account
    let hasAccount = await checkUserExists(email);

    if (hasAccount) {
      return signIn(email, password);
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

    return data["id"];
  } catch (error) {
    handleError("error in registartion <register>", error);
  }
};

// MARK: SigningIn
export const signIn = async (email, password) => {
  try {
    console.log("\n");
    console.log("Attempting to login user: " + email);

    const jsonData = await getUser(email);

    if (Object.keys(jsonData).length != 0) {
      if (jsonData["password"] == password) {
        console.log("logged in user: " + email);
        return jsonData["id"];
      } else {
        throw new Error("Incorrect Password");
      }
    } else {
      throw new Error("Unable to find account");
    }
  } catch (error) {
    handleError("error in Signing in <signIn>", error);
  }
};
