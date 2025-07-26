export const formatResponse = (
  data = null,
  message = "Success",
  status = 200
) => {
  return {
    status,
    message,
    data,
  };
};
