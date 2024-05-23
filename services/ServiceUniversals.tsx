const localHostURL = "http://localhost:3000";
const developmentDeploymentURL = "https://4b5d-128-54-189-155.ngrok-free.app";

export const API_URL = localHostURL;

export const checkResponse = (
  response: Response,
  failureMessage: string,
  successMessage: string
) => {
  if (!response.ok) {
    // Convert non-2xx HTTP responses into errors:
    throw new Error(failureMessage);
  } else {
    console.log(successMessage);
  }
};

export const handleError = (title: string, error: Error) => {
  console.log(title, ": ", error);
  throw error;
};
