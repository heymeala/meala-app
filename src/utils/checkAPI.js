// checks the API varaibles in the .env file.
export const checkAPI = (apiName, apiFromEnvFile) => {
  if (!apiFromEnvFile) {
    console.error(`API: ${apiName} is undefined. Define a Key in your .env file`);
  }
};
