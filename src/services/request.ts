import { AxiosRequestConfig } from 'axios';

import axios from './appAxios';

type TResponse<T = unknown> = {
  status: number;
  data: T;
};

const request = async <T>(config: AxiosRequestConfig) => {
  try {
    const { status, data }: TResponse<T> = await axios(config);

    return { status, data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export default request;
