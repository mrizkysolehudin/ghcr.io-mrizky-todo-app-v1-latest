export function log(message, data) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message} - ${JSON.stringify(data)}`;
  console.log(logMessage);
}
