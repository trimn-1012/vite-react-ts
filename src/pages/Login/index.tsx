import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import yup from '@/utils/yupGlobal';
import routes from '@/routes/paths';
import tokenStorage from '@/utils/tokenStorage';
import { useLoginMutation } from '@/hooks/useLoginMutation';

type FormValues = {
  username: string;
  password: string;
};

const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, formState } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const { trigger: loginMutation, isMutating } = useLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async data => {
    await loginMutation(data, {
      onSuccess: successData => {
        alert('Login successfully');
        tokenStorage.set(successData.id.toString());
        navigate(routes.users.build());
      },
      onError: error => {
        if (error.data) alert(error.data.message);
      },
    });
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
        {!!formState.errors.username && (
          <p>{formState.errors.username.message}</p>
        )}
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
        {!!formState.errors.password && (
          <p>{formState.errors.password.message}</p>
        )}
      </div>
      <button data-testid="loginButton" disabled={isMutating}>
        Login
      </button>
    </form>
  );
};

export default Login;
