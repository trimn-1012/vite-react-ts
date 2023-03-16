import axios from 'axios';
import { stringify } from 'qs';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL as string,
  withCredentials: false,
  timeout: 60000,
  paramsSerializer: {
    serialize: (params: Record<string, unknown>) =>
      stringify(params, { arrayFormat: 'brackets' }),
  },
});

export default instance;
