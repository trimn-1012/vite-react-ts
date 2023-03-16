export type TResponse<T = unknown> = {
  status: number;
  data: T;
};

export type ErrorResponse = {
  response: {
    data: {
      message: string;
    };
    status: number;
  };
};
