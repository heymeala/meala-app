// checks the API varaibles in the .env file.
export const checkAPI = (apiName, apiFromEnvFile) => {
  console.log('checkAPI ' + apiName + ' ' + apiFromEnvFile);
  if (apiFromEnvFile === undefined || apiFromEnvFile.length === 0) {
    console.error(`API: ${apiName} is undefined. Define a Key in your .env file`);
  }
};
