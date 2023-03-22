import request from '@/services/request';

import { ILoginResponse, TLoginParams } from './types';

const keyLogin = '/auth/login';

async function login(url: string, { arg }: { arg: TLoginParams }) {
  const res = await request<ILoginResponse>({
    method: 'POST',
    url,
    data: {
      username: arg.username,
      password: arg.password,
    },
  });

  return res.data;
}

export { keyLogin, login };
