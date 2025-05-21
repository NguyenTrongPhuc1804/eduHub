export interface ResponseType {
  success: boolean;
  message: string;
  data?: any;
}

export const createSuccessResponse = ({
  message = "Operation successful",
  data,
}: {
  message: string;
  data?: any;
}): ResponseType => {
  return {
    success: true,
    message,
    data,
  };
};

export const createErrorResponse = ({
  message = "Operation failed",
}: {
  message: string;
}): ResponseType => {
  return {
    success: false,
    message,
  };
};
