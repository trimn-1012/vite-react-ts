import { ILoginResponse, LoginParams } from './types';
import request from '../../services/request';

const keyLogin = '/auth/login';

async function login(url: string, { arg }: { arg: LoginParams }) {
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
