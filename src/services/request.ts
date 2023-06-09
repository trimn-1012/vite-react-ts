import { AxiosRequestConfig } from 'axios';

import axios from './appAxios';
import { TResponse } from './types';

const request = async <T>(config: AxiosRequestConfig) => {
  try {
    const { status, data }: TResponse<T> = await axios(config);

    return { status, data };
  } catch (error: any) {
    const { status, data } = error.response ?? {};

    return Promise.reject({ status, data });
  }
};

export default request;
