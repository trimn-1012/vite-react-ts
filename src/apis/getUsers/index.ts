import request from '@/services/request';

import { IUsersResponse } from './types';

const keyUsers = '/users';

async function fetchUsers() {
  const res = await request<IUsersResponse>({
    method: 'GET',
    url: '/users',
  });

  return res.data;
}

export { keyUsers, fetchUsers };
