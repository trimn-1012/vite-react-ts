import type { Merge } from 'type-fest';

import { IUser } from '../getUsers/types';

interface IToken {
  token: string;
}

export type LoginParams = {
  username: string;
  password: string;
};

export type ILoginResponse = Merge<IUser, IToken>;
