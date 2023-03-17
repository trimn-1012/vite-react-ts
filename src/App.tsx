import useSWR from 'swr';
import { useDispatch } from 'react-redux';

import RouteController from './routes';
import { IUsersResponse } from './apis/getUsers/types';
import { fetchUsers, keyUsers } from './apis/getUsers';
import { updateUsers } from './appSlice';

function App() {
  const dispatch = useDispatch();
  useSWR<IUsersResponse>(keyUsers, fetchUsers, {
    revalidateOnFocus: false,
    onSuccess: data => {
      dispatch(updateUsers(data.users));
    },
  });

  return <RouteController />;
}

export default App;
