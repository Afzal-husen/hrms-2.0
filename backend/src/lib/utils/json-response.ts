type JsonResponseType = {
  success: boolean;
  message: string;
  data?: any;
};

export const jsonResponse = ({ success, message, data }: JsonResponseType) => {
  return { success, message, data };
};
