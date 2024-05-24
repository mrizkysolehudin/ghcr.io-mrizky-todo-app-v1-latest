export function response(data, status) {

  return {
    responseData: {
      data
    },
    responseStatus: status
  };
}
