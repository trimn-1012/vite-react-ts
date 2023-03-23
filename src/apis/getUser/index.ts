import request from '@/services/request';

import { IUserResponse } from './types';

const keyUser = '/user';

async function fetchUser(url: string) {
  const res = await request<IUserResponse>({
    method: 'GET',
    url,
  });

  return res.data;
}

export { keyUser, fetchUser };
