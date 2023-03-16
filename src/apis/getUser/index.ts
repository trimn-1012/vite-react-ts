import { IUserResponse } from './types';
import request from '../../services/request';

const keyUser = '/user';

async function fetchUser(id: number) {
  const res = await request<IUserResponse>({
    method: 'GET',
    url: `/users/${id}`,
  });

  return res.data;
}

export { keyUser, fetchUser };
