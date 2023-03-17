import { IUserResponse } from './types';
import request from '../../services/request';

const keyUser = '/user';

async function fetchUser(url: string) {
  const res = await request<IUserResponse>({
    method: 'GET',
    url,
  });

  return res.data;
}

export { keyUser, fetchUser };
