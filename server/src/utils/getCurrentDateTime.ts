export const getCurrentDateTime = (offset) => {
  const currentDate = new Date();

  // Get the current time in UTC
  const utcMilliseconds =
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;

  // Adjust for the desired timezone offset
  const timezoneMilliseconds = utcMilliseconds + offset * 3600000; // Convert hours to milliseconds

  // Create a new Date object with the adjusted time
  const timezoneDate = new Date(timezoneMilliseconds);

  // Get timezone date and time components
  const timezoneYear = timezoneDate.getFullYear();
  const timezoneMonth = String(timezoneDate.getMonth() + 1).padStart(2, '0');
  const timezoneDay = String(timezoneDate.getDate()).padStart(2, '0');
  const timezoneHours = String(timezoneDate.getHours()).padStart(2, '0');
  const timezoneMinutes = String(timezoneDate.getMinutes()).padStart(2, '0');
  const timezoneSeconds = String(timezoneDate.getSeconds()).padStart(2, '0');

  // Construct the desired format: ddMMyyyyHHmmss
  const formattedDateTime = `${timezoneDay}${timezoneMonth}${timezoneYear}${timezoneHours}${timezoneMinutes}${timezoneSeconds}`;

  return formattedDateTime;
};
