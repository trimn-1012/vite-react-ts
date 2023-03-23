export type TResponse<T = unknown> = {
  status: number;
  data: T;
};

export type TErrorResponse = {
  data: {
    message: string;
  };
  status: number;
};
