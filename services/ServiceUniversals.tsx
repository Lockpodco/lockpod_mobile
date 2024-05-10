export const API_URL = "http://localhost:3000";

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
