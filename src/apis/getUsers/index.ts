import { IUsersResponse } from './types';
import request from '../../services/request';

const keyUsers = '/users';

async function fetchUsers() {
  const res = await request<IUsersResponse>({
    method: 'GET',
    url: '/users',
  });

  return res.data;
}

export { keyUsers, fetchUsers };
