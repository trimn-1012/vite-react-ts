import useSWRMutation from 'swr/mutation';
import { Key } from 'swr';

import { keyLogin, login } from '@/apis/login';
import { ILoginResponse, TLoginParams } from '@/apis/login/types';
import { TErrorResponse } from '@/services/types';

export const useLoginMutation = () =>
  useSWRMutation<ILoginResponse, TErrorResponse, Key, TLoginParams>(
    keyLogin,
    login,
  );
