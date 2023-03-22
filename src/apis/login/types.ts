import type { Merge } from 'type-fest';

import { IUser } from '@/apis/getUser/types';

interface IToken {
  token: string;
}

export type TLoginParams = {
  username: string;
  password: string;
};

export type ILoginResponse = Merge<IUser, IToken>;
