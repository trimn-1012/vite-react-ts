import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Key } from 'swr';
import useSWRMutation from 'swr/mutation';

import { keyLogin, login } from '@/apis/login';
import { ILoginResponse, TLoginParams } from '@/apis/login/types';
import routes from '@/routes/paths';
import { ErrorResponse } from '@/services/types';
import tokenStorage from '@/utils/tokenStorage';

type FormValues = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { trigger: loginMutation, isMutating } = useSWRMutation<
    ILoginResponse,
    ErrorResponse,
    Key,
    TLoginParams
  >(keyLogin, login, {
    onSuccess: data => {
      tokenStorage.set(data.id.toString());
      navigate(routes.users.build());
    },
    onError: error => {
      alert(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async data => {
    await loginMutation(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      Login
      <div>
        <label htmlFor="username">Username</label>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <input
              data-testid="username"
              id="username"
              type="text"
              {...field}
            />
          )}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <input
              data-testid="password"
              id="password"
              type="password"
              {...field}
            />
          )}
        />
      </div>
      <button data-testid="loginButton" disabled={isMutating}>
        Login
      </button>
    </form>
  );
};

export default Login;
